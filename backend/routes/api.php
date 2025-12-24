<?php

use App\Http\Controllers\ProductController;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

// This handles both GET (index) and POST (store)
Route::apiResource('products', ProductController::class);

// Users
Route::get("/users", function () {
    return UserResource::collection(User::all());
});

// Products
Route::get("/products", function () {
    return ProductResource::collection(Product::all());
});

// Orders (With relationship loaded)
Route::get("/orders", function () {
    return OrderResource::collection(Order::with('user')->get());
});

// Admin Stats Endpoint (Optional, for your Dashboard)
Route::get("/admin/stats", function () {
    return response()->json([
        'total_sales' => Order::sum('total_amount'),
        'total_orders' => Order::count(),
        'pending_delivery' => Order::where('status', 'pending')->count(),
        'new_customers' => User::where('role', 'customer')->count(),
    ]);
});