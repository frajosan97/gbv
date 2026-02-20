<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ==================== PERMISSIONS ====================

        // User Management Permissions
        $userPermissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'activate users',
            'suspend users',
            'reset user passwords',
            'assign roles',
            'view user activity logs',
        ];

        // Case Management Permissions
        $casePermissions = [
            'view cases',
            'create cases',
            'edit cases',
            'delete cases',
            'conclude cases',
            'reopen cases',
            'assign cases',
            'transfer cases',
            'view sensitive cases',
            'export cases',
            'print cases',
            'view case statistics',
            'view case analytics',
        ];

        // Case File Permissions
        $filePermissions = [
            'view case files',
            'create case files',
            'edit case files',
            'delete case files',
            'approve case files',
            'reject case files',
            'review case files',
            'download case files',
            'share case files',
            'view encrypted files',
            'upload files',
            'transcribe audio files',
        ];

        // Survivor Management Permissions
        $survivorPermissions = [
            'view survivors',
            'create survivors',
            'edit survivors',
            'delete survivors',
            'export survivors',
            'view survivor statistics',
            'view pwd survivors',
            'view age disaggregated data',
        ];

        // Partner/Agency Management Permissions
        $partnerPermissions = [
            'view partners',
            'create partners',
            'edit partners',
            'delete partners',
            'approve partners',
            'suspend partners',
            'manage partner integrations',
            'view partner statistics',
        ];

        // Referral Management Permissions
        $referralPermissions = [
            'view referrals',
            'create referrals',
            'edit referrals',
            'delete referrals',
            'accept referrals',
            'decline referrals',
            'complete referrals',
            'view referral statistics',
            'manage urgent referrals',
            'manage emergency referrals',
        ];

        // Report & Analytics Permissions
        $reportPermissions = [
            'view reports',
            'create reports',
            'export reports',
            'print reports',
            'schedule reports',
            'view dashboards',
            'create custom dashboards',
            'export analytics',
            'view graphical analytics',
            'view trends analysis',
            'view sub-county analytics',
            'view ward analytics',
            'view village analytics',
            'drill down analytics',
        ];

        // System Administration Permissions
        $systemPermissions = [
            'view system logs',
            'manage system settings',
            'manage backup',
            'restore backup',
            'view audit logs',
            'manage security settings',
            'manage encryption keys',
            'configure API settings',
            'manage WAF settings',
            'manage rate limiting',
            'view monitoring data',
            'manage intrusion detection',
        ];

        // Notification Permissions
        $notificationPermissions = [
            'send notifications',
            'view notifications',
            'manage notification templates',
            'configure alert settings',
        ];

        // Audit & Compliance Permissions
        $auditPermissions = [
            'view audit trails',
            'export audit logs',
            'manage data retention',
            'view compliance reports',
            'manage consent records',
        ];

        // Merge all permissions
        $allPermissions = array_merge(
            $userPermissions,
            $casePermissions,
            $filePermissions,
            $survivorPermissions,
            $partnerPermissions,
            $referralPermissions,
            $reportPermissions,
            $systemPermissions,
            $notificationPermissions,
            $auditPermissions
        );

        // Create all permissions
        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        // ==================== ROLES ====================

        // 1. SUPER ADMIN - Full system access
        $superAdmin = Role::firstOrCreate([
            'name' => User::ROLE_SUPER_ADMIN,
            'guard_name' => 'web'
        ]);
        $superAdmin->syncPermissions(Permission::all());

        // 2. ADMIN - System administration without some sensitive permissions
        $admin = Role::firstOrCreate([
            'name' => User::ROLE_ADMIN,
            'guard_name' => 'web'
        ]);
        $admin->syncPermissions([
            // User Management (except delete)
            'view users',
            'create users',
            'edit users',
            'activate users',
            'suspend users',
            'reset user passwords',
            'assign roles',

            // Case Management
            'view cases',
            'create cases',
            'edit cases',
            'conclude cases',
            'reopen cases',
            'assign cases',
            'transfer cases',
            'view sensitive cases',
            'export cases',
            'print cases',
            'view case statistics',
            'view case analytics',

            // Case Files
            'view case files',
            'create case files',
            'edit case files',
            'approve case files',
            'reject case files',
            'review case files',
            'download case files',
            'share case files',
            'upload files',

            // Survivor Management
            'view survivors',
            'create survivors',
            'edit survivors',
            'export survivors',
            'view survivor statistics',
            'view pwd survivors',
            'view age disaggregated data',

            // Partner Management
            'view partners',
            'create partners',
            'edit partners',
            'approve partners',
            'suspend partners',
            'view partner statistics',

            // Referral Management
            'view referrals',
            'create referrals',
            'edit referrals',
            'accept referrals',
            'decline referrals',
            'complete referrals',
            'view referral statistics',
            'manage urgent referrals',
            'manage emergency referrals',

            // Reports (except print)
            'view reports',
            'create reports',
            'export reports',
            'schedule reports',
            'view dashboards',
            'export analytics',
            'view graphical analytics',
            'view trends analysis',
            'view sub-county analytics',
            'view ward analytics',
            'drill down analytics',

            // Notifications
            'send notifications',
            'view notifications',
            'manage notification templates',
            'configure alert settings',

            // Audit
            'view audit trails',
            'export audit logs',
        ]);

        // 3. GBV OFFICER - Core case management
        $gbvOfficer = Role::firstOrCreate([
            'name' => User::ROLE_GBV_OFFICER,
            'guard_name' => 'web'
        ]);
        $gbvOfficer->syncPermissions([
            // Case Management
            'view cases',
            'create cases',
            'edit cases',
            'conclude cases',
            'reopen cases',
            'assign cases',
            'view sensitive cases',
            'print cases',
            'view case statistics',

            // Case Files
            'view case files',
            'create case files',
            'edit case files',
            'download case files',
            'upload files',
            'transcribe audio files',

            // Survivor Management
            'view survivors',
            'create survivors',
            'edit survivors',
            'view survivor statistics',
            'view pwd survivors',
            'view age disaggregated data',

            // Referral Management
            'view referrals',
            'create referrals',
            'edit referrals',
            'accept referrals',
            'complete referrals',
            'view referral statistics',
            'manage urgent referrals',
            'manage emergency referrals',

            // Reports (view only)
            'view reports',
            'view dashboards',
            'view graphical analytics',
            'view trends analysis',
            'view sub-county analytics',
            'drill down analytics',

            // Notifications
            'view notifications',
        ]);

        // 4. SOCIAL WORKER - Survivor support focus
        $socialWorker = Role::firstOrCreate([
            'name' => User::ROLE_SOCIAL_WORKER,
            'guard_name' => 'web'
        ]);
        $socialWorker->syncPermissions([
            // Case Management
            'view cases',
            'create cases',
            'edit cases',

            // Case Files (limited)
            'view case files',
            'create case files',
            'edit case files',
            'download case files',
            'upload files',
            'transcribe audio files',

            // Survivor Management (full)
            'view survivors',
            'create survivors',
            'edit survivors',
            'view survivor statistics',
            'view pwd survivors',
            'view age disaggregated data',

            // Referral Management
            'view referrals',
            'create referrals',
            'edit referrals',
            'accept referrals',
            'complete referrals',
            'view referral statistics',

            // Reports (limited)
            'view dashboards',
            'view graphical analytics',

            // Notifications
            'view notifications',
        ]);

        // 5. HOSPITAL STAFF - Medical focus
        $hospitalStaff = Role::firstOrCreate([
            'name' => User::ROLE_HOSPITAL_STAFF,
            'guard_name' => 'web'
        ]);
        $hospitalStaff->syncPermissions([
            // Case Management (view only relevant)
            'view cases',

            // Case Files (medical focus)
            'view case files',
            'create case files',
            'edit case files',
            'download case files',
            'upload files',
            'transcribe audio files',

            // Survivor Management (limited)
            'view survivors',
            'edit survivors',
            'view pwd survivors',
            'view age disaggregated data',

            // Referral Management (medical focus)
            'view referrals',
            'create referrals',
            'accept referrals',
            'complete referrals',

            // Reports (limited medical)
            'view dashboards',

            // Notifications
            'view notifications',
        ]);

        // 6. POLICE OFFICER - Law enforcement focus
        $policeOfficer = Role::firstOrCreate([
            'name' => User::ROLE_POLICE_OFFICER,
            'guard_name' => 'web'
        ]);
        $policeOfficer->syncPermissions([
            // Case Management (investigation focus)
            'view cases',
            'create cases',
            'edit cases',
            'view sensitive cases',
            'print cases',

            // Case Files (legal/evidence focus)
            'view case files',
            'create case files',
            'edit case files',
            'download case files',
            'upload files',
            'transcribe audio files',

            // Survivor Management (basic)
            'view survivors',
            'view pwd survivors',
            'view age disaggregated data',

            // Referral Management (legal focus)
            'view referrals',
            'create referrals',
            'accept referrals',
            'complete referrals',

            // Reports (legal focus)
            'view dashboards',

            // Notifications
            'view notifications',
        ]);

        // 7. NGO STAFF - Support services focus
        $ngoStaff = Role::firstOrCreate([
            'name' => User::ROLE_NGO_STAFF,
            'guard_name' => 'web'
        ]);
        $ngoStaff->syncPermissions([
            // Case Management (limited)
            'view cases',

            // Case Files (support services)
            'view case files',
            'create case files',
            'edit case files',
            'download case files',
            'upload files',

            // Survivor Management (support focus)
            'view survivors',
            'edit survivors',
            'view pwd survivors',
            'view age disaggregated data',

            // Referral Management
            'view referrals',
            'create referrals',
            'accept referrals',
            'complete referrals',
            'view referral statistics',

            // Reports
            'view dashboards',
            'view graphical analytics',

            // Notifications
            'view notifications',
        ]);

        // 8. VIEWER - Read-only access
        $viewer = Role::firstOrCreate([
            'name' => User::ROLE_VIEWER,
            'guard_name' => 'web'
        ]);
        $viewer->syncPermissions([
            // Read-only permissions
            'view cases',
            'view case files',
            'view survivors',
            'view referrals',
            'view reports',
            'view dashboards',
            'view graphical analytics',
            'view trends analysis',
            'view sub-county analytics',
            'view notifications',
        ]);

        // ==================== ASSIGN DEFAULT ROLES TO EXISTING USERS ====================
        // This is optional - you can run this separately or remove if not needed

        // Assign super admin to first user (if exists)
        $firstUser = User::first();
        if ($firstUser) {
            $firstUser->assignRole(User::ROLE_SUPER_ADMIN);
        }
    }
}