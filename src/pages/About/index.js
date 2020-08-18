import React from 'react';
import PropTypes from 'prop-types';
import MainContent from '../../components/MainContent';
import ImagesSwitcher from '../../components/ImagesSwitcher';
import { PAGES_IMAGES } from '../../constants';

const About = ({ switcherImagesVisible }) => (
  <div className="about" id="page-about">
    <MainContent
      title="We are <br /><b>GC Lite</b>"
      text="GCLite FX services are provided by The Currency Cloud <br class='desktop' />Limited, a London fintech firm that has raised over $140m <br class='desktop' />from investors including BNP Paribas and the World Bank <br class='desktop' />Group. A leading player in the provision of cross-border <br class='desktop' />payments, their API powers international payments for <br class='desktop' />Revolut, VISA and Starling Bank, meaning our LITE customers <br class='desktop' />can collect and transact in over 40 currencies at the <br class='desktop' />click of a button"
    />
    <ImagesSwitcher
      imageTop={PAGES_IMAGES.ABOUT.TOP}
      imageBottom={PAGES_IMAGES.ABOUT.BOTTOM}
      imageTopClassName="about__image-top"
      imageBottomClassName="about__image-bottom"
      switcherImagesVisible={switcherImagesVisible}
    />
  </div>
);

About.propTypes = {
  switcherImagesVisible: PropTypes.bool,
}

About.defaultProps = {
  switcherImagesVisible: false,
}
export default About;
