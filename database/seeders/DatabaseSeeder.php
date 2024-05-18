<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DaftarMatkulDosen;
use App\Models\DaftarMatkulMahasiswa;
use App\Models\Kelas;
use App\Models\Matkul;
use App\Models\Prodi;
use App\Models\Role;
use App\Models\Ruangan;
use App\Models\Semester;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Factory::create('id_ID');
        $now = Carbon::now();

        // fake ruangan
        $ruangan = [
            [
                'nama_ruang' => 'A001',
            ],
            [
                'nama_ruang' => 'A002',
            ],
            [
                'nama_ruang' => 'A003',
            ],
            [
                'nama_ruang' => 'A004',
            ],
            [
                'nama_ruang' => 'A005',
            ],
            [
                'nama_ruang' => 'A006',
            ],
        ];

        // insert ruangan
        Ruangan::insert($ruangan);

        // fake semester
        $semester = [
            [
                'semester' => 1,
            ],
            [
                'semester' => 2,
            ],
            [
                'semester' => 3,
            ],
            [
                'semester' => 4,
            ],
            [
                'semester' => 5,
            ],
            [
                'semester' => 6,
            ],
            [
                'semester' => 7,
            ],
            [
                'semester' => 8,
            ],
        ];

        // insert semester
        Semester::insert($semester);

        $prodi = [
            [
                'nama_prodi' => 'Manajemen',
            ],
            [
                'nama_prodi' => 'Akuntansi',
            ],
            [
                'nama_prodi' => 'Ilmu Komunikasi',
            ],
            [
                'nama_prodi' => 'Psikologi',
            ],
            [
                'nama_prodi' => 'Informatika',
            ],
            [
                'nama_prodi' => 'Sistem Informasi',
            ],
            [
                'nama_prodi' => 'Desain Komunikasi Visual',
            ],
        ];

        Prodi::insert($prodi);

        // buatkan fake nama_matkul berdasarkan prodi
        $data_matkul = [];
        foreach ($prodi as $key => $value) {
            $prodi_id = $key + 1;
            $nama_prodi = $value['nama_prodi'];
            $nama_matkul = [
                'Manajemen' => [
                    'Manajemen Pemasaran',
                    'Manajemen Keuangan',
                    'Manajemen SDM',
                    'Manajemen Operasional'
                ],
                'Akuntansi' => [
                    'Akuntansi Keuangan',
                    'Akuntansi Manajemen',
                    'Akuntansi Sektor Publik',
                    'Akuntansi Pajak',
                ],
                'Ilmu Komunikasi' => [
                    'Teori Komunikasi',
                    'Komunikasi Antar Budaya',
                    'Komunikasi Politik',
                    'Komunikasi Pemasaran',
                ],
                'Psikologi' => [
                    'Psikologi Klinis',
                    'Psikologi Sosial',
                    'Psikologi Pendidikan',
                    'Psikologi Industri',
                ],
                'Informatika' => [
                    'Pemrograman Dasar',
                    'Pemrograman Web',
                    'Pemrograman Mobile',
                    'Pemrograman Desktop',
                ],
                'Sistem Informasi' => [
                    'Sistem Informasi Manajemen',
                    'Sistem Informasi Akuntansi',
                    'Sistem Informasi Keuangan',
                    'Sistem Informasi SDM',
                ],
                'Desain Komunikasi Visual' => [
                    'Desain Grafis',
                    'Desain Komunikasi Visual',
                    'Desain Multimedia',
                    'Desain Interaktif',
                ],
            ];

            foreach ($nama_matkul[$nama_prodi] as $key => $value) {
                $data_matkul[] = [
                    'prodi_id' =>  (int)$prodi_id,
                    'nama_matkul' => $value,
                    'sks' => (int)rand(2, 5),
                ];
            }
        }

        // insert data_matkul
        foreach ($data_matkul as $key => $value) {
            Matkul::create([
                'prodi_id' => $value['prodi_id'],
                'nama_matkul' => $value['nama_matkul'],
                'sks' => $value['sks'],
            ]);
        }

        $roles = [
            [
                'name_role' => 'admin',
            ],
            [
                'name_role' => 'mahasiswa',
            ],
            [
                'name_role' => 'dosen',
            ],
        ];

        Role::insert($roles);


        $data_mahasiswa = [];
        $nums_mahasiswa = 1;
        $prodi = Prodi::with('matkul')->get();
        foreach ($prodi as $key => $value) {
            for ($i = 1; $i <= 14; $i++) {
                $validasi_A_or_B = $nums_mahasiswa < 8 ? "A" : "B";
                $data_mahasiswa[] = [
                    'prodi_id' => $value->id,
                    'name' => 'Mahasiswa' . "_" . $value->nama_prodi . "_" . $validasi_A_or_B,
                    'email' => 'mahasiswa' .  $value->id . "_" . $nums_mahasiswa . "_" .  $validasi_A_or_B . '@gmail.com',
                    'nim' => '2024' .  sprintf(
                        "%02d",
                        $value->id,
                    ) . sprintf(
                        "%02d",
                        $nums_mahasiswa
                    ),
                    'alamat' => $faker->address,
                    'no_hp' => $faker->phoneNumber,
                    'tempat_lahir' => $faker->city,
                    'tanggal_lahir' => $faker->date(),
                ];
                $nums_mahasiswa++;
                if ($nums_mahasiswa > 14) {
                    $nums_mahasiswa = 1;
                }
            }
        }

        // insert data_mahasiswa
        foreach ($data_mahasiswa as $key => $value) {
            $mahasiswa =  User::create(
                [
                    'name' =>  $value['name'],
                    'email' => $value['email'],
                    'password' => bcrypt('asdasdasd'),
                    'role_id' => '2',
                    'created_at' => now(),
                ]
            );

            $mahasiswa->mahasiswa()->create([
                'prodi_id' => $value['prodi_id'],
                'nim' => $value['nim'],
                'alamat' => $value['alamat'],
                'no_hp' => $value['no_hp'],
                'tempat_lahir' => $value['tempat_lahir'],
                'tanggal_lahir' => $value['tanggal_lahir'],
            ]);
        }




        // fake data dosen
        $data_dosen = [];
        $prodi_dsn = Prodi::with('matkul')->get();
        foreach ($prodi_dsn as $key => $value) {
            $prodi_id = $value->id;
            $nama_prodi = $value->nama_prodi;
            $data_dosen[] = [
                'prodi_id' => $prodi_id,
                'nid' => '2024' .  sprintf(
                    "%02d",
                    $prodi_id
                ) .  sprintf(
                    "%03d",
                    $key + 1
                ),
                'nama' => 'Dosen ' . $nama_prodi,
                'email' => 'dosen' . $prodi_id  . '@gmail.com',
                'password' => bcrypt('asdasdasd'),
                'role_id' => '3',
                'created_at' => now(),
                'alamat' => $faker->address,
                'no_hp' => $faker->phoneNumber,
            ];
        }

        // insert data_dosen            
        foreach ($data_dosen as $key => $value) {
            $dosen =  User::create(
                [
                    'name' => $value['nama'],
                    'email' => $value['email'],
                    'password' => $value['password'],
                    'role_id' => $value['role_id'],
                    'created_at' => $value['created_at'],
                ]
            );

            $dosen->dosen()->create([
                'prodi_id' => $value['prodi_id'],
                'nid' => $value['nid'],
                'alamat' => $value['alamat'],
                'no_hp' => $value['no_hp'],
            ]);
        }


        // fake data daftar matkul mahasiswa
        $data_daftar_matkul_mahasiswa = [];
        $mahasiswa = User::with('mahasiswa')->where('role_id', 2)->get();
        foreach ($mahasiswa as $key => $value) {
            $mahasiswa_id = $value->mahasiswa->id;
            $matkul = Matkul::where('prodi_id', $value->mahasiswa->prodi_id)->get();
            $all_matkul = $matkul->pluck('id')->toArray();
            foreach ($all_matkul as $key => $matkul_id) {
                $data_daftar_matkul_mahasiswa[] = [
                    'mahasiswa_id' => $mahasiswa_id,
                    'matkul_id' => $matkul_id,
                ];
            }
        }

        foreach ($data_daftar_matkul_mahasiswa as $key => $value) {
            DaftarMatkulMahasiswa::create([
                'mahasiswa_id' => $value['mahasiswa_id'],
                'matkul_id' => $value['matkul_id'],
            ]);
        }

        //  fake data daftar matkul dosen 
        $data_daftar_matkul_dosen = [];
        $dosen = User::with('dosen')->where('role_id', 3)->get();
        foreach ($dosen as $key => $value) {
            $dosen_id = $value->dosen->id;
            $matkul = Matkul::where('prodi_id', $value->dosen->prodi_id)->get();
            $all_matkul = $matkul->pluck('id')->toArray();

            foreach ($all_matkul as $key => $matkul_id) {
                $data_daftar_matkul_dosen[] = [
                    'dosen_id' => $dosen_id,
                    'matkul_id' => $matkul_id,
                ];
            }
        }

        foreach ($data_daftar_matkul_dosen as $key => $value) {
            DaftarMatkulDosen::create([
                'dosen_id' => $value['dosen_id'],
                'matkul_id' => $value['matkul_id'],
            ]);
        }

        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '1',
            'created_at' => now(),
        ]);

        $matkul_bt_kelas = Matkul::with('prodi.dosen.user')->get();
        foreach ($matkul_bt_kelas as $key => $data_matkul_bt_kelas) {
            for ($i = 1; $i <= 7; $i++) {
                $start_date = Carbon::now()->startOfWeek()->addDays($key);
                $tanggal_pertemuan = $start_date->copy()->addWeeks($i - 1); // Pertemuan setiap minggu
                $presensi_empty = Kelas::where('tanggal', $tanggal_pertemuan->format('Y-m-d'))->where('pertemuan', $i)->doesntExist();

                $jam_mulai = [
                    '07:00',
                    '13:00',
                ];
                $jam_selesai = [
                    '09:40',
                    '15:40',
                ];

                Kelas::create([
                    'dosen_id' => $data_matkul_bt_kelas->prodi->dosen->user->id,
                    'matkul_id' => $data_matkul_bt_kelas->id,
                    'ruangan_id' => rand(1, 6),
                    'pertemuan' => $i,
                    'tanggal' => $tanggal_pertemuan->format('Y-m-d'),
                    'jam_mulai' => $presensi_empty ? $jam_mulai[0] : $jam_mulai[1],
                    'jam_selesai' => $presensi_empty ? $jam_selesai[0] : $jam_selesai[1],
                ]);
            }
        }
    }
}
