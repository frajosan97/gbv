<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'avatar',
        'password',
        'role',
        'can_print_reports',
        'can_export_data',
        'permissions',
        'partner_id',
        'badge_number',
        'is_active',
        'last_login_at',
        'password_changed_at',
        'login_attempts',
        'locked_until'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password_changed_at' => 'datetime',
        'locked_until' => 'datetime',
        'last_login_at' => 'datetime',
        'permissions' => 'array',
        'is_active' => 'boolean',
        'can_print_reports' => 'boolean',
        'can_export_data' => 'boolean',
    ];

    // Role constants
    const ROLE_SUPER_ADMIN = 'super_admin';
    const ROLE_ADMIN = 'admin';
    const ROLE_GBV_OFFICER = 'gbv_officer';
    const ROLE_SOCIAL_WORKER = 'social_worker';
    const ROLE_HOSPITAL_STAFF = 'hospital_staff';
    const ROLE_POLICE_OFFICER = 'police_officer';
    const ROLE_NGO_STAFF = 'ngo_staff';
    const ROLE_VIEWER = 'viewer';

    // Relationships
    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function cases()
    {
        return $this->hasMany(GbvCase::class, 'primary_officer_id');
    }

    public function createdCases()
    {
        return $this->hasMany(GbvCase::class, 'created_by');
    }

    public function caseFiles()
    {
        return $this->hasMany(CaseFile::class, 'created_by');
    }

    // Helper methods
    public function isSuperAdmin()
    {
        return $this->role === self::ROLE_SUPER_ADMIN;
    }

    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN || $this->isSuperAdmin();
    }

    public function canPrintReports()
    {
        return $this->can_print_reports || $this->isAdmin();
    }

    public function belongsToPartner()
    {
        return !is_null($this->partner_id);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    /**
     * Check if user can view sensitive cases
     */
    public function canViewSensitiveCases(): bool
    {
        return $this->can('view sensitive cases') || $this->hasRole(self::ROLE_SUPER_ADMIN);
    }

    /**
     * Get user's role display name
     */
    public function getRoleDisplayName(): string
    {
        return match ($this->role) {
            self::ROLE_SUPER_ADMIN => 'Super Administrator',
            self::ROLE_ADMIN => 'Administrator',
            self::ROLE_GBV_OFFICER => 'GBV Officer',
            self::ROLE_SOCIAL_WORKER => 'Social Worker',
            self::ROLE_HOSPITAL_STAFF => 'Hospital Staff',
            self::ROLE_POLICE_OFFICER => 'Police Officer',
            self::ROLE_NGO_STAFF => 'NGO Staff',
            self::ROLE_VIEWER => 'Viewer',
            default => 'Unknown Role'
        };
    }

    /**
     * Get permissions grouped by module for this user
     */
    public function getGroupedPermissions(): array
    {
        $permissions = $this->getAllPermissions()->pluck('name')->toArray();

        return [
            'user_management' => array_filter($permissions, fn($p) => str_contains($p, 'users')),
            'case_management' => array_filter($permissions, fn($p) => str_contains($p, 'cases') && !str_contains($p, 'files')),
            'file_management' => array_filter($permissions, fn($p) => str_contains($p, 'files')),
            'survivor_management' => array_filter($permissions, fn($p) => str_contains($p, 'survivors')),
            'partner_management' => array_filter($permissions, fn($p) => str_contains($p, 'partners')),
            'referral_management' => array_filter($permissions, fn($p) => str_contains($p, 'referrals')),
            'reporting' => array_filter($permissions, fn($p) => str_contains($p, 'reports') || str_contains($p, 'analytics')),
            'system' => array_filter($permissions, fn($p) => str_contains($p, 'system') || str_contains($p, 'settings')),
        ];
    }
}