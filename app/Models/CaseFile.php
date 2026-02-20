<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class CaseFile extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'gbv_case_id',
        'partner_id',
        'created_by',
        'file_number',
        'file_type',
        'title',
        'description',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'encryption_key',
        'status',
        'submitted_at',
        'reviewed_by',
        'reviewed_at',
        'review_notes',
        'audio_transcription',
        'transcription_metadata',
        'version',
        'parent_file_id',
        'shared_with'
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'transcription_metadata' => 'array',
        'shared_with' => 'array',
    ];

    // Activity Log Options
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'file_number',
                'file_type',
                'status',
                'version'
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "File {$this->file_number} has been {$eventName}");
    }

    // Relationships
    public function gbvCase()
    {
        return $this->belongsTo(GbvCase::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function parentFile()
    {
        return $this->belongsTo(CaseFile::class, 'parent_file_id');
    }

    public function childFiles()
    {
        return $this->hasMany(CaseFile::class, 'parent_file_id');
    }

    // Helper methods
    public static function generateFileNumber($partnerId)
    {
        $year = date('Y');
        $count = self::whereYear('created_at', $year)
            ->where('partner_id', $partnerId)
            ->count() + 1;

        return "{$partnerId}/{$year}/" . str_pad($count, 5, '0', STR_PAD_LEFT);
    }

    public function isEditable()
    {
        return $this->status === 'draft';
    }

    public function canBeViewedBy(User $user)
    {
        if ($user->isAdmin())
            return true;

        if ($user->partner_id === $this->partner_id)
            return true;

        $sharedWith = $this->shared_with ?? [];
        return in_array($user->partner_id, $sharedWith);
    }
}