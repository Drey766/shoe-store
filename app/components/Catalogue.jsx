import React, { useState, useEffect, useCallback } from 'react';
import './Catalogue.css';
import jsonData from '../response3.json';
import jsonData2 from '../response4.json';
import jsonData3 from '../response5.json';
import Product from '../Product';

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [json, setJson] = useState(jsonData);
  const [activespan, setActivespan] = useState('category1');
  const jsons = {
    'firstJson' : jsonData,
    'secondJson' : jsonData2,
    'thirdJson' : jsonData3
  }

  const renderJson = (jsonId, spanId) => {
    setJson(jsonId)
    setActivespan(spanId)
    console.log(jsonId)
  };

  useEffect(() => {
    setProducts(json.products);
  }, [json]);

  const preloadImages = useCallback(() => {
    products.forEach((product) => {
      const img = new Image();
      img.src = `https://${product.imageUrl}`;
      img.src = `https://${product.additionalImageUrls[0]}`;
    });
  }, [products]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return (
    <section className='catalogue'>
      <div className='catalogue__title'>
        <ul className='catalogue__ul'>
          <li onClick={() => {renderJson(jsonData,'category1')}} className={activespan === 'category1' ? 'catalogue__li activeCategory' : 'catalogue__li'}>LATEST PRODUCTS</li>
          <li onClick={() => {renderJson(jsonData2,'category2')}} className={activespan === 'category2' ? 'catalogue__li activeCategory' : 'catalogue__li'}>TOP SELLING</li>
          <li onClick={() => {renderJson(jsonData3,'category3')}} className={activespan === 'category3' ? 'catalogue__li activeCategory' : 'catalogue__li'}>BEST SELLERS</li>
        </ul>
      </div>
      <div className='products__cont'>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.name}
            image={`https://${product.imageUrl}`}
            image2={`https://${product.additionalImageUrls[0]}`}
            price={product.price.current.value}
            rating={product.productCode}
            extraImages={product.additionalImageUrls}
            brand={product.brandName} color={product.colour}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogue;
