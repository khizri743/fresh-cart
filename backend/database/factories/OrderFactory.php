<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_number' => '#ORD-' . fake()->unique()->numberBetween(1000, 9999),
            'total_amount' => fake()->randomFloat(2, 20, 500),
            'status' => fake()->randomElement(['pending', 'processing', 'delivered', 'cancelled']),
            'payment_status' => fake()->randomElement(['paid', 'unpaid']),
        ];
    }
}