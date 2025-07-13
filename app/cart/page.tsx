// app/cart/page.tsx - Enhanced version with quantity controls
'use client';

import React, { useMemo } from 'react';
import { useBasket } from '../context/StateProvider'; // Adjust path as needed
import { BasketItem } from '../types/index'; // Adjust path as needed
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/styles/Cart.module.css'
import CheckoutHeader from '../components/CheckoutHeader';
import { Delete } from '@mui/icons-material';

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
      <div className="">
        <h1 className="">Your Cart</h1>
        <div className="">
          <div className="">🛒</div>
          <h2 className="">Your cart is empty</h2>
          <p className="">Add some items to get started!</p>
          <a 
            href="/" 
            className=""
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <CheckoutHeader title='Cart' link='/cart' linkTitle='cart' />
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Your Cart</h1>
          <Link
            href="/"
            className={styles.cartContinueShopping}
          >
            ← Continue Shopping
          </Link>
        </div>
      
        {/* Cart Items */}
        <div className={styles.cartItemsContainer}>
          <div className={styles.cartItemsWrapper}>
            <div className={styles.cartItems}>
              {groupedItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  {/* Product Image */}
                  <div className={styles.cartItemImageContainer}>
                    <Image
                      height={100}
                      width={78}
                      src={`https://${item.imageUrl}`}
                      alt={item.name}
                      className={styles.cartItemImage}
                    />
                  </div>
      
                  {/* Product Details */}
                  <div className={styles.cartItemDetailsContainer}>
                    <div className={styles.cartItemDetails}>
                      <h3 className={styles.cartItemName}>{item.name}</h3>
                      {item.colour && (
                        <p className="">Color: {item.colour}</p>
                      )}
                      <p className={styles.cartItemPrice}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    {/* Quantity Controls */}
                    <div className={styles.cartItemQuantity}>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item, item.totalQuantity - 1)}
                          className={styles.quantityButton}
                          disabled={item.totalQuantity <= 1}
                        >
                          -
                        </button>
                        <span className={styles.quantityDisplay}>
                          {item.totalQuantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item, item.totalQuantity + 1)}
                          className={styles.quantityButton}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeAllOfItem(item.id)}
                        className={styles.cartRemoveButton}
                      >
                        <Delete />
                      </button>
                    </div>
                  </div>
      
                  {/* Item Total and Remove */}
                  <div className="">
                    <p className="">
                      ${(item.price * item.totalQuantity).toFixed(2)}
                    </p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      
        {/* Cart Summary */}
        <div className={styles.cartSummary}>
          <div className={styles.cartSummaryContainer}>
            <h2 className={styles.cartSummaryTitle} >Order Summary</h2>
      
            <div className={styles.cartSummaryDetails}>
              <div className={styles.cartSummaryItem}>
                <span>Subtotal</span>
                <span>${basketTotal.toFixed(2)}</span>
              </div>
      
              <div className={styles.cartSummaryItem}>
                <span>Shipping</span>
                <span className="">
                  {basketTotal > 200 ? 'Free' : '$5.99'}
                </span>
              </div>
      
              <div className={styles.cartSummaryItem}>
                <span>Tax (8%)</span>
                <span>${(basketTotal * 0.08).toFixed(2)}</span>
              </div>
      
              {basketTotal > 200 && (
                <div className={styles.cartSummaryFreeShipping}>
                  🎉 You qualify for free shipping!
                </div>
              )}
      
              <hr className="" />
      
              <div className={styles.cartSummaryTotal}>
                <span>Total</span>
                <span>
                  ${(basketTotal + (basketTotal > 200 ? 0 : 5.99) + (basketTotal * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
      
            <Link href="/checkout"className={styles.cartCheckoutButton}>
              Proceed to Checkout
            </Link>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCartPage;