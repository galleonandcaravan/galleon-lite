import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Header from '../Header';
import Footer from '../Footer';
import GCLine from '../GCLine';
import Dots from '../Dots';
import { isMobile } from '../../utils/media';
import './styles.css';

class Layout extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    activePage: PropTypes.string,
    popupVisibleBlock: PropTypes.string,
    togglePopup: PropTypes.func.isRequired,
    gcLineHidden: PropTypes.bool,
    dotsHidden: PropTypes.bool
  };

  static defaultProps = {
    gcLineHidden: false,
    dotsHidden: false,
    popupVisibleBlock: '',
    className: '',
    activePage: '',
    children: null
  };

  state = {
    pageMounted: false,
    headerAnimateStarted: false,
    footerAnimateStarted: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        pageMounted: true
      });

      setTimeout(() => {
        this.setState({ headerAnimateStarted: true });

        setTimeout(() => {
          this.setState({ footerAnimateStarted: true });
        }, 500);
      }, 500)

    }, !isMobile() ? 2050 : 0);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.forceUpdate();
  };

  render() {
    const {
      children,
      activePage,
      className,
      popupVisibleBlock,
      togglePopup,
      gcLineHidden,
      dotsHidden
    } = this.props;
    const { pageMounted, headerAnimateStarted, footerAnimateStarted } = this.state;

    return (
      <div className={cn('layout', className)}>
        <div className="layout__container">
          <CSSTransition
            in={headerAnimateStarted}
            timeout={350}
            classNames="header"
            unmountOnExit
          >
            <Header
              activePage={activePage}
              popupVisibleBlock={popupVisibleBlock}
              togglePopup={togglePopup}
            />
          </CSSTransition>

          <GCLine activePage={activePage} isHidden={gcLineHidden} />

          <div
            className={cn('layout-page', {
              'layout-page_mounted': pageMounted
            })}
          >
            {children}
          </div>
          <CSSTransition
            in={footerAnimateStarted}
            timeout={350}
            classNames="footer"
            unmountOnExit
          >
            <div>
              <Dots activePage={activePage} isHidden={dotsHidden} />

              <Footer
                popupVisibleBlock={popupVisibleBlock}
                togglePopup={togglePopup}
              />
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default Layout;
