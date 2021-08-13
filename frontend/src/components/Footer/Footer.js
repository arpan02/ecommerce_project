import React from 'react';
import './Footer.scss';
// import { Link } from 'react-router-dom';
// import { ReactComponent as ForwardArrow } from '../../assets/icons/SVG/arrow_forward.svg';

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="footer__container">
        <div className="footer__item">
          <h3 className="footer__item__heading">contact us</h3>
          <Link to="#">example123@company.com</Link>
          <Link to="#">4-5 road near xyz shop , street</Link>
          <Link to="#">0000-0000-0000-0000</Link>
        </div>
        <div className="footer__item">
          <h3 className="footer__item__heading">information</h3>
          <Link to="#">About us</Link>
          <Link to="#">delivery information</Link>
          <Link to="#">privacy policy</Link>
          <Link to="#">contact us</Link>
        </div>
        <div className="footer__item">
          <h3 className="footer__item__heading">category</h3>
          <Link to="#">Men and Women wear</Link>
          <Link to="#">Mobile and Computers</Link>
          <Link to="#">Books</Link>
          <Link to="#">Electronics</Link>
          <Link to="#">Movies and games</Link>
        </div>
        <div className="footer__item">
          <h3 className="footer__item__heading">NewsLetter</h3>
          <div className="footer__item__input">
            <input type="text" placeholder="Enter your email" />
            <button type="button">
              <ForwardArrow className="footer__item__input__icon" />
            </button>
          </div>
          <div className="footer__item__description">
            Register to get update
          </div>
        </div>
      </div> */}
      <div className="footer__rights">
        © {new Date().getFullYear()} by arpan pathak
      </div>
    </footer>
  );
};

export default Footer;
