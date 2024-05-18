<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaftarMatkulDosen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public $timestamps = false;

    public function dosen()
    {
        return $this->belongsTo(Dosen::class);
    }

    public function matkul()
    {
        return $this->belongsTo(Matkul::class);
    }
}
