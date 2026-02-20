<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'organization_name',
        'organization_type',
        'registration_number',
        'year_established',
        'contact_person',
        'email',
        'phone',
        'alternate_phone',
        'address',
        'city',
        'county',
        'sub_county',
        'ward',
        'postal_code',
        'user_id',
        'api_key',
        'api_secret',
        'api_settings',
        'website',
        'description',
        'services_offered',
        'status',
        'verified_at',
        'verification_token',
        'terms_accepted',
        'data_sharing_consent',
        'terms_accepted_at',
        'metadata'
    ];

    protected $casts = [
        'year_established' => 'integer',
        'verified_at' => 'datetime',
        'terms_accepted_at' => 'datetime',
        'terms_accepted' => 'boolean',
        'data_sharing_consent' => 'boolean',
        'api_settings' => 'array',
        'services_offered' => 'array',
        'metadata' => 'array',
    ];

    const TYPE_HOSPITAL = 'hospital';
    const TYPE_POLICE = 'police';
    const TYPE_NGO = 'ngo';
    const TYPE_SHELTER = 'shelter';
    const TYPE_LEGAL_AID = 'legal_aid';
    const TYPE_GOVERNMENT = 'government';

    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';
    const STATUS_SUSPENDED = 'suspended';

    // Relationships
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function adminUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function caseFiles()
    {
        return $this->hasMany(CaseFile::class);
    }

    public function sentReferrals()
    {
        return $this->hasMany(Referral::class, 'from_partner_id');
    }

    public function receivedReferrals()
    {
        return $this->hasMany(Referral::class, 'to_partner_id');
    }

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('organization_type', $type);
    }

    public function scopeInCounty($query, $county)
    {
        return $query->where('county', $county);
    }

    // Helper methods
    public function isApproved()
    {
        return $this->status === self::STATUS_APPROVED;
    }

    public function isHospital()
    {
        return $this->organization_type === self::TYPE_HOSPITAL;
    }

    public function isPolice()
    {
        return $this->organization_type === self::TYPE_POLICE;
    }
}