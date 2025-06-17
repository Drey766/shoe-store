'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { State, ActionType, BasketItem, Product, ShoesData, User } from '../types';

// Initial state
export const initialState: State = {
  basket: [],
  user: null,
  products: [],
  loading: false
};

// Utility function to calculate basket total
export const getBasketTotal = (basket: BasketItem[]): number => {
  const total = basket?.reduce((amount, item) => item.price + amount, 0) || 0;
  return parseFloat(total.toFixed(2));
};

// Reducer function
function reducer(state: State, action: ActionType): State {
  console.log(action);
  
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      };
      
    case 'REMOVE_FROM_BASKET':
      const newBasket = [...state.basket];
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
      
      if (index >= 0) {
        // Item in basket, remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as it is not in basket`);
      }
      
      return { ...state, basket: newBasket };
      
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };
      
    default:
      return state;
  }
}

// Context type
type StateContextType = {
  state: State;
  dispatch: React.Dispatch<ActionType>;
} | null;

// Create context with null as default
export const StateContext = createContext<StateContextType>(null);

// Provider props interface
interface StateProviderProps {
  children: ReactNode;
}

// State provider component
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Load products from JSON file on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        
        // Option 1: If your JSON is in the public folder
        // const response = await fetch('/shoes.json');
        // const shoesData: ShoesData = await response.json();
        
        // Option 2: If you're importing the JSON directly
        const shoesJson = await import('../data/shoes.json');
        // Add 'color' property to each product if missing
        const rawShoesData = shoesJson.default;
        const products = (rawShoesData.products || []).map((product: any) => ({
          ...product,
          color: product.color ?? ''
        }));
        // Now cast to ShoesData after ensuring 'color' exists
        const shoesData: ShoesData = { ...rawShoesData, products };

        dispatch({ type: 'SET_PRODUCTS', products });
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', loading: false });
      }
    };

    loadProducts();
  }, []);
  
  const contextValue = {
    state,
    dispatch
  };
  
  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use state
export const useStateValue = (): { state: State; dispatch: React.Dispatch<ActionType> } => {
  const context = useContext(StateContext);
  
  if (!context) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  
  return context;
};

// Custom hooks for specific actions
export const useBasket = () => {
  const { state: { basket }, dispatch } = useStateValue();
  
  const addToBasket = (item: BasketItem) => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item
    });
  };
  
  const removeFromBasket = (id: number) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id
    });
  };
  
  const basketTotal = getBasketTotal(basket);
  
  return {
    basket,
    addToBasket,
    removeFromBasket,
    basketTotal
  };
};

export const useUser = () => {
  const { state: { user }, dispatch } = useStateValue();
  
  const setUser = (user: User | null) => {
    dispatch({
      type: 'SET_USER',
      user
    });
  };
  
  return {
    user,
    setUser
  };
};

export const useProducts = () => {
  const { state: { products, loading }, dispatch } = useStateValue();
  
  const setProducts = (products: Product[]) => {
    dispatch({
      type: 'SET_PRODUCTS',
      products
    });
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByBrand = (brandName: string): Product[] => {
    return products.filter(product => 
      product.brandName.toLowerCase().includes(brandName.toLowerCase())
    );
  };

  const getProductsByColour = (colour: string): Product[] => {
    return products.filter(product => 
      product.color.toLowerCase().includes(colour.toLowerCase())
    );
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brandName.toLowerCase().includes(lowercaseQuery) ||
      product.color.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getDiscountedProducts = (): Product[] => {
    return products.filter(product => {
      if (typeof product.price === 'object' && product.price !== null && 'isMarkedDown' in product.price) {
        return (product.price as { isMarkedDown?: boolean }).isMarkedDown;
      }
      return false;
    });
  };

  const getProductsOnSale = (): Product[] => {
    return products.filter(product => product.isPromotion);
  };

  // Helper function to convert Product to BasketItem
  const productToBasketItem = (product: Product): BasketItem => {
    return {
      id: product.id,
      name: product.name,
      price: product.price.current.value,
      imageUrl: product.imageUrl,
      colour: product.color,
      brandName: product.brandName,
      quantity: 1
    };
  };
  
  return {
    products,
    loading,
    setProducts,
    getProductById,
    getProductsByBrand,
    getProductsByColour,
    searchProducts,
    getDiscountedProducts,
    getProductsOnSale,
    productToBasketItem
  };
};

