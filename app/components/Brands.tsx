'use client'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from '../../public/images/brand-1_170X128@2x.png'
import img2 from '../../public/images/brand-2_170X128@2x.png'
import img3 from '../../public/images/brand-3_170X128@2x.png'
import img4 from '../../public/images/brand-4_170X128@2x.png'
import img5 from '../../public/images/brand-6_170X128@2x.png'
import img6 from '../../public/images/brand-7_170X128@2x.png'
import React from 'react';
import Image from 'next/image';
import './Brands.css'

export default function Brands(props: { deviceType: string }) {
    const imgArray = [img1, img2, img3, img4, img5, img6];
    const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
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


  return (
    <section className="brands">
      <div className="brands__container">
        <span className='brands__title'>Get shoes from your favorite brands:</span>
        <Carousel
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
      // means to render carousel on server-side.
          infinite={true}
          autoPlay={props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={false}
          className="brand__carousel"
          >
          {imgArray.map((image, index) => (
              <div key={index} className="brand__img">
                  <Image src={image} alt={`Brand ${index + 1}`} width={190} height={67} />
              </div>
          ))}
      </Carousel>
      </div>
    </section>
  );
}

