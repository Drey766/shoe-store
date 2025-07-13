'use client'

import { useBasket, useUser, useProducts } from '../context/StateProvider';
import type { Product as ProductType, BasketItem } from '../types/index';
import Banner2 from './Banner2';
import Carousels from './Carousels';
import './Products.css'
import "react-multi-carousel/lib/styles.css";

export default function Products() {
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

  const handleAddToBasket = (product: ProductType): void => {
    // Convert product to basket item format
    const basketItem: BasketItem = productToBasketItem(product);
    addToBasket(basketItem);
  };

  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
  
  if (loading) {
    return <div>Loading shoes...</div>;
  }
  
  return (
    <>
      <section className="products">
          <div className='products__container'>
            
            <Carousels catalogue={products} title={'Latest Products'} />
            <Carousels catalogue={products} title={'Popular producst'} />
            <Banner2 />
            <Carousels catalogue={products} title={'2025 Collection'} />
          </div>
      </section>
    </>
  );
}

