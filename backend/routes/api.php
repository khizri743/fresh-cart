<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController; // Ensure OrderController is imported
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\OrderResource;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. PUBLIC ROUTES (Guests can access these) ---

// Allow guests to place orders (POST)
// Moved OUT of the auth middleware
Route::post('/orders', [OrderController::class, 'store']); 

// Products (View, Create, Edit, Delete)
Route::apiResource('products', ProductController::class);

// --- 2. PROTECTED ROUTES (Requires Login) ---
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());
    });
});

// --- 3. ADMIN / READ ROUTES ---

// List Users
Route::get("/users", function () {
    return UserResource::collection(User::all());
});

// List All Orders (GET) - Kept public for Admin Panel access in this setup
Route::get("/orders", function () {
    return OrderResource::collection(Order::with('user')->get());
});

// Admin Stats
Route::get("/admin/stats", function () {
    return response()->json([
        'total_sales' => Order::sum('total_amount'),
        'total_orders' => Order::count(),
        'pending_delivery' => Order::where('status', 'pending')->count(),
        'new_customers' => User::where('role', 'customer')->count(),
    ]);
});