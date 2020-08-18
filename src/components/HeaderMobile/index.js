import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import { HEADER_AUTH_LINKS, PAGES } from '../../constants';

import styles from './HeaderMobile.module.scss';

class HeaderMobile extends Component {
  static propTypes = {
    activePage: PropTypes.string,
    togglePopup: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activePage: ''
  };

  state = {
    menuVisible: false,
  };

  changePage = (event) => {
    if (!window.disableLinks && !window.disableMouseWheel && event.target.href) {
      const hash = event.target.href.split('#')[1];
      window.location.hash = hash;
    }
    this.toggleMenuVisible();
  };

  toggleMenuVisible = () => {
    const { menuVisible } = this.state;
    const updatedMenuVisible = !menuVisible;
    this.setState({ menuVisible: updatedMenuVisible });

    if (updatedMenuVisible) {
      document.body.style['overflow-y'] = 'hidden';
    } else {
      document.body.style['overflow-y'] = 'auto';
    }
  };

  openModal = (activeBlock)  => {
    const { togglePopup } = this.props;
    togglePopup(activeBlock);
    this.toggleMenuVisible();
  };

  render() {
    const { activePage } = this.props;
    const { menuVisible } = this.state;

    return (
      <div className={styles.header}>
        <CSSTransition
          in={menuVisible}
          timeout={300}
          classNames="header-mobile-menu"
          unmountOnExit
        >
          <Portal>
            <div
              className={styles.layout}
              onClick={this.toggleMenuVisible}
            >
              <div
                className={styles.container}
                onClick={event => event.stopPropagation()}
              >
                <button
                  className={styles.close}
                  onClick={this.toggleMenuVisible}
                  type="button"
                >
                  <span />
                </button>

                <ul className={styles.menu}>
                  <li
                    className={cn(styles.menu__item, {
                      [styles.active]: activePage === PAGES.ABOUT || !activePage
                    })}
                  >
                    <a
                      href={`#${PAGES.ABOUT}`}
                      onClick={this.changePage}
                    >
                      About
                    </a>
                  </li>

                  <li
                    className={cn(styles.menu__item, {
                      [styles.active]: activePage === PAGES.CONTACT
                    })}
                  >
                    <a
                      href={`#${PAGES.CONTACT}`}
                      onClick={this.changePage}
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                <ul className={styles.auth}>
                  <li className={styles.auth__item}>
                    <a
                      href={HEADER_AUTH_LINKS.REGISTER}
                      onClick={this.toggleMenuVisible}
                    >
                      Register
                    </a>
                  </li>
                  <li className={styles.auth__item}>
                    <a
                      href={HEADER_AUTH_LINKS.LOGIN}
                      onClick={this.toggleMenuVisible}
                    >
                      Log In
                    </a>
                  </li>
                </ul>

                <ul className={styles.additional}>
                  <li
                    className={styles.additional__item}
                    onClick={() => this.openModal('security')}
                  >
                    Security
                  </li>
                </ul>

                <div className={styles.copyright}>
                  Galleon & Caravan, GC Lite & GC Pro are trading names of
                  Galcar Limited, a company registered in England & Wales
                  (no. 11656491) and whose registered office is at Unit 15, 1
                  Bramshaw Road, London, E9 5BF.
                </div>
              </div>
            </div>
          </Portal>
        </CSSTransition>

        <button
          className={styles.hamburger}
          onClick={this.toggleMenuVisible}
          type="button"
        >
        </button>

      </div>
    );
  }
}

export default HeaderMobile;
