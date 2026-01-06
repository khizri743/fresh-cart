<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderItem;
use App\Models\Order;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     return OrderResource::collection(Order::with('user')->get());
    // }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 1. Start Query
        $query = Order::query()->with('user'); // Eager load user relationship

        // 2. Filter by Status (e.g. ?status=pending)
        if ($request->filled('status')) {
            // Lowercase comparison to avoid case-sensitivity issues
            $query->where('status', $request->status);
        }

        // 3. Filter by Payment Status (e.g. ?payment=paid)
        if ($request->filled('payment')) {
            $query->where('payment_status', $request->payment);
        }

        // 4. Search by ID or Customer Name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%") // Guest names
                  ->orWhereHas('user', function($u) use ($search) { // Registered users
                      $u->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // 5. Return Results (Newest first)
        return OrderResource::collection($query->latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'total' => 'required|numeric',
            // Address validation
            'address.street' => 'required|string',
            'address.city' => 'required|string',
            'address.zip' => 'required|string',
            // Guest validation (required if not logged in)
            'guest_name' => 'nullable|string',
            'guest_email' => 'nullable|email',
        ]);

        try {
            // Check if user is logged in via Sanctum
            $user = $request->user('sanctum');

            // Determine Customer Details
            $userId = $user ? $user->id : null;
            $customerName = $user ? $user->name : $request->guest_name;
            $customerEmail = $user ? $user->email : $request->guest_email;

            if (!$customerName || !$customerEmail) {
                return response()->json(['message' => 'Name and Email are required.'], 422);
            }

            $order = DB::transaction(function () use ($request, $userId, $customerName, $customerEmail) {
                // 1. Create Order
                $order = Order::create([
                    'user_id' => $userId,
                    'customer_name' => $customerName,
                    'customer_email' => $customerEmail,
                    'shipping_address' => $request->address, // Laravel casts array to JSON
                    'order_number' => 'ORD-' . strtoupper(uniqid()),
                    'total_amount' => $request->total,
                    'status' => 'pending',
                    'payment_status' => 'unpaid'
                ]);

                // 2. Create Items
                foreach ($request->items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['id'],
                        'product_name' => $item['name'], 
                        'price' => $item['price'],
                        'quantity' => $item['quantity'],
                    ]);
                }
                
                return $order;
            });

            return response()->json([
                'message' => 'Order placed successfully', 
                'order_id' => $order->order_number
            ], 201);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Server Error'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
