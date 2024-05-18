<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DaftarKelas;
use App\Models\DaftarMatkulDosen;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matkul = Kelas::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.dosen.user', 'ruangan', 'matkul.prodi.mahasiswa.absensi_mahasiswa')->whereHas('matkul.prodi.dosen', function ($query) {
            $query->where('id', auth()->user()->dosen->id);
        })->get();
        return Inertia::render('dosen/Index', [
            'title' => 'Dosen',
            'matkul' => $matkul,
        ]);
    }

    public function matkul_diajar()
    {
        $data_matkul = DaftarMatkulDosen::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.dosen.user', 'matkul.kelas.ruangan')->where('dosen_id', auth()->user()->dosen->id)->get();
        return Inertia::render('dosen/MatkulDiajar', [
            'title' => 'Mata Kuliah Diajar',
            'data_matkul' => $data_matkul,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
