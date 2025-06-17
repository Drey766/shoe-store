// types/index.ts
export interface Price {
  current: {
    value: number;
    text: string;
  };
  previous: {
    value: number | null;
    text: string;
  };
  rrp: {
    value: number | null;
    text: string;
  };
  lowestPriceInLast30Days: {
    value: number | null;
    text: string;
  };
  isMarkedDown: boolean;
  isOutletPrice: boolean;
  currency: string;
}

export interface Product {
  id: number;
  name: string;
  price: number; // Use the Price interface for price details
  color: string;
  colourWayId: number;
  brandName: string;
  hasVariantColours: boolean;
  hasMultiplePrices: boolean;
  groupId: number | null;
  productCode: number;
  productType: string;
  url: string;
  imageUrl: any;
  additionalImageUrls: string[];
  videoUrl: string | null;
  showVideo: boolean;
  isSellingFast: boolean;
  isRestockingSoon: boolean;
  isPromotion: boolean;
  sponsoredCampaignId: string | null;
  facetGroupings: any[];
  advertisement: any;
  earlyAccess: any;
}

export interface BasketItem {
  id: number;
  name: string;
  price: number; // We'll use the current price value
  imageUrl: string;
  colour: string;
  brandName: string;
  quantity?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface ShoesData {
  products: Product[];
}

export interface State {
  basket: BasketItem[];
  user: User | null;
  products: Product[];
  loading: boolean;
}

export type ActionType = 
  | { type: 'ADD_TO_BASKET'; item: BasketItem }
  | { type: 'REMOVE_FROM_BASKET'; id: number }
  | { type: 'SET_USER'; user: User | null }
  | { type: 'SET_PRODUCTS'; products: Product[] }
  | { type: 'SET_LOADING'; loading: boolean };

// context/StateProvider.tsx

// app/layout.tsx (or pages/_app.tsx for Pages Router)
// Wrap your app with the StateProvider
/*
import { StateProvider } from '../context/StateProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
*/

// Example usage in a component:
/*
'use client'; // <- This is REQUIRED for any component using hooks!

import { useBasket, useUser } from '../context/StateProvider';

export default function ExampleComponent() {
  const { basket, addToBasket, removeFromBasket, basketTotal } = useBasket();
  const { user, setUser } = useUser();
  
  const handleAddToBasket = () => {
    addToBasket({
      id: '1',
      title: 'Example Product',
      image: '/example.jpg',
      price: 29.99,
      rating: 5
    });
  };
  
  return (
    <div>
      <h1>Basket Total: ${basketTotal}</h1>
      <p>Items in basket: {basket.length}</p>
      <button onClick={handleAddToBasket}>Add to Basket</button>
    </div>
  );
}
*/

// For your app/page.tsx, it should look like this:
/*
*/

// Alternative: Load products from public folder
/*
// In StateProvider.tsx, replace the useEffect with:
useEffect(() => {
  const loadProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      // Fetch from public folder
      const response = await fetch('/data/products.json');
      const products = await response.json();
      
      dispatch({ type: 'SET_PRODUCTS', products });
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  loadProducts();
}, []);
*/