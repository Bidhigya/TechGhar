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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('address')->after('email')->nullable();
            $table->string('mobile')->after('address')->nullable();
            $table->string('city')->after('mobile')->nullable();
            $table->string('profile_image')->after('city')->nullable();
            $table->string('zip')->after('profile_image')->nullable();
            $table->string('state')->after('zip')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn([
                'address',
                'mobile',
                'city',
                'profile_image',
                'zip',
                'state'
            ]);
        });
    }
};
