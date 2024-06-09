<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::with(['role'])->where('role_id', 2)->get();
        return Inertia::render('admin/Admin', [
            'title' => 'Dashboard',
            'data' => $user,
        ]);
    }
    public function dosen()
    {
        $prodi = Prodi::all();
        $user = User::with(['role', 'dosen.prodi'])->where('role_id', 3)->get();
        return Inertia::render('admin/Dosen', [
            'title' => 'Dosen',
            'data' => $user,
            'prodi' => $prodi,
        ]);
    }

    public function mahasiswa()
    {
        $prodi = Prodi::all();
        $user = User::with(['role', 'mahasiswa.prodi'])->where('role_id', 2)->get();
        return Inertia::render('admin/Mahasiswa', [
            'title' => 'Mahasiswa',
            'data' => $user,
            'prodi' => $prodi,
        ]);
    }
}
