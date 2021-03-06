import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { HEADER_AUTH_LINKS, PAGES } from '../../constants';
import HeaderMobile from '../HeaderMobile';
import logo from './images/logo.svg';

import styles from './Header.module.scss';

class Header extends Component {
  static propTypes = {
    activePage: PropTypes.string,
    popupVisibleBlock: PropTypes.string.isRequired,
    togglePopup: PropTypes.func.isRequired
  };

  static defaultProps = {
    activePage: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownActive: false,
    }
  }

  handleMenuItem = event => {
    event.preventDefault();
    event.stopPropagation();
    const { popupVisibleBlock, togglePopup } = this.props;

    if (!window.disableLinks && !window.disableMouseWheel) {
      const hash = event.target.href.split('#')[1];
      window.location.hash = hash;
      if (popupVisibleBlock) {
        togglePopup();
      }
    }
  };

  toggleDropdown = () => {
    const { dropdownActive } = this.state;

    this.setState({ dropdownActive: !dropdownActive });
  };

  render() {
    const { activePage, popupVisibleBlock, togglePopup } = this.props;
    const { dropdownActive } = this.state;

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            className={styles.logo}
            src={logo}
            alt=""
            onClick={() => {
              window.location.hash = '';
              if (popupVisibleBlock) {
                window.skipAnimation = true;
                togglePopup();
              }
            }}
          />
          <img className={styles.logo_mobile} src={logo} alt="" />

          <ul className={styles.menu}>
            <li
              className={cn(styles.menu__item, {
                [styles.active] :
                  (activePage === PAGES.ABOUT || !activePage) && !popupVisibleBlock
              })}
            >
              <a href={`#${PAGES.ABOUT}`} onClick={this.handleMenuItem}>
                About
              </a>
            </li>

            <li
              className={cn(styles.menu__item, {
                [styles.active] :
                  activePage === PAGES.CONTACT && !popupVisibleBlock
              })}
            >
              <a href={`#${PAGES.CONTACT}`} onClick={this.handleMenuItem}>
                Contact
              </a>
            </li>
          </ul>

          <ul className={styles.auth}>
            <li className={styles.auth__item}>
              <div className={styles.dropdown}>
                <span className={styles.dropdownAction} onClick={this.toggleDropdown}>Register</span>

                {dropdownActive && (
                  <ul>
                    <li>
                      <a href={HEADER_AUTH_LINKS.REGISTER_BUSINESS}>Business</a>
                    </li>
                    <li>
                      <a href={HEADER_AUTH_LINKS.REGISTER_PERSONAL}>Personal</a>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li className={styles.auth__item}>
              <a href={HEADER_AUTH_LINKS.LOGIN}>Log In</a>
            </li>
          </ul>
        </div>

        <HeaderMobile
          activePage={activePage}
          popupVisibleBlock={popupVisibleBlock}
          togglePopup={togglePopup}
        />
      </div>
    );
  }
}

export default Header;
