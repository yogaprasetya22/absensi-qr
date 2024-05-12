<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
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

        // create data roles
        Role::insert($roles);
    }
}
