<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Start a query builder
        $query = Product::query();

        // 1. Filter by Category
        // Note: Laravel automatically handles URL decoding for input values
        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        // 2. Filter by Status (Added this)
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // 3. Filter by Search term
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        // Return the filtered results, ordered by newest first
        return ProductResource::collection($query->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'status' => 'required|string',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:products,slug',
            'image' => 'nullable|string'
        ]);

        $product = Product::create($validated);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product) 
    {
        return new ProductResource($product);
    }

    // Empty stubs for future implementation
    public function create() {}
    public function edit(Product $product) {}
    public function update(Request $request, Product $product) {}
    public function destroy(Product $product) {}
}