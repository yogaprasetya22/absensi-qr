<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\Matkul;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Faker\Factory;

class DhasboardController extends Controller
{
    public function index()
    {
        $faker = Factory::create('id_ID');
        $now = Carbon::now();
        $data_kelas = [];
        $matkul_bt_kelas = Matkul::with('prodi.dosen.user')->get();
        foreach ($matkul_bt_kelas as $key => $data_matkul_bt_kelas) {
            for ($i = 1; $i <= 7; $i++) {
                $start_date = Carbon::now()->startOfWeek()->addDays($key);
                $tanggal_pertemuan = $start_date->copy()->addWeeks($i - 1); // Pertemuan setiap minggu
                $presensi_empty = Kelas::where('tanggal', $tanggal_pertemuan->format('Y-m-d'))->where('pertemuan', $i)->doesntExist();

                $jam_mulai = [
                    '07:00:00',
                    '13:00:00',
                ];
                $jam_selesai = [
                    '09:40:00',
                    '15:40:00',
                ];

                $kelas = Kelas::create([
                    'dosen_id' => $data_matkul_bt_kelas->prodi->dosen->user->id,
                    'matkul_id' => $data_matkul_bt_kelas->id,
                    'pertemuan' => $i,
                    'tanggal' => $tanggal_pertemuan->format('Y-m-d'),
                    'jam_mulai' => $presensi_empty ? $jam_mulai[0] : $jam_mulai[1],
                    'jam_selesai' => $presensi_empty ? $jam_selesai[0] : $jam_selesai[1],
                ]);

                $kelas->absensi()->create([
                    'mahasiswa_id' => Mahasiswa::inRandomOrder()->first()->id,
                    'tanggal' => $tanggal_pertemuan->format('Y-m-d'),
                    'jam_masuk' => $presensi_empty ? $jam_mulai[0] : $jam_mulai[1],
                    'status' => 'hadir',
                ]);
            }
        }
        return response()->json([
            'count' => count($data_kelas),
            'data' => $data_kelas,
        ]);

        // $data_mahasiswa = [];
        // $nums_mahasiswa = 1;
        // $prodi = Prodi::with('matkul')->get();
        // foreach ($prodi as $key => $value) {
        //     for ($i = 1; $i <= 14; $i++) {
        //         $validasi_A_or_B = $nums_mahasiswa < 8 ? "A" : "B";
        //         $data_mahasiswa[] = [
        //             'prodi_id' => $value->id,
        //             'name' => 'Mahasiswa' . "_" . $value->nama_prodi . "_" . $validasi_A_or_B,
        //             'email' => 'mahasiswa' .  $value->id . "_" . $nums_mahasiswa . "_" .  $validasi_A_or_B . '@gmail.com',
        //             'nim' => '2024' .  sprintf(
        //                 "%02d",
        //                 $value->id,
        //             ) . sprintf(
        //                 "%02d",
        //                 $nums_mahasiswa
        //             ),
        //             'alamat' => $faker->address,
        //             'no_hp' => $faker->phoneNumber,
        //             'tempat_lahir' => $faker->city,
        //             'tanggal_lahir' => $faker->date(),
        //         ];
        //         $nums_mahasiswa++;
        //         if ($nums_mahasiswa > 14) {
        //             $nums_mahasiswa = 1;
        //         }
        //     }
        // }

        // return response()->json([
        //     'count' => count($data_mahasiswa),
        //     'data' => $data_mahasiswa,
        // ]);
    }
}
