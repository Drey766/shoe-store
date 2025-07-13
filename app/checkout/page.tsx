'use client';

import React, { useState, useMemo } from 'react';
import styles from '@/app/styles/Checkout.module.css';
import Link from 'next/link';
import CheckoutHeader from '../components/CheckoutHeader';
import { useBasket } from '../context/StateProvider';
import { BasketItem } from '../types/index';

export default function CheckoutPage() {
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
    


  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvc: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Submit logic here
  };

  return (
    <div className={styles.checkout}>
        <CheckoutHeader title='Checkout' link='/checkout' linkTitle='Checkout' />
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutItemsContainer}>
                
                {submitted ? (
                    <div style={{ background: '#e6f9ea', color: '#388e3c', padding: 16, borderRadius: 8 }}>
                    Thank you for your order!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
                    <h2 className={styles.checkoutSummaryTitle}>Shipping Information</h2>
                    <div style={{ marginBottom: 16 }}>
                        <label className={styles.checkoutItemName}>Full Name</label>
                        <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={styles.checkoutItemPrice}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label className={styles.checkoutItemName}>Address</label>
                        <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className={styles.checkoutItemPrice}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label className={styles.checkoutItemName}>City</label>
                        <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className={styles.checkoutItemPrice}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label className={styles.checkoutItemName}>ZIP Code</label>
                        <input
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        required
                        className={styles.checkoutItemPrice}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                    </div>
                    <h2 className={styles.checkoutSummaryTitle}>Payment Details</h2>
                    <div style={{ marginBottom: 16 }}>
                        <label className={styles.checkoutItemName}>Card Number</label>
                        <input
                        type="text"
                        name="card"
                        value={form.card}
                        onChange={handleChange}
                        required
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={styles.checkoutItemPrice}
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                        <div style={{ flex: 1 }}>
                        <label className={styles.checkoutItemName}>Expiry</label>
                        <input
                            type="text"
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            className={styles.checkoutItemPrice}
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                        </div>
                        <div style={{ flex: 1 }}>
                        <label className={styles.checkoutItemName}>CVC</label>
                        <input
                            type="text"
                            name="cvc"
                            value={form.cvc}
                            onChange={handleChange}
                            required
                            maxLength={4}
                            className={styles.checkoutItemPrice}
                            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #eee', marginTop: 4 }}
                        />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={styles.checkoutCheckoutButton}
                        style={{ marginTop: 8 }}
                    >
                        Place Order
                    </button>
                    </form>
                )}
            </div>
        {/* Order Summary */}
            <div className={styles.checkoutSummary}>
            <div className={styles.checkoutSummaryContainer}>
                <h2 className={styles.checkoutSummaryTitle}>Order Summary</h2>
                <div className={styles.checkoutSummaryDetails}>
                <div className={styles.checkoutSummaryItem}>
                    <span>Subtotal</span>
                    <span>${(basketTotal).toFixed(2)}</span>
                </div>
                <div className={styles.checkoutSummaryItem}>
                    <span>Shipping</span>
                    <span>{basketTotal > 200 ? 'Free' : '$5.99' }</span>
                </div>
                <div className={styles.checkoutSummaryItem}>
                    <span>Tax (8%)</span>
                    <span>${basketTotal * 0.08}</span>
                </div>
                <hr />
                <div className={styles.checkoutSummaryTotal}>
                    <span>Total</span>
                    <span>${(basketTotal + (basketTotal > 200 ? 0 : 5.99) + (basketTotal * 0.08)).toFixed(2)}</span>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}