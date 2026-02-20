<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('gbv_cases', function (Blueprint $table) {
            $table->id();

            // Case identification
            $table->string('case_number')->unique(); // Format: GBV/YYYY/XXXXX
            $table->string('incident_number')->nullable(); // Police incident number

            // Survivor information
            $table->foreignId('survivor_id')->constrained()->cascadeOnDelete();

            // Case type - including cyberbullying
            $table->enum('incident_type', [
                'rape',
                'defilement',
                'physical_assault',
                'emotional_abuse',
                'economic_abuse',
                'child_marriage',
                'fgm',
                'cyberbullying',
                'stalking',
                'sexual_harassment',
                'other'
            ]);

            $table->string('incident_type_other')->nullable(); // For "other" type

            // Incident details
            $table->timestamp('incident_date')->nullable();
            $table->string('incident_location')->nullable();
            $table->string('incident_sub_county')->nullable();
            $table->string('incident_ward')->nullable();
            $table->string('incident_village')->nullable();
            $table->text('description');

            // Perpetrator information (anonymized)
            $table->json('perpetrator_details')->nullable(); // Store non-identifying info

            // Case status workflow
            $table->enum('status', [
                'reported',
                'under_investigation',
                'medical_attention',
                'legal_proceedings',
                'counselling',
                'shelter_provided',
                'concluded',
                'closed',
                'reopened'
            ])->default('reported');

            // Conclusion details
            $table->enum('conclusion_type', [
                'successful_prosecution',
                'out_of_court_settlement',
                'referred_to_other_agency',
                'survivor_declined_further_action',
                'insufficient_evidence',
                'survivor_relocated',
                'other'
            ])->nullable();

            $table->text('conclusion_notes')->nullable();
            $table->timestamp('concluded_at')->nullable();
            $table->unsignedBigInteger('concluded_by')->nullable();

            // Priority and sensitivity
            $table->enum('priority', ['low', 'normal', 'high', 'critical'])->default('normal');
            $table->boolean('is_sensitive')->default(false);

            // Ownership
            $table->unsignedBigInteger('primary_officer_id')->nullable(); // Assigned officer
            $table->unsignedBigInteger('created_by')->nullable();

            // Metadata for audio transcription
            $table->json('audio_transcriptions')->nullable(); // Store transcribed audio paths/metadata

            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('concluded_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('primary_officer_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');

            // Indexes
            $table->index('case_number');
            $table->index('incident_type');
            $table->index('status');
            $table->index('priority');
            $table->index('incident_date');
            $table->index('concluded_at');
            $table->index(['survivor_id', 'status']);
            $table->index(['incident_type', 'status']);
            $table->index(['incident_sub_county', 'incident_ward']);
            $table->index(['created_at', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gbv_cases');
    }
};