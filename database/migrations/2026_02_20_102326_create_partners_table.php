<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();

            // Organization Information
            $table->string('organization_name');
            $table->enum('organization_type', [
                'hospital',
                'police',
                'ngo',
                'shelter',
                'legal_aid',
                'government'
            ]);
            $table->string('registration_number')->nullable();
            $table->year('year_established')->nullable();

            // Contact Information
            $table->string('contact_person');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('alternate_phone')->nullable();

            // Address Information
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('county')->default('Kitui');
            $table->string('sub_county')->nullable();
            $table->string('ward')->nullable();
            $table->string('postal_code')->nullable();

            // Account Information
            $table->unsignedBigInteger('user_id')->nullable();

            // API Integration
            $table->string('api_key')->nullable();
            $table->string('api_secret')->nullable();
            $table->json('api_settings')->nullable();

            // Additional Information
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            $table->json('services_offered')->nullable(); // List of GBV services

            // Status and Verification
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
                'suspended'
            ])->default('pending');
            $table->timestamp('verified_at')->nullable();
            $table->string('verification_token')->nullable();

            // Terms Agreement
            $table->boolean('terms_accepted')->default(false);
            $table->boolean('data_sharing_consent')->default(false);
            $table->timestamp('terms_accepted_at')->nullable();

            // Metadata
            $table->json('metadata')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('organization_name');
            $table->index('organization_type');
            $table->index('email');
            $table->index('county');
            $table->index('sub_county');
            $table->index('ward');
            $table->index('status');
            $table->index(['county', 'sub_county', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};