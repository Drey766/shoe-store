import '@/app/styles/Services.css';
import Service from './Service';
import shippingImage from '@/public/images/freeshipping.png'
import paymentImage from '@/public/images/safe-payment.png'
import loyaltyImage from '@/public/images/loyalty-customer.png'
import moneyBackImage from '@/public/images/money-back.png'
import '@/app/styles/Services.css';

export default function Services() {
  return (
    <div className="services">
      <ul className="services__list">
        <li className='services__li' ><Service image={shippingImage} title='Worldwide Shipping' description='Free Shipping to Make Your Shopping Experience Seamless.' /> </li>
        <li className='services__li'><Service image={paymentImage} title='safe and secure payment' description='Free Shipping to Make Your Shopping Experience Seamless.' /></li>
        <li className='services__li'><Service image={loyaltyImage} title='Loyalty bonuses' description='Free Shipping to Make Your Shopping Experience Seamless.' /></li>
        <li className='services__li'><Service image={moneyBackImage} title='money back guarantee' description='Free Shipping to Make Your Shopping Experience Seamless.' /></li>
      </ul>
    </div>
  );
}