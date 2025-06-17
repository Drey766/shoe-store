// app/cart/page.tsx - Enhanced version with quantity controls
'use client';

import React, { useMemo } from 'react';
import { useBasket } from '../context/StateProvider'; // Adjust path as needed
import { BasketItem } from '../types/index'; // Adjust path as needed
import Image from 'next/image';

const EnhancedCartPage: React.FC = () => {
  const { basket, removeFromBasket, addToBasket } = useBasket();

  // Group items by ID to handle quantities properly
  const groupedItems = useMemo(() => {
    const grouped: { [key: number]: BasketItem & { totalQuantity: number } } = {};
    
    basket.forEach(item => {
      if (grouped[item.id]) {
        grouped[item.id].totalQuantity += 1;
      } else {
        grouped[item.id] = { ...item, totalQuantity: 1 };
      }
    });
    
    return Object.values(grouped);
  }, [basket]);

  const basketTotal = useMemo(() => {
    return groupedItems.reduce((total, item) => total + (item.price * item.totalQuantity), 0);
  }, [groupedItems]);

  const updateQuantity = (item: BasketItem, newQuantity: number) => {
    const currentQuantity = basket.filter(basketItem => basketItem.id === item.id).length;
    
    if (newQuantity > currentQuantity) {
      // Add more items
      for (let i = 0; i < newQuantity - currentQuantity; i++) {
        addToBasket(item);
      }
    } else if (newQuantity < currentQuantity) {
      // Remove items
      for (let i = 0; i < currentQuantity - newQuantity; i++) {
        removeFromBasket(item.id);
      }
    }
  };

  const removeAllOfItem = (itemId: number) => {
    const itemsToRemove = basket.filter(item => item.id === itemId);
    itemsToRemove.forEach(() => removeFromBasket(itemId));
  };

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some items to get started!</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <a 
          href="/" 
          className="text-blue-600 hover:underline flex items-center"
        >
          ← Continue Shopping
        </a>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                Cart Items ({groupedItems.reduce((total, item) => total + item.totalQuantity, 0)})
              </h2>
            </div>
            
            <div className="divide-y">
              {groupedItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                    <p className="text-gray-600">{item.brandName}</p>
                    {item.colour && (
                      <p className="text-sm text-gray-500">Color: {item.colour}</p>
                    )}
                    <p className="text-lg font-semibold text-green-600 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item, item.totalQuantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.totalQuantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">
                        {item.totalQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item, item.totalQuantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total and Remove */}
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${(item.price * item.totalQuantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeAllOfItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${basketTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">
                  {basketTotal > 50 ? 'Free' : '$5.99'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${(basketTotal * 0.08).toFixed(2)}</span>
              </div>
              
              {basketTotal > 50 && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                  🎉 You qualify for free shipping!
                </div>
              )}
              
              <hr className="my-3" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>
                  ${(basketTotal + (basketTotal > 50 ? 0 : 5.99) + (basketTotal * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors font-semibold">
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCartPage;