import React from 'react'
import logo from '../img/logo/premiere-high-resolution-logo-black-transparent.png'
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import './Footer.css'
import paymentImg from '../../public/images/paymet.png.webp'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='footer'>
        <div className="footer__container">
            <div className='footer__conts'>
                <div className='footer__divs'>
                    <span className='footer__logo'>Logo</span>
                    <p className='footer__p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className='footer__info'>
                        <span className='footer__infoSpan'>Add: 2341 Kenyatta Road, Nairobi, Kenya</span>
                        <span className='footer__infoSpan'>Phone: +254719197676</span>
                        <span className='footer__infoSpan'>Email: andrewkimani766@gmail.com</span>
                    </div>
                    <div className='footer__socials'>
                        <Twitter className='misc__icons' />
                        <Instagram className='misc__icons' />
                        <Facebook className='misc__icons' />
                        <LinkedIn className='misc__icons' />
                    </div>
                </div>
                <div className='footer__divs'>
                    <span className='footer__title'>ABOUT US</span>
                    <ul className='footer__ul'>
                        <li className='footer__li'>Career at Premiere</li>
                        <li className='footer__li'>About us</li>
                        <li className='footer__li'>Sustainability</li>
                        <li className='footer__li'>Press</li>
                        <li className='footer__li'>Investor Relations</li>
                        <li className='footer__li'>Corporate Governance</li>
                    </ul>
                </div>
            </div>
            
            <div className='footer__conts'>
                <div className='footer__divs'>
                    <span className='footer__title'>HELP</span>
                    <ul className='footer__ul'>
                        <li className='footer__li'>FAQ</li>
                        <li className='footer__li'>Shipping</li>
                        <li className='footer__li'>Returns</li>
                        <li className='footer__li'>Order Status</li>
                        <li className='footer__li'>Gift Card Balance</li>
                        <li className='footer__li'>Accessibility</li>
                    </ul>
                </div>
                <div className='footer__divs'>
                    <span className='footer__title'>CATEGORIES</span>
                    <ul className='footer__ul'>
                        <li className='footer__li'>Men's shoes</li>
                        <li className='footer__li'>Women's shoes</li>
                        <li className='footer__li'>Kid's shoes</li>
                        <li className='footer__li'>2025 collection</li>
                        <li className='footer__li'>Sports shoes</li>
                        <li className='footer__li'>Casual shoes</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='footer__copyright'>
            <div className='footer__copyrightCont'>
                <span className='footer__copyrightText'>Andrew Kimani @copyright 2025</span>
                <Image height={34} width={339} src={paymentImg} alt='payment' className='footer__payment' />
            </div>
        </div>
    </footer>
  )
}

export default Footer