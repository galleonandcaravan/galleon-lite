import React from 'react';
import PropTypes from 'prop-types';

import MainContent from '../../components/MainContent';
import ImagesSwitcher from '../../components/ImagesSwitcher';

import './styles.scss';

const Contact = ({ switcherImagesVisible }) => (
  <div className="contact" id="page-contact">
    <MainContent
      title="Contact us"
      text="<a href='tel:+44 020 8075 5665' class='main-content__tel'>+44 020 8075 5665</a><a href='mailto:hello@galleonandcaravan.com' class='main-content__email'>hello@galleonandcaravan.com</a><div class='contacts__text'>We will advise you as to which account is more <br class='desktop' /> appropriate for your requirements</div>"
    />
    <ImagesSwitcher
      imageTopClassName="contact__image-top"
      imageBottomClassName="contact__image-bottom"
      switcherImagesVisible={switcherImagesVisible}
    />
  </div>
);

Contact.propTypes = {
  switcherImagesVisible: PropTypes.bool,
}

Contact.defaultProps = {
  switcherImagesVisible: false,
}

export default Contact;
