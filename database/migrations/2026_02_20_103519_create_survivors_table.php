<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('survivors', function (Blueprint $table) {
            $table->id();
            $table->string('unique_code')->unique(); // System-generated unique identifier
            $table->string('full_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('alternate_phone')->nullable();
            $table->enum('gender', ['male', 'female', 'other']);

            // Age disaggregation (improved)
            $table->date('dob')->nullable();
            $table->integer('age')->nullable()->virtualAs('TIMESTAMPDIFF(YEAR, dob, CURDATE())');
            $table->enum('age_bracket', [
                '0-16',
                '17-35',
                '36-60',
                '60+'
            ])->nullable();

            // PWD Status
            $table->boolean('is_pwd')->default(false);
            $table->string('pwd_type')->nullable(); // Type of disability
            $table->string('pwd_registration_number')->nullable();

            // Identity
            $table->string('id_number')->nullable();
            $table->string('id_type')->nullable(); // National ID, Passport, etc.

            // Location hierarchy
            $table->string('county');
            $table->string('sub_county');
            $table->string('ward')->nullable();
            $table->string('village')->nullable();
            $table->string('landmark')->nullable();
            $table->json('location_coordinates')->nullable(); // For mapping

            // Consent and anonymity
            $table->boolean('anonymous')->default(false);
            $table->boolean('consent_given')->default(false);
            $table->timestamp('consent_given_at')->nullable();
            $table->json('consent_details')->nullable(); // What was consented to

            // Emergency contact
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('emergency_contact_relation')->nullable();

            // Metadata
            $table->json('metadata')->nullable();
            $table->unsignedBigInteger('created_by')->nullable(); // User who registered

            $table->timestamps();
            $table->softDeletes();

            // Indexes for analysis
            $table->index('unique_code');
            $table->index('phone');
            $table->index('county');
            $table->index('sub_county');
            $table->index('ward');
            $table->index('village');
            $table->index('age_bracket');
            $table->index('is_pwd');
            $table->index(['county', 'sub_county', 'ward']);
            $table->index(['created_at', 'age_bracket']);

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survivors');
    }
};