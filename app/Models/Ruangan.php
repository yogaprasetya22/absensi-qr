<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public $timestamps = false;

    public function kelas()
    {
        return $this->hasOne(Kelas::class);
    }
}
