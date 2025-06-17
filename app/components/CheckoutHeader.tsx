'use client'

import React from 'react'
import Link from 'next/link'
import { KeyboardArrowRight } from '@mui/icons-material'
import './CheckoutHeader.css'

interface CheckoutHeaderProps {
    title: string;
    link: string;
    linkTitle: string;
}

function CheckoutHeader({title, link, linkTitle}: CheckoutHeaderProps) {
    const linker = `${link}`
  return (
    <div className='checkoutHeader'>
        <div className='checkoutHeader__cont'>
            <span className='checkoutHeader__title'>{title}</span>
            <div className='checkoutHeader__links'>
                <Link href='/' className='checkoutHeader__link'>Home</Link>  <KeyboardArrowRight />  <Link  href={`..${linker}`} className='checkoutHeader__link'>{linkTitle}</Link>
            </div>
        </div>
        
    </div>
  )
}

export default CheckoutHeader