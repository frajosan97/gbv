<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survivor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'unique_code',
        'full_name',
        'phone',
        'alternate_phone',
        'gender',
        'dob',
        'age_bracket',
        'is_pwd',
        'pwd_type',
        'pwd_registration_number',
        'id_number',
        'id_type',
        'county',
        'sub_county',
        'ward',
        'village',
        'landmark',
        'location_coordinates',
        'anonymous',
        'consent_given',
        'consent_given_at',
        'consent_details',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
        'metadata',
        'created_by'
    ];

    protected $casts = [
        'dob' => 'date',
        'location_coordinates' => 'array',
        'consent_details' => 'array',
        'metadata' => 'array',
        'anonymous' => 'boolean',
        'is_pwd' => 'boolean',
        'consent_given' => 'boolean',
        'consent_given_at' => 'datetime',
    ];

    // Relationships
    public function cases()
    {
        return $this->hasMany(GbvCase::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopeByAgeBracket($query, $bracket)
    {
        return $query->where('age_bracket', $bracket);
    }

    public function scopePwd($query)
    {
        return $query->where('is_pwd', true);
    }

    public function scopeNonPwd($query)
    {
        return $query->where('is_pwd', false);
    }

    public function scopeByLocation($query, $county, $subCounty = null, $ward = null, $village = null)
    {
        $query->where('county', $county);

        if ($subCounty) {
            $query->where('sub_county', $subCounty);
        }

        if ($ward) {
            $query->where('ward', $ward);
        }

        if ($village) {
            $query->where('village', $village);
        }

        return $query;
    }

    // Helper methods
    public function calculateAgeBracket()
    {
        if (!$this->dob)
            return null;

        $age = $this->dob->age;

        if ($age <= 16)
            return '0-16';
        if ($age <= 35)
            return '17-35';
        if ($age <= 60)
            return '36-60';
        return '60+';
    }

    public function getAnonymousName()
    {
        return $this->anonymous ? 'Survivor ' . substr($this->unique_code, -4) : $this->full_name;
    }
}