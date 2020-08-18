import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';

class ImagesSwitcher extends Component {
  static propTypes = {
    imageTop: PropTypes.string,
    imageBottom: PropTypes.string,
    imageTopClassName: PropTypes.string,
    imageBottomClassName: PropTypes.string,
    switcherImagesVisible: PropTypes.bool,
  };

  static defaultProps = {
    imageTop: null,
    imageBottom: null,
    imageTopClassName: null,
    imageBottomClassName: null,
    switcherImagesVisible: false,
  };

  state = {
    imageTopHeight: 0,
    imageBottomHeight: 0,
    bgImagesVisible: window.defaultBgImagesVisible
  };

  constructor(props) {
    super(props);
    this.imageTop = React.createRef();
    this.imageBottom = React.createRef();
  }

  componentDidMount() {
    this.resizeImages();
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      this.setState({
        bgImagesVisible: true
      });
      window.defaultBgImagesVisible = true;
    }, 1000);

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.resizeImages();
  };

  handleScroll = () => {
    this.resizeImages();
  };

  resizeImages = () => {
    const imagesSwitcherHeight = document.querySelector('.section_active .js-images-switcher')
      .offsetHeight;

    this.setState({
      imageTopHeight: imagesSwitcherHeight,
      imageBottomHeight: imagesSwitcherHeight
    });
  };

  render() {
    const {
      imageTop,
      imageBottom,
      imageTopClassName,
      imageBottomClassName,
      switcherImagesVisible
    } = this.props;
    const { imageTopHeight, imageBottomHeight, bgImagesVisible } = this.state;

    return (
      <div className="images-switcher-container">
        <div
          className={cn('js-images-switcher', 'images-switcher', {
            'images-switcher__visible': bgImagesVisible
          })}
        >
          <div className="images-switcher__image-top js-image-switcher-top">
            <div
              className={cn('images-switcher__image', imageTopClassName)}
              style={{
                backgroundImage: switcherImagesVisible
                  ? `url(${imageTop})`
                  : null,
                height: `${imageTopHeight}px`
              }}
              ref={this.imageTop}
            />
          </div>

          <div className="images-switcher__image-bottom js-image-switcher-bottom">
            <div
              className={cn('images-switcher__image', imageBottomClassName)}
              style={{
                backgroundImage: switcherImagesVisible
                  ? `url(${imageBottom})`
                  : null,
                height: `${imageBottomHeight}px`
              }}
              ref={this.imageTop}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImagesSwitcher;
