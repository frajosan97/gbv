<?php
// database/seeders/UserSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Partner;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Partner IDs mapping for reference
     */
    private $partnerIds = [];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First, ensure all roles exist (they should from RolesAndPermissionsSeeder)
        $this->command->info('Creating users for each role...');

        // Create Super Admin
        $this->createSuperAdmin();

        // Create Admin Users
        $this->createAdmins();
    }

    /**
     * Create Super Admin
     */
    private function createSuperAdmin(): void
    {
        $superAdmin = User::firstOrCreate(
            ['email' => 'super.admin@gbv.go.ke'],
            [
                'name' => 'Dr. James Mwangi',
                'phone' => '0722000001',
                'password' => Hash::make('SuperAdmin@123'),
                'role' => User::ROLE_SUPER_ADMIN,
                'is_active' => true,
                'can_print_reports' => true,
                'can_export_data' => true,
                'badge_number' => 'ADMIN-001',
                'email_verified_at' => now(),
            ]
        );
        $superAdmin->assignRole(User::ROLE_SUPER_ADMIN);

        $this->command->info('Super Admin created: super.admin@gbv.go.ke');
    }

    /**
     * Create Admin Users
     */
    private function createAdmins(): void
    {
        $admins = [
            [
                'name' => 'Sarah Kimani',
                'email' => 'sarah.kimani@gbv.go.ke',
                'phone' => '0722000002',
                'badge_number' => 'ADMIN-002',
            ],
            [
                'name' => 'John Omondi',
                'email' => 'john.omondi@gbv.go.ke',
                'phone' => '0722000003',
                'badge_number' => 'ADMIN-003',
            ],
        ];

        foreach ($admins as $adminData) {
            $admin = User::firstOrCreate(
                ['email' => $adminData['email']],
                [
                    'name' => $adminData['name'],
                    'phone' => $adminData['phone'],
                    'password' => Hash::make('Admin@123'),
                    'role' => User::ROLE_ADMIN,
                    'is_active' => true,
                    'can_print_reports' => true,
                    'can_export_data' => true,
                    'badge_number' => $adminData['badge_number'],
                    'email_verified_at' => now(),
                ]
            );
            $admin->assignRole(User::ROLE_ADMIN);

            $this->command->info("Admin created: {$adminData['email']}");
        }
    }
}