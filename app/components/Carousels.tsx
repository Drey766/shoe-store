import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from './Product';
import './Carousels.css';

interface CarouselsProps {
  catalogue: any[];
  title?: string;
}

function Carousels({ catalogue, title }: CarouselsProps) {
    const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

    console.log(catalogue);

  return (
    <>
      {(!catalogue || catalogue.length === 0) ? (
        <span>Loading...</span>
      ) : (
        <div className='carousels'>
          <div className="carousels-carouselCont">
            <span className='carousels-title'>{title}</span>
            <Carousel
              swipeable={false}
              draggable={true}
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={1000}
              containerClass="products-carousel"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType="desktop"
              dotListClass="custom-dot-list-style"
              itemClass="carousels__carouselItem"
              arrows={true}
              className="product__carousel">
              {catalogue.map(product => (
                <Product
                  id={product.id}
                  title={product.name}
                  image={`https://${product.imageUrl}.jpg`}
                  rating={product.id || 0}
                  image2={`https://${product.additionalImageUrls[0]}.jpg`}
                  price={product.price.current.value}
                  extraImages={product.additionalImageUrls}
                  brand={product.brandName}
                  color={product.color}
                  key={product.id}
                  product={product}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  )
}

export default Carousels