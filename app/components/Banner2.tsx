import React from 'react'
import './Banner2.css'
import Image from 'next/image'
import bannerImage from '../../public/images/img-middle-sneaker3_2.jpg'

function Banner2() {
  return (
    <div className='banner2'>
        <div className="banner-container">
            <div className="banner-text">
                <h2 className='banner-heading'>Discover the Latest Trends</h2>
                <p className='banner-p'>Shop our new collection and elevate your style.</p>
                <button className="banner-button">Shop Now</button>
            </div>
            <div className="banner-imageContainer">
                <Image height={600} width={1740} src={bannerImage} alt="Banner Image" className='bannerImage' />
            </div>
        </div>
    </div>
  )
}

export default Banner2