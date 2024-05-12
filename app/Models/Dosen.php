<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public $timestamps = false;

    public function maktul()
    {
        return $this->hasMany(Maktul::class);
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class);
    }
}
