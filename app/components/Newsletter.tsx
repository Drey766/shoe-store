'use client'

import './Newsletter.css';

export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <h6 className="newsletter__title">Join our Newsletter</h6>
        <p className="newsletter__description">Subscribe to our Newsletter to get the latest updates and offers.</p>
        <form className="newsletter__form">
          <input type="email" placeholder="Enter your email" className="newsletter__input" required />
          <button type="submit" className="newsletter__button">Subscribe</button>
        </form>
      </div>
    </section>
  );
}