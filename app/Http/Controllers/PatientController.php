<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Notifications\PatientRegistered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Laravel\Octane\Facades\Octane;
use Throwable;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 12);
        $perPage = max(1, min(100, $perPage));

        $field = $request->string('field', 'full_name')->toString();
        $allowedFields = ['full_name', 'email', 'phone_number'];
        if (!in_array($field, $allowedFields, true)) {
            $field = 'full_name';
        }

        $search = $request->string('q')->trim()->toString();

        $patientsQuery = auth()->user()->patients()->latest();

        if ($search !== '') {
            $patientsQuery->where($field, 'like', '%' . $search . '%');
        }

        $patients = $patientsQuery->paginate(perPage: $perPage)->withQueryString();

        $patientsResource = \App\Http\Resources\PatientResource::collection($patients);

        if ($request->route()?->named('patients.index') || $request->wantsJson()) {
            return $patientsResource;
        }

        return \Inertia\Inertia::render('home', [
            'patients' => $patientsResource,
            'filters' => [
                'q' => $search,
                'field' => $field,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => [
                'required',
                'email',
                Rule::unique('patients')->where(fn($query) => $query->where('user_id', auth()->id())),
                'regex:/^[a-z0-9]+@gmail\.com$/i',
            ],
            'country_code' => ['required', 'string', 'regex:/^\+\d{1,4}$/'],
            'number' => ['required', 'string', 'regex:/^\d+$/', 'max:15'],
            'document_photo' => 'required|image|mimes:jpg,jpeg|max:10240', // Max 10MB
        ], [
            'full_name.regex' => 'The full name field must only contain letters.',
            'email.regex' => 'The email must be a valid Gmail address.',
            'country_code.regex' => 'Invalid country code (e.g. +598).',
            'number.regex' => 'The number must contain only digits.',
            'document_photo.mimes' => 'The document photo must be a file of type: jpg.',
        ]);

        $path = null;

        try {
            DB::beginTransaction();

            $path = $request->file('document_photo')->store('document_photos', 'public');

            $patient = auth()->user()->patients()->create([
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone_number' => $validated['country_code'] . ' ' . $validated['number'],
                'document_photo_path' => '/storage/' . $path,
            ]);

            DB::commit();

            $patientId = $patient->getKey();

            if (isset($_SERVER['LARAVEL_OCTANE'])) {
                Log::info('PatientRegistered: dispatching to Octane task worker', ['patient_id' => $patientId]);
                Octane::tasks()->dispatch([
                    function () use ($patientId) {
                        try {
                            Log::info('PatientRegistered: Octane task started', ['patient_id' => $patientId]);
                            $patient = Patient::query()->with('user')->find($patientId);

                            if ($patient !== null) {
                                $patient->notify(new PatientRegistered());
                                Log::info('PatientRegistered: Octane task finished notify', ['patient_id' => $patientId]);
                            } else {
                                Log::warning('PatientRegistered: patient not found in Octane task', ['patient_id' => $patientId]);
                            }
                        } catch (Throwable $e) {
                            report($e);
                            Log::error('PatientRegistered: exception in Octane task', ['patient_id' => $patientId, 'error' => $e->getMessage()]);
                        }
                    },
                ]);
            } else {
                Log::info('PatientRegistered: sending synchronously', ['patient_id' => $patientId]);
                $patient->notify(new PatientRegistered());
            }

            return redirect()->back();
        } catch (Throwable $e) {
            DB::rollBack();

            if ($path !== null) {
                Storage::disk('public')->delete($path);
            }

            report($e);

            return redirect()
                ->back()
                ->withErrors(['error' => 'Unable to register patient right now. Please try again.'])
                ->withInput();
        }
    }
}
