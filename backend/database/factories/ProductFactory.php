<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 1, 100),
            'stock' => fake()->numberBetween(0, 100),
            'status' => fake()->randomElement(['in_stock', 'low_stock', 'out_of_stock']),
            'image' => 'https://placehold.co/600x400',
        ];
    }
}