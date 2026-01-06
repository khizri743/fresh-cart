<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // IMPORTANT: Add these fields to allow saving
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'price',
        'quantity',
    ];

    // Optional: Relationship back to order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    // Optional: Relationship to product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}