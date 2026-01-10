<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('home', [
            'patients' => \App\Http\Resources\PatientResource::collection(\App\Models\Patient::latest()->get())
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone_number' => 'required|string|max:20',
            'document_photo' => 'required|image|max:10240', // Max 10MB
        ]);

        $path = $request->file('document_photo')->store('document_photos', 'public');

        \App\Models\Patient::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'document_photo_path' => '/storage/' . $path,
        ]);

        return redirect()->back();
    }
}
