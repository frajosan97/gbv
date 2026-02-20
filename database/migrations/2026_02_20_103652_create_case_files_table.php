<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('case_files', function (Blueprint $table) {
            $table->id();

            // Link to main case folder
            $table->foreignId('gbv_case_id')->constrained()->cascadeOnDelete();

            // Agency/Partner information
            $table->foreignId('partner_id')->constrained();
            $table->unsignedBigInteger('created_by')->nullable();

            // File identification
            $table->string('file_number')->unique(); // Agency-specific file reference

            // File type categorization
            $table->enum('file_type', [
                'police_report',
                'medical_report',
                'counselling_notes',
                'legal_document',
                'shelter_intake',
                'statement',
                'evidence',
                'court_document',
                'referral_form',
                'other'
            ]);

            // File metadata
            $table->string('title');
            $table->text('description')->nullable();

            // File storage (encrypted)
            $table->string('file_path');
            $table->string('file_name');
            $table->string('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->string('encryption_key')->nullable(); // Reference to key management

            // File status
            $table->enum('status', [
                'draft',
                'submitted',
                'under_review',
                'approved',
                'rejected',
                'archived'
            ])->default('draft');

            // Review/approval workflow
            $table->timestamp('submitted_at')->nullable();
            $table->unsignedBigInteger('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_notes')->nullable();

            // For audio files - transcription
            $table->string('audio_transcription')->nullable();
            $table->json('transcription_metadata')->nullable();

            // Version control
            $table->integer('version')->default(1);
            $table->unsignedBigInteger('parent_file_id')->nullable(); // For file versions

            // Sharing permissions
            $table->json('shared_with')->nullable(); // Partner IDs that can access

            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('reviewed_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('parent_file_id')->references('id')->on('case_files')->onDelete('cascade');

            // Indexes
            $table->index('file_number');
            $table->index('file_type');
            $table->index('status');
            $table->index(['gbv_case_id', 'partner_id']);
            $table->index(['gbv_case_id', 'file_type']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_files');
    }
};