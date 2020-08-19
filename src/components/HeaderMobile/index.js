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
                    <span>
                      Register
                    </span>
                  </li>
                  <li className={cn(styles.auth__item, styles.inner)}>
                    <a
                      href={HEADER_AUTH_LINKS.REGISTER_BUSINESS}
                      onClick={this.toggleMenuVisible}
                    >
                      Business
                    </a>
                  </li>
                  <li className={cn(styles.auth__item, styles.inner)}>
                    <a
                      href={HEADER_AUTH_LINKS.REGISTER_PERSONAL}
                      onClick={this.toggleMenuVisible}
                    >
                      Personal
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
                  Galcar Limited (t/a GC Lite) is a company registered in England and
                  Wales (registered no. 11656491). GC Lite’s Payment and Foreign
                  Currency Exchange Services are provided by Currency Cloud Limited
                  (registered no. 06323311) and whose office is at Stewardship
                  Building, 1st Floor, 12 Steward Street, London, E1 6FQ.
                  The Currency Cloud Limited is Authorised and Regulated by the
                  Financial Conduct Authority under the Electronic Money Regulations
                  2011 for the issuing of electronic money. FCA registration no. 900100.
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
