<?php

namespace App\Http\Controllers;

use App\Models\Prodi;
use App\Models\user;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DhasboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faker = \Faker\Factory::create('id_ID');
        $now = Carbon::now();
        // fake data mahasiswa dan nimnya berdasarkan prodi
        $data_mahasiswa = [];
        $prodi = Prodi::all();
        foreach ($prodi as $key => $value) {
            $prodi_id = $value->id;
            $nama_prodi = $value->nama_prodi;
            $nim = [
                'Manajemen' => '202400' . $key . '01',
                'Akuntansi' => '202400' . $key . '02',
                'Ilmu Komunikasi' => '202400' . $key . '03',
                'Psikologi' => '202400' . $key . '04',
                'Teknik Sipil' => '202400' . $key . '05',
                'Arsitektur' => '202400' . $key . '06',
                'Informatika' => '202400' . $key . '07',
                'Sistem Informasi' => '202400' . $key . '08',
                'Desain Produk' => '202400' . $key . '09',
                'Desain Komunikasi Visual' => '202400' . $key . '10',
            ];

            $data_mahasiswa[] = [
                'prodi_id' => $prodi_id,
                'nim' => $nim[$nama_prodi],
                'nama' => $nama_prodi . ' 1',
                'email' => 'mahasiswa' . $prodi_id . $key . '@gmail.com',
                'password' => bcrypt('asdasdasd'),
                'role_id' => '2',
                'created_at' => now(),
                'tempat_lahir' => $faker->city,
                'tanggal_lahir' => $now->year(2004)->subMonths(2)->subDays(5)->format('Y-m-d'),
                'alamat' => $faker->address,
                'no_hp' => $faker->phoneNumber,
            ];
        }

        return response()->json($data_mahasiswa);
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
    public function show(user $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
