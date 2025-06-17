import React, { useState, useEffect } from 'react';
import './Product.css';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useBasket, useProducts } from '../context/StateProvider';
import type { Product, BasketItem } from '../types/index';

type ProductProps = {
  id: number;
  title: string;
  image: string;
  image2: string;
  price: number;
  rating: number;
  extraImages: string[];
  brand: string;
  color: string;
  product: Product;
};

function Product({ 
  id, 
  title, 
  image, 
  image2, 
  price, 
  rating, 
  extraImages, 
  brand, 
  color, 
  product 
}: ProductProps) {
  // Move all hook calls to the top level
  const { basket, addToBasket } = useBasket();
  const { productToBasketItem } = useProducts();
  
  const [isAdded, setIsAdded] = useState(false);
  const isInBasket = basket.some(item => item.id === id);

  const handleAddToBasket = (product: Product): void => {
    try {
      // Convert product to basket item format and add to basket
      const basketItem: BasketItem = productToBasketItem(product);
      addToBasket(basketItem);
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  useEffect(() => {
    setIsAdded(isInBasket);
  }, [isInBasket]);

  return (
    <div className='product'>
      <Link 
        href={`/product/${product.id}`}
        className='product__imgDivLink'
      >
        <div className='product__imgDiv'>
          <img src={image} className='product__img1' alt={title} />
          <img src={image2} className='product__img2' alt={title} />
        </div>
      </Link>
      
      <div className='product__text'>
        <div className='product__text1'>
          <Link
            className='h4__cont'
            href={{
              pathname: '../product',
              query: {
                id,
                title,
                image,
                image2,
                price,
                rating,
                brand,
                color,
                extraImages: JSON.stringify(extraImages)
              }
            }}
          >
            <h4>{title}</h4>
          </Link>
          <span className='product__price'>${price}</span>
        </div>
        <Button 
          className='product__addButton' 
          onClick={() => handleAddToBasket(product)}
        >
          {isAdded ? 'Added' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}

export default Product;