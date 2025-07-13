import React from 'react'
import './Highlights.css'
import highImg1 from '../../public/images/img5-5.jpg.webp'
import highImg2 from '../../public/images/blog-1-2.jpg'
import highImg3 from '../../public/images/blog-7.jpg'
import highImg4 from '../../public/images/blog-7-1.jpg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Highlights() {

  return (
    <section className='highlights' >
      <div className='highlights__container'>
        <div className='highlights__conts'>
          <div className='highlight__divs1' id='highlights__divs1'>
            <Image className='highlights__img' width={700} height={521} src={highImg1} alt='Img1' />
            <div className='highlights__text' id='highlights__text'>
              <h3 className='h3'>Men's shoes<br /> classics</h3>
              <span className='highlights__span'><Link href='/shop' className='highlights__spanLink' id='highlights__spanLink1' >Shop now</Link></span>
            </div>
          </div>
          <div className='highlight__divs2'>
            <Image className='highlights__img' src={highImg3} width={1400} height={952} alt='Img2' />
            <div className='highlights__text'>
              <h3 className='h3'>Campus <br /> Style</h3>
              <span className='highlights__span'><Link href='/shop' className='highlights__spanLink'>Shop now</Link></span>
            </div>
          </div>
        </div>

        <div className='highlights__conts'>
          <div className='highlight__divs2'>
            <Image className='highlights__img' src={highImg4} width={500} height={446} alt='Img3' />
            <div className='highlights__text'>
              <h3 className='h3'>Spring <br />collection</h3>
              <span className='highlights__span'><Link href='/shop' className='highlights__spanLink'>Shop now</Link></span>
            </div>
          </div>
          <div className='highlight__divs1'>
            <Image className='highlights__img' src={highImg2} width={1000} height={760} alt='Img4' />
            <div className='highlights__text'>
              <h3 className='h3'>Fashion <br /> Discovery</h3>
              <span className='highlights__span'><Link href='/shop' className='highlights__spanLink'>Shop now</Link></span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights