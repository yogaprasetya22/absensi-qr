<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DaftarMatkulMahasiswa;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $matkul = Matkul::with('prodi.mahasiswa.user', 'kelas.mahasiswa.matkul')->where('prodi_id', auth()->user()->mahasiswa->prodi_id)->get();
        $matkul = Kelas::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.mahasiswa.user', 'ruangan', 'absensi')->whereHas('matkul.prodi.mahasiswa', function ($query) {
            $query->where('id', auth()->user()->mahasiswa->id);
        })->get();
        return Inertia::render('mahasiswa/Index', [
            'title' => 'Mahasiswa',
            'matkul' => $matkul,
        ]);
    }

    public function matkul()
    {
        $data_matkul = DaftarMatkulMahasiswa::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.mahasiswa.user', 'matkul.kelas.ruangan')->where('mahasiswa_id', auth()->user()->mahasiswa->id)->get();
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
        $request->validate([
            "nama" => 'required',
            "email" => 'required',
            "password" => 'required',
            "prodi" => 'required',
            "no_hp" => 'required',
            "alamat" => 'required',
        ]);

        $get_mahasiswa_last = User::with('mahasiswa')->where('role_id', 2)->latest('id')->first();

        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 2,
        ]);

        $user->mahasiswa()->create([
            'prodi_id' => $request->prodi,
            'no_hp' => $request->no_hp,
            'alamat' => $request->alamat,
            'nim' => $get_mahasiswa_last->mahasiswa->nim + 1,
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

        $user->mahasiswa()->update([
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
