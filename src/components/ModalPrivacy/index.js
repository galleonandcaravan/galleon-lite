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
                  Galleon and Caravan take security and compliance seriously. Our payment providers have invested heavily into maintaining the strictest levels of security throughout their infrastructure.
                  <br /><br /><br />

                  We chose to partner with Ebury Partners UK Limited because they are one of the best funded FinTech firms in Europe, having received over $83m in investment to accelerate growth and innovation. They offer deep levels of liquidity, seamless operational capabilities and strict security measures, ensuring a safe and reliable service.
                  <br /><br /><br />

                  Ebury Partners UK Ltd is authorised and regulated by the Financial Conduct Authority as an Electronic Money Institution (Ref. Number: 900797, <a target="_blank" rel="noopener noreferrer" href="https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000003pvOlCAAU">click here</a> for further information). As such, client funds are always held in segregated accounts, entirely separate from their own operating accounts. Your funds are completely ring-fenced, secure and can never be claimed by any creditors. This means that, in the unlikely event of Ebury’s insolvency, your funds will be fully protected and an administrator will reimburse you from the safeguarded funds.
                  <br /><br /><br />

                  The FCA requires standards to be met across three areas and Ebury exceeds all three of these standards of capital adequacy, client protection and robust internal risk management. For further information on our security credentials and processes, please don’t hesitate to contact us.
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
