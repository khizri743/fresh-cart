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
    Schema::table('orders', function (Blueprint $table) {
        // Make user_id nullable
        $table->foreignId('user_id')->nullable()->change();
        
        // Add columns for guest/shipping info
        $table->string('customer_name')->after('user_id'); 
        $table->string('customer_email')->after('customer_name');
        $table->json('shipping_address')->after('customer_email'); // Store address as JSON
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            //
        });
    }
};
