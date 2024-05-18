<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DaftarMatkulMahasiswa;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $matkul = Matkul::with('prodi.dosen.user', 'kelas.dosen.matkul')->where('prodi_id', auth()->user()->mahasiswa->prodi_id)->get();
        $matkul = Kelas::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.dosen.user','ruangan')->whereHas('matkul.prodi.mahasiswa', function ($query) {
            $query->where('id', auth()->user()->mahasiswa->id);
        })->get();
        return Inertia::render('mahasiswa/Index', [
            'title' => 'Mahasiswa',
            'matkul' => $matkul,
        ]);
    }

    public function matkul()
    {
        $data_matkul = DaftarMatkulMahasiswa::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.dosen.user')->where('mahasiswa_id', auth()->user()->mahasiswa->id)->get();
        return Inertia::render('mahasiswa/Matkul', [
            'title' => 'Mata Kuliah',
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
