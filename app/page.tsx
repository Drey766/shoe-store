
'use client'; // <- Add this at the top!

import Blog from './components/Blogs';
import Brands from './components/Brands';
import FirstDiv from './components/FirstDiv';
import Highlights from './components/Highlights';
import Newsletter from './components/Newsletter';
import Products from './components/Products';
import Services from './components/Services';
import { useBasket, useUser, useProducts } from './context/StateProvider';
import type { Product, BasketItem } from './types/index';

export default function Home() {
  const { basket, addToBasket, removeFromBasket, basketTotal } = useBasket();
  const { user, setUser } = useUser();
  const { 
    products, 
    loading, 
    getProductById, 
    searchProducts, 
    getProductsByBrand,
    productToBasketItem 
  } = useProducts();
  
  // Use the shared Product type from your types folder

  // Use the shared BasketItem type from your types folder

  const handleAddToBasket = (product: Product): void => {
    // Convert product to basket item format
    const basketItem: BasketItem = productToBasketItem(product);
    addToBasket(basketItem);
  };
  
  if (loading) {
    return <div>Loading shoes...</div>;
  }
  
  return (
    <div>
      <FirstDiv />
      <Brands deviceType="desktop" />
      <Highlights />
      <Products />
      <Services />
      <Blog />
      <Newsletter />
    </div>
  );
}