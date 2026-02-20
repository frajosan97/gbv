<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Referral extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'referral_number',
        'gbv_case_id',
        'case_file_id',
        'from_partner_id',
        'to_partner_id',
        'referral_type',
        'reason',
        'services_requested',
        'status',
        'accepted_at',
        'completed_at',
        'feedback',
        'urgency',
        'created_by'
    ];

    protected $casts = [
        'services_requested' => 'array',
        'accepted_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Activity Log Options
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'referral_number',
                'status',
                'urgency',
                'to_partner_id'
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Referral {$this->referral_number} has been {$eventName}");
    }

    // Relationships
    public function gbvCase()
    {
        return $this->belongsTo(GbvCase::class);
    }

    public function caseFile()
    {
        return $this->belongsTo(CaseFile::class);
    }

    public function fromPartner()
    {
        return $this->belongsTo(Partner::class, 'from_partner_id');
    }

    public function toPartner()
    {
        return $this->belongsTo(Partner::class, 'to_partner_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Helper methods
    public static function generateReferralNumber()
    {
        $year = date('Y');
        $lastReferral = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastReferral) {
            $lastNumber = intval(substr($lastReferral->referral_number, -5));
            $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '00001';
        }

        return "REF/{$year}/{$newNumber}";
    }

    public function isPending()
    {
        return $this->status === 'pending';
    }
}