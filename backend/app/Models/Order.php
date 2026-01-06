<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id',
    'customer_name',   // Added
    'customer_email',  // Added
    'shipping_address',// Added
    'order_number',
    'total_amount',
    'status',
    'payment_status'
];

protected $casts = [
    'shipping_address' => 'array', // Automatically convert JSON to array
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}