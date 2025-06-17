'use client'

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import productsData from '@/app/data/shoes.json'; // adjust path if needed
import Link from 'next/link';
import Image from 'next/image';
import '@/app/styles/ProductDetails.css'
import CheckoutHeader from '@/app/components/CheckoutHeader';
import { useBasket, useProducts } from '@/app/context/StateProvider';
import type { Product, BasketItem } from '@/app/types/index';
import Carousels from '@/app/components/Carousels';
import { Button } from '@mui/material';

interface ProductDetail {
  id: string;
  name: string;
  price: {
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
  };
  description?: string;
  imageUrl: string;
  additionalImageUrls: string[];
  colour: string;
  brandName: string;
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { basket, addToBasket, removeFromBasket, basketTotal } = useBasket();
    const { 
      products, 
      loading, 
      getProductById, 
      searchProducts, 
      getProductsByBrand,
      productToBasketItem 
    } = useProducts();

    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    
    const [isAdded, setIsAdded] = useState(false);
    const isInBasket = basket.some(item => String(item.id) === id);
  
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


  const product = productsData.products.find((p) => String(p.id) === id) as ProductDetail | undefined;
  
  const [centerImageSrc, setCenterImageSrc] = useState('');
  const firstImageRef = useRef<HTMLImageElement>(null);

  const changeCenterImage = useCallback((index: number) => {
    if (product && product.additionalImageUrls[index]) {
      setCenterImageSrc(`https://${product.additionalImageUrls[index]}`);
    }
  }, [product]);

  // Product not found - single check
  if (!product) {
    return (
      <div className='notFound'>
        <h2>Product not found</h2>
        <p>The product could not be found.</p>
        <Link href="/shop" className='backLink'>
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <main className='productDetails'>
      <CheckoutHeader title='product' link='/' linkTitle='product details' />
      <section className="productDetails--container">
        <div className="productDetails--imagesContainer">
          {/* Main image display */}
          <div className='mainImageContainer'>
            <Image
              height={400}
              width={313}
              src={centerImageSrc || `https://${product.imageUrl}`}
              className='mainImage'
              alt={`${product.name} - Main Image`}
              priority
            />
          </div>
          
          {/* Thumbnail images */}
          <div className='thumbnailContainer'>
            {/* Main product image as first thumbnail */}
            <Image
              height={100}
              width={78}
              src={`https://${product.imageUrl}`}
              className='thumbnail'
              alt={`${product.name} - Main`}
              onClick={() => setCenterImageSrc('')} // Reset to main image
            />
            
            {/* Additional images as thumbnails */}
            {product.additionalImageUrls?.map((image, index) => (
              <Image
                height={100}
                width={78}
                key={index}
                src={`https://${image}`}
                className='thumbnail'
                alt={`${product.name} - Image ${index + 1}`}
                onClick={() => changeCenterImage(index)}
                ref={index === 0 ? firstImageRef : null}
              />
            ))}
          </div>
        </div>
        
        {/* Product details section */}
        <div className="productDetails--details">
          <h1 className='productDetils--title'>{product.name}</h1>
          <div className="priceSection">
            <p className="productDetils--currentPrice">
              {product.price.current.text}
            </p>
            {product.price.previous.value && product.price.isMarkedDown && (
              <p className="previousPrice">
                <span className="strikethrough">
                  {product.price.previous.text}
                </span>
              </p>
            )}
          </div>
          <p className="productDetials--brandName">Brand:<span className="productDetials--brandNameSpan">{product.brandName}</span></p>
          <p className="productDetials--color">Color: <span className="productDetials--colorSpan">{product.colour}</span></p>
          <p className='productDetials--text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere fugiat repellendus beatae aut quisquam, odio tenetur voluptatum ullam mollitia, accusamus, optio doloremque reiciendis similique rem. Exercitationem dolor aut illo veniam!</p>
          
          {/* Add to cart button or other actions */}
          <div className="productActions">
            <Button className="addToCartBtn" onClick={() => handleAddToBasket(product as unknown as Product)}>
              {isAdded ? 'Added' : 'Add to Cart'}
            </Button>
            
            <Link href="/" className="backToShopLink">
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
      <section className='productDetail--simlarProducts'>
        <Carousels catalogue={products} title='You might also like:'  />
      </section>
    </main>
  );
}