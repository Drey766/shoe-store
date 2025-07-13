import React, { useEffect, useState } from 'react';
import './Header.css'
import { Clear, Menu, ShoppingBag } from '@mui/icons-material';
import { useStateValue } from '../context/StateProvider';
import Link  from 'next/link';
import { Controller, Scene } from 'react-scrollmagic';
import logo from '../../public/file.svg'


function NavBar(starter)  {
  const [click, setClick] = useState(false);
  const [trig, setTrig] = useState('#triggerElement');
  

  useEffect(() => {
    setTrig(starter)
  }, [starter])


  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const scrollToAbout = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { state: { basket } } = useStateValue();

  return (
    <Controller>
      <Scene classToggle='sticky' triggerHook={0.1} indicators={false}  >
        <div className='header'>
          <div className={click ? 'main-container' : ''} onClick={Close} />
          <nav className="navbar" onClick={(e) => e.stopPropagation()}>
            <div className="nav-container">
              <div className="nav-icon" onClick={handleClick}>
                {click ? <Clear /> : <Menu />}
              </div>
              <span className="nav-logo">
                <Link href='/'>Shoes</Link>
              </span>
              <div className='navMenu__cont'>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className="nav-item" onClick={scrollToHome}>
                    <Link href='/' className='header__links'><span className="nav-links">Home</span></Link>
                  </li>
                  <li className="nav-item" onClick={scrollToAbout}>
                    <Link href='/shop' className='header__links'><span className="nav-links">Shop</span></Link>
                  </li>
                  <li className="nav-item" onClick={scrollToPortfolio}>
                    <Link href='/blog' className='header__links'><span className="nav-links">Blog</span></Link>
                  </li>
                  <li className="nav-item" onClick={scrollToContact}>
                    <span className="nav-links">Contact Us</span>
                  </li>
                
                </ul>
                <span className='nav__shoppingCart'>
                  <Link href='/cart' className='header__linksBasket'><ShoppingBag onClick={scrollToHome} className='nav__basket' /> <span className='nav__counter'>{basket.length}</span></Link>
                </span>
              </div>
              
            </div>
          </nav>
        </div>
      </Scene>
    </Controller>
  );
};

export default NavBar;
