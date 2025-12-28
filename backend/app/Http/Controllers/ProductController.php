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

        // 1. Filter by Category if provided
        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }

        // 2. Optional: Filter by Search term (good to have)
        if ($request->has('search') && $request->search != '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Return the filtered results
        return ProductResource::collection($query->get());
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
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

    // Leave these empty if you aren't using them yet, 
    // or delete them to keep the file clean.
    public function create() {}
    public function show(Product $product) {}
    public function edit(Product $product) {}
    public function update(Request $request, Product $product) {}
    public function destroy(Product $product) {}
}