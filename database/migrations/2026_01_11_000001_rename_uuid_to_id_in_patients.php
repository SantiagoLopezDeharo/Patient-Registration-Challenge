<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropPrimary();
            $table->renameColumn('uuid', 'id');
            $table->primary('id');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->renameColumn('id', 'uuid');
            $table->bigIncrements('id')->first();
            $table->primary('id');
            $table->dropColumn('uuid');
        });
    }
};
