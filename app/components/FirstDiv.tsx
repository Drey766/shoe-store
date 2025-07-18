import React, { useState, useRef, useEffect } from 'react'
import img1 from '../../public/images/main-banner-1.jpg'
import img2 from '../../public/images/main-banner-2.jpg'
import img3 from '../../public/images/cms-banner-1.jpg'
import './FirstDiv.css'
import CarouselItem from './CarouselItem'
import { Button } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

function FirstDiv() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonRef = useRef<HTMLSpanElement>(null);
  
 const texts = [
  {id: 'premium-shoes', title: 'Premium Shoes', desc: 'Discover the world in unparalleled comfort and luxury', img: img1.src || img1, position: 'flex-end', color: 'black'},
  {id: 'first-class', title: 'New Modern Collection', desc: 'Creating unforgettable moments and exceeding your every expectation.', img: img2.src || img2, position: 'flex-end', color: 'white'},
  {id: 'safe-drivers', title: '2025 Collections', desc: 'Get the latest shoes from your favorite brands at affordable prices.', img: img3.src || img3, position: 'flex-start', color: 'black'}
  ]

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  interface CarouselText {
    id: string;
    title: string;
    desc: string;
    img: string;
  }

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 16000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const currentItem = texts[currentIndex];

  return (
    <section className='firstDiv'>
      <CarouselItem 
        key={currentItem.id}
        id={currentItem.id}
        image={currentItem.img} 
        title={currentItem.title} 
        desc={currentItem.desc} 
        position={currentItem.position}
        color={currentItem.color}
      />
      <span className='firstDiv__prevButton' onClick={handlePrev}><ArrowBack /></span>
      <span className='firstDiv__nextButton' onClick={handleNext} ref={buttonRef}><ArrowForward /></span>
      <div className="firstDiv__dots">
        {texts.map((_, index) => (
          <span 
            key={index}
            onClick={() => handleDotClick(index)} 
            className={`firstDiv__dot ${currentIndex === index ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </section>
  )
}

export default FirstDiv

