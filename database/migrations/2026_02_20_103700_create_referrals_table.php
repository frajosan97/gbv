<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->string('referral_number')->unique();

            // Links
            $table->foreignId('gbv_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('case_file_id')->nullable()->constrained()->nullOnDelete();

            // Referral details
            $table->foreignId('from_partner_id')->constrained('partners');
            $table->foreignId('to_partner_id')->constrained('partners');

            $table->enum('referral_type', [
                'medical',
                'legal',
                'police',
                'shelter',
                'counselling',
                'economic_empowerment',
                'other'
            ]);

            $table->text('reason');
            $table->json('services_requested')->nullable();

            // Status tracking
            $table->enum('status', [
                'pending',
                'accepted',
                'declined',
                'completed',
                'cancelled'
            ])->default('pending');

            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('feedback')->nullable();

            // Urgency
            $table->enum('urgency', [
                'routine',
                'urgent',
                'emergency'
            ])->default('routine');

            $table->unsignedBigInteger('created_by')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');

            $table->index('referral_number');
            $table->index('status');
            $table->index(['from_partner_id', 'status']);
            $table->index(['to_partner_id', 'status']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};