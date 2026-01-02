<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ports', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
         
            $table->timestamps();
        });
           // $table->string('storage')->nullable(); 
            // $table->string('size')->nullable(); // e.g., 6.7 inches
            // $table->string('color')->nullable();
            // $table->string('processor')->nullable();
            // $table->string('ram')->nullable(); // e.g., 8GB
            // $table->string('battery')->nullable(); // e.g., 4500mAh
            // $table->string('camera')->nullable(); // e.g., 50MP
            // $table->string('os')->nullable(); // Operating System
            // $table->boolean('water_resistant')->default(false);
            // $table->string('warranty')->nullable();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_specs');
    }
};
