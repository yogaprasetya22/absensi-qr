<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absensi_mahasiswas', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->foreignId('mahasiswa_id');
            $table->foreignId('kelas_id');
            $table->date('tanggal');
            $table->time('jam_masuk');
            $table->enum('status', ['hadir', 'sakit', 'alpa', 'izin'])->default('alpa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi_mahasiswas');
    }
};
