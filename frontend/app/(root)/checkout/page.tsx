'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();

  // NOTE: remove middleware: 'auth' so guests aren't redirected
  const { user } = useAuth();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Address State
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });

  // Guest Info State
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '' });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload
    const payload = {
      items: cart,
      total: cartTotal,
      address: address,
      // Send guest info if user is null
      guest_name: user ? user.name : guestInfo.name,
      guest_email: user ? user.email : guestInfo.email,
    };

    try {
      await axios.post('/api/orders', payload);
      clearCart();
      alert('Order placed successfully!');
      router.push('/shop');
    } catch (error: any) {
      console.error(error);
      alert(
        'Failed to place order: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <div className="p-10 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {/* GUEST FIELDS (Only show if not logged in) */}
            {!user && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={guestInfo.name}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={guestInfo.email}
                    onChange={(e) =>
                      setGuestInfo({ ...guestInfo, email: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {/* LOGGED IN USER DISPLAY */}
            {user && (
              <div className="bg-green-50 p-3 rounded mb-4 text-sm text-green-800">
                Logged in as <strong>{user.name}</strong> ({user.email})
              </div>
            )}

            {/* ADDRESS FIELDS */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  required
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  required
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 mt-6"
            >
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary (Same as before) */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          {/* ... Summary UI code ... */}
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <ul className="space-y-4 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
