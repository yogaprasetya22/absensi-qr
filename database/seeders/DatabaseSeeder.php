<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelas;
use App\Models\Maktul;
use App\Models\Prodi;
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
                'nama_prodi' => 'Teknik Sipil',
            ],
            [
                'nama_prodi' => 'Arsitektur',
            ],
            [
                'nama_prodi' => 'Informatika',
            ],
            [
                'nama_prodi' => 'Sistem Informasi',
            ],
            [
                'nama_prodi' => 'Desain Produk',
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
                'Teknik Sipil' => [
                    'Teknik Struktur',
                    'Teknik Transportasi',
                    'Teknik Lingkungan',
                    'Teknik Geoteknik',
                ],
                'Arsitektur' => [
                    'Arsitektur Perumahan',
                    'Arsitektur Komersial',
                    'Arsitektur Lanskap',
                    'Arsitektur Interior',
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
                'Desain Produk' => [
                    'Desain Produk Digital',
                    'Desain Produk Komunikasi',
                    'Desain Produk Industri',
                    'Desain Produk Interior',
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
                    'nama_matkul' => $value,
                    'prodi_id' =>  (int)$prodi_id,
                    'sks' => (int)rand(1, 4),
                ];
            }
        }

        // insert data_matkul
        foreach ($data_matkul as $key => $value) {
            Maktul::create([
                'prodi_id' => $value['prodi_id'],
                'nama_maktul' => $value['nama_matkul'],
                'sks' => $value['sks'],
            ]);
        }

        // buatkan fake kelas berdasarkan maktul
        $data_kelas = [];
        $maktul = Maktul::with('prodi')->get();
        // $table->id();
        // $table->foreignId('maktul_id');
        // $table->foreignId('dosen_id')->nullable();
        // $table->string('nama_kelas');
        // $table->string('ruangan');
        // $table->time('jam_mulai');
        // $table->time('jam_selesai');
        foreach ($maktul as $key => $value) {
            $maktul_id = $value->id;
            $prodi_id = $value->prodi->id;
            $nama_maktul = $value->nama_maktul;
            $sks = $value->sks;
            $nama_kelas = [
                'A',
                'B',
                'C',
                'D',
            ];
            $ruangan = [
                'A101',
                'A102',
                'A103',
                'A104',
            ];
            $jam_mulai = [
                '07:00:00',
                '09:00:00',
                '13:00:00',
                '15:00:00',
            ];
            $jam_selesai = [
                '08:40:00',
                '10:40:00',
                '14:40:00',
                '16:40:00',
            ];

            foreach ($nama_kelas as $key => $value) {
                $data_kelas[] = [
                    'maktul_id' => $maktul_id,
                    'dosen_id' => null,
                    'nama_kelas' => $nama_maktul . ' ' . $value,
                    'ruangan' => $ruangan[$key],
                    'jam_mulai' => $jam_mulai[$key],
                    'jam_selesai' => $jam_selesai[$key],
                ];
            }
        }

        // insert data_kelas
        foreach ($data_kelas as $key => $value) {
            Kelas::create([
                'maktul_id' => $value['maktul_id'],
                'dosen_id' => $value['dosen_id'],
                'nama_kelas' => $value['nama_kelas'],
                'ruangan' => $value['ruangan'],
                'jam_mulai' => $value['jam_mulai'],
                'jam_selesai' => $value['jam_selesai'],
            ]);
        }



        $this->call([
            RoleSeeder::class,
        ]);

        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'role_id' => '1',
            'created_at' => now(),
        ]);


        // fake data mahasiswa dan nimnya berdasarkan prodi
        $data_mahasiswa = [];
        $prodi = Prodi::all();
        foreach ($prodi as $key => $value) {
            for ($i = 1; $i <= 10; $i++) {
                $prodi_id = $value->id;
                $nama_prodi = $value->nama_prodi;
                $data_mahasiswa[] = [
                    'prodi_id' => $prodi_id,
                    'nim' => '202400' . $prodi_id . $i,
                    'nama' => $nama_prodi . ' ' . $i,
                    'email' => 'mahasiswa' . $prodi_id . "_" . $i . '@gmail.com',
                    'password' => bcrypt('asdasdasd'),
                    'role_id' => '2',
                    'created_at' => now(),
                    'tempat_lahir' => $faker->city,
                    'tanggal_lahir' => $now->year(2004)->subMonths(2)->subDays(5)->format('Y-m-d'),
                    'alamat' => $faker->address,
                    'no_hp' => $faker->phoneNumber,
                ];
            }
        }

        // insert data_mahasiswa
        foreach ($data_mahasiswa as $key => $value) {
            $mahasiswa =  User::create(
                [
                    'name' => $value['nama'],
                    'email' => $value['email'],
                    'password' => $value['password'],
                    'role_id' => $value['role_id'],
                    'created_at' => $value['created_at'],
                ]
            );

            $mahasiswa->mahasiswa()->create([
                'prodi_id' => $value['prodi_id'],
                'nim' => $value['nim'],
                'tempat_lahir' => $value['tempat_lahir'],
                'tanggal_lahir' => $value['tanggal_lahir'],
                'alamat' => $value['alamat'],
                'no_hp' => $value['no_hp'],
            ]);
        }

        // fake data dosen
        $data_dosen = [];
        $prodi = Prodi::all();
        foreach ($prodi as $key => $value) {
            for ($i = 1; $i <= 2; $i++) {
                $prodi_id = $value->id;
                $nama_prodi = $value->nama_prodi;
                $data_dosen[] = [
                    'prodi_id' => $prodi_id,
                    'nid' => '202400' . $prodi_id . $i,
                    'nama' => 'Dosen ' . $nama_prodi . ' ' . $i,
                    'email' => 'dosen' . $prodi_id . "_" . $i . '@gmail.com',
                    'password' => bcrypt('asdasdasd'),
                    'role_id' => '3',
                    'created_at' => now(),
                    'tempat_lahir' => $faker->city,
                    'tanggal_lahir' => $now->year(1980)->subMonths(2)->subDays(5)->format('Y-m-d'),
                    'alamat' => $faker->address,
                    'no_hp' => $faker->phoneNumber,
                ];
            }
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
    }
}
