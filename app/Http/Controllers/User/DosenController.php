<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DaftarKelas;
use App\Models\DaftarMatkulDosen;
use App\Models\Dosen;
use App\Models\Kelas;
use App\Models\User;
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
        $request->validate([
            "nama" => 'required',
            "email" => 'required',
            "password" => 'required',
            "prodi" => 'required',
            "no_hp" => 'required',
            "alamat" => 'required',
        ]);

        $get_dosen_last = User::with('dosen')->where('role_id', 3)->latest('id')->first();

        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 3,
        ]);

        $user->dosen()->create([
            'prodi_id' => $request->prodi,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'nid' => $get_dosen_last->dosen->nid + 1,
        ]);

        return redirect()->back()->with('success', 'Data berhasil ditambahkan');
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
        $request->validate([
            "nama" => 'required',
            "email" => 'required',
            "prodi" => 'required',
            "no_hp" => 'required',
            "alamat" => 'required',
        ]);

        $user = User::find($id);

        $user->update([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->dosen()->update([
            'prodi_id' => $request->prodi,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
        ]);

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
