<?php

namespace App\Http\Controllers;

use App\Models\AbsensiMahasiswa;
use App\Models\Kelas;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

        $absensi = [];
        $data_mahasiswa = $request->attendances;
        foreach ($data_mahasiswa as $key => $mahasiswa) {
            $absensi[] = [
                'uuid' => str()->uuid(),
                'mahasiswa_id' => $mahasiswa['mahasiswa_id'],
                'kelas_id' => $request->kelas_id,
                'tanggal' => $request->tanggal,
                'jam_masuk' => $request->jam_masuk,
                'status' => $mahasiswa['status'],
            ];
        }

        // buatkan kondisi dimana kalau absensi sudah ada, maka hapus absensi yang sudah ada
        foreach ($absensi as $key => $value) {
            AbsensiMahasiswa::where('mahasiswa_id', $value['mahasiswa_id'])->where('kelas_id', $value['kelas_id'])->where('tanggal', $value['tanggal'])->delete();
        }

        // jika absensi sudah dihapus, maka simpan absensi yang baru
        AbsensiMahasiswa::insert($absensi);

        return redirect()->back()->with('success', 'Absensi berhasil disimpan');
    }

    public function store_qr(Request $request)
    {
        $kelas = Kelas::with('matkul.prodi.mahasiswa.user', 'matkul.prodi.dosen.user', 'ruangan')->whereHas('matkul.prodi.mahasiswa', function ($query) {
            $query->where('id', auth()->user()->mahasiswa->id);
        })->where('matkul_id', $request->matkul_id)->where('id', $request->kelas_id)->first();

        if (!$kelas) {
            return response()->json([
                'message' => 'Kelas tidak ditemukan',
            ], 404);
        }

        $absensi = AbsensiMahasiswa::where('kelas_id', $request->kelas_id)->where('tanggal', $request->tanggal)->where('mahasiswa_id', auth()->user()->mahasiswa->id)->get();

        if ($absensi->count() > 0) {
            return response()->json([
                'message' => 'Anda sudah absen',
            ], 400);
        }


        AbsensiMahasiswa::create([
            'uuid' => str()->uuid(),
            'mahasiswa_id' => auth()->user()->mahasiswa->id,
            'kelas_id' => $request->kelas_id,
            'tanggal' => $request->tanggal,
            'jam_masuk' => $request->jam_masuk,
            'status' => 'hadir',
        ]);

        return redirect()->route('mahasiswa')->with('success', 'Absensi berhasil disimpan');
    }


    public function buka_absen(Request $request)
    {
        $kelas = Kelas::find($request->kelas_id);

        if (!$kelas) {
            return response()->json([
                'message' => 'Kelas tidak ditemukan',
            ], 404);
        }

        $kelas->update([
            'buka_absen' => true,
        ]);

        return redirect()->back()->with('success', 'Absensi berhasil dibuka');
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
