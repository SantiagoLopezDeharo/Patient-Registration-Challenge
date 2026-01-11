<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

require __DIR__.'/settings.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [PatientController::class, 'index'])->name('home');
    Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
});

