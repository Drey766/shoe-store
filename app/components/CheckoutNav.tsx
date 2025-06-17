import React from 'react'
import Billing from './Billing'
import Order from './Order'
import './CheckoutNav.css'

function CheckoutNav() {
  return (
    <div className='checkoutNav'>
      <div className='checkoutNav__cont'>
        <Billing />
        <Order />
      </div>
    </div>
  )
}

export default CheckoutNav