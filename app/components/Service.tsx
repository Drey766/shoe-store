 import React from 'react';
import '@/app/styles/Service.css';
import Image, { StaticImageData } from 'next/image';

type ServiceProps = {
  image: StaticImageData;
  title: string;
  description: string;
};
 
 export default function Service( { image, title, description }: ServiceProps) {
  return (
    <div className="service">
      <div className="service--cont">
        <div className="service-imageCont">
            <Image height={154} width={154} src={image} alt='setcive image' className='service-image'/>
        </div>
        <div className="service-textDiv">
            <span className="service-title">{title}</span>
            <p className="service-text">{description}</p>
        </div>
      </div>
    </div>
  );}