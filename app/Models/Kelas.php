<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public $timestamps = false;

    public function matkul()
    {
        return $this->belongsTo(Matkul::class);
    }

    public function dosen()
    {
        return $this->belongsTo(Dosen::class);
    }

    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class);
    }

    public function absensi()
    {
        return $this->hasMany(AbsensiMahasiswa::class);
    }
}
