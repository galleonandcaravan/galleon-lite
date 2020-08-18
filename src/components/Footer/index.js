import React, { Component } from 'react';
import PropTypes from 'prop-types';
import footerIcon from './images/icon.svg';
import './styles.css';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  static propTypes = {
    togglePopup: PropTypes.func.isRequired
  };

  render() {
    const { togglePopup } = this.props;

    return (
      <div className="footer">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={footerIcon}
          className="footer-logo"
          alt=""
          onClick={() => {
            window.location.hash = '';
          }}
        />

        <ul className="footer-menu">
          <li className="footer-menu__item">
            <span onClick={() => togglePopup('security')}>Security</span>
          </li>
        </ul>

        <div className="footer-copyright">
          Galleon & Caravan, GC Lite & GC Pro are trading names of
          Galcar Limited, a company registered in England & Wales
          (no. 11656491) and whose registered office is at Unit 15, 1
          Bramshaw Road, London, E9 5BF.
        </div>
      </div>
    );
  }
}

export default Footer;
