<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class GbvCase extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'gbv_cases'; // Updated table name

    protected $fillable = [
        'case_number',
        'incident_number',
        'survivor_id',
        'incident_type',
        'incident_type_other',
        'incident_date',
        'incident_location',
        'incident_sub_county',
        'incident_ward',
        'incident_village',
        'description',
        'perpetrator_details',
        'status',
        'conclusion_type',
        'conclusion_notes',
        'concluded_at',
        'concluded_by',
        'priority',
        'is_sensitive',
        'primary_officer_id',
        'created_by',
        'audio_transcriptions'
    ];

    protected $casts = [
        'incident_date' => 'datetime',
        'concluded_at' => 'datetime',
        'perpetrator_details' => 'array',
        'audio_transcriptions' => 'array',
        'is_sensitive' => 'boolean',
    ];

    // Activity Log Options
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'case_number',
                'status',
                'priority',
                'incident_type',
                'primary_officer_id',
                'concluded_at'
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Case {$this->case_number} has been {$eventName}");
    }

    // Relationships (same as before)
    public function survivor()
    {
        return $this->belongsTo(Survivor::class);
    }

    public function primaryOfficer()
    {
        return $this->belongsTo(User::class, 'primary_officer_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function concludedBy()
    {
        return $this->belongsTo(User::class, 'concluded_by');
    }

    public function caseFiles()
    {
        return $this->hasMany(CaseFile::class, 'gbv_case_id'); // Updated foreign key
    }

    public function referrals()
    {
        return $this->hasMany(Referral::class, 'gbv_case_id'); // Updated foreign key
    }

    // Scopes and helper methods (same as before)
    public static function generateCaseNumber()
    {
        $year = date('Y');
        $lastCase = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastCase) {
            $lastNumber = intval(substr($lastCase->case_number, -5));
            $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '00001';
        }

        return "GBV/{$year}/{$newNumber}";
    }

    public function isConcluded()
    {
        return in_array($this->status, ['concluded', 'closed']);
    }

    public function canAddFiles()
    {
        return !$this->isConcluded();
    }
}