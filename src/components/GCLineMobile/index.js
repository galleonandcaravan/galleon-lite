import React, { Component } from 'react';
import './styles.css';

class GCLineMobile extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    this.checkTouchPositionInterval = setInterval(this.checkTouchPosition, 10);
    this.getDOMNodes();
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    clearInterval(this.checkTouchPositionInterval);
  }

  getDOMNodes = () => {
    this.imagesTopDOM = [
      ...document.querySelectorAll('.js-image-switcher-top')
    ];
    this.imagesBottomDOM = [
      ...document.querySelectorAll('.js-image-switcher-bottom')
    ];
    this.gcLinesDOM = [...document.querySelectorAll('.js-gc-line')];
  };

  handleResize = () => {
    if (this.prevWindowWidth !== window.innerWidth) {
      this.clientWidth = document.body.clientWidth;
      this.getDOMNodes();
      this.gcLineTop = this.gcLinesDOM[0].getBoundingClientRect().top + window.pageYOffset;
    }
    this.prevWindowWidth = window.innerWidth;
    this.handleTouchEnd();
  };

  checkTouchPosition = () => {
    if (
      this.touchStarted &&
      this.touchPositionY + window.pageYOffset > this.gcLineTop - 50 &&
      this.touchPositionX &&
      this.touchPositionX > 0 &&
      this.touchPositionX < this.clientWidth - 50
    ) {
      const imageTopWidth = this.touchPositionX;
      const imageBottomWidth = this.clientWidth - imageTopWidth - (this.clientWidth / 100 * 7) - 30;

      this.gcLinesDOM.forEach(gcLineDOM => {
        gcLineDOM.style.left = `${this.touchPositionX}px`;
      });
      this.imagesTopDOM.forEach((imageTopDOM) => {
        imageTopDOM.style.width = `${imageTopWidth}px`;
      })
      this.imagesBottomDOM.forEach((imageBottomDOM) => {
        imageBottomDOM.style.width = `${imageBottomWidth}px`;
      })
    }
  };

  handleTouchStart = () => {
    this.touchStarted = true;
    this.touchPositionX = 0;
    this.touchPositionY = 0;
  };

  handleTouchEnd = () => {
    this.touchStarted = false;
  };

  handleTouchMove = event => {
    this.touchPositionY = event.touches[0].clientY;
    this.touchPositionX = event.touches[0].clientX;
  };

  render() {
    return (
      <div className="gc-line-mobile">
        <div className="gc-line-mobile__g" />
        <div className="gc-line-mobile__line js-gc-line" />
        <div className="gc-line-mobile__c" />
      </div>
    );
  }
}

export default GCLineMobile;
