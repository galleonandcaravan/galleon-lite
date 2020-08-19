import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import styles from './ModalPrivacy.module.scss';

class ModalPrivacy extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    activeBlock: PropTypes.string,
    togglePopup: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
    activeBlock: ''
  };

  state = {
    activeBlock: ''
  };

  constructor(props) {
    super(props);

    this.modal = React.createRef();
    this.privacy = React.createRef();
    this.security = React.createRef();
    this.terms = React.createRef();
  }

  componentDidMount() {
    const { state, props } = this;
    if (props.isOpen && props.activeBlock !== state.activeBlock) {
      this.scrollToActiveBlock();
    }
  }

  componentDidUpdate() {
    const { state, props } = this;
    if (props.isOpen && props.activeBlock !== state.activeBlock) {
      this.scrollToActiveBlock();
    }
  }

  scrollToActiveBlock = () => {
    const { activeBlock } = this.props;
    this.setState({ activeBlock });
    this.modal.current.scrollTop = this[activeBlock].current.offsetTop - 60;
  };

  render() {
    const { togglePopup, isOpen } = this.props;

    return (
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames='modal-privacy'
        unmountOnExit
      >
        <Portal>
          <div className={styles.modal} ref={this.modal}>
            <div className={styles.container}>
              <div
                className={styles.close}
                onClick={() => togglePopup('')}
              />

              <div className={styles.paragraph} ref={this.security}>
                <span className={styles.title}>Security</span>

                <span className={styles.text}>
                  Galcar Limited (t/a GC Lite) is a company registered in England and Wales (registered no. 11656491).
                  <br /><br /><br />

                  GC Lite’s Payment and Foreign Currency Exchange Services are provided by Currency Cloud Limited (registered no. 06323311) and whose office is at Stewardship Building, 1st Floor, 12 Steward Street, London, E1 6FQ.
                  <br /><br /><br />

                  The Currency Cloud Limited is Authorised and Regulated by the Financial Conduct Authority under the Electronic Money Regulations 2011 for the issuing of electronic money. FCA registration no. 900100.
                </span>
              </div>
            </div>
          </div>
        </Portal>
      </CSSTransition>
    );
  }
}

export default ModalPrivacy;
