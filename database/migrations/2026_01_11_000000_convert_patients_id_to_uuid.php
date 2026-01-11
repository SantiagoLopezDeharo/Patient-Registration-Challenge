<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id');
        });

        DB::table('patients')->get()->each(function ($patient) {
            DB::table('patients')->where('id', $patient->id)->update([
                'uuid' => (string) Str::uuid(),
            ]);
        });

        Schema::table('patients', function (Blueprint $table) {
            $table->uuid('uuid')->nullable(false)->unique()->change();
        });

        Schema::table('patients', function (Blueprint $table) {
            $table->dropPrimary();
            $table->dropColumn('id');
            $table->primary('uuid');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropPrimary();
            $table->bigIncrements('id')->first();
            $table->primary('id');
            $table->dropUnique(['uuid']);
            $table->dropColumn('uuid');
        });
    }
};
