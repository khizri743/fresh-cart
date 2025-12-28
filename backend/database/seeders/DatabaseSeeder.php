<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        // Seed users first
        User::factory()->count(50)->create();

        // Then seed products
        Product::factory()->count(100)->create();

        // Finally, seed orders (which might relate to users/products)
        Order::factory()->count(200)->create();

        // Alternatively, use the call method for separate seeder classes:
        // $this->call([
        //     UserSeeder::class,
        //     ProductSeeder::class,
        //     OrderSeeder::class,
        // ]);
    }
}
