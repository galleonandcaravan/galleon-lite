import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { PAGES } from '../../constants';
import './styles.css';

const Dots = ({ activePage, isHidden }) => (
  <ul className={cn('dots', { dots_hidden: isHidden })}>
    {Object.keys(PAGES).map((pageKey, index) => (
      <li
        key={pageKey}
        className={cn('dots__item', {
          dots__item_active: (activePage === PAGES[pageKey]) || (index === 0 && !activePage)
        })}
      >
        <a href={`#${PAGES[pageKey]}`} />
      </li>
    ))}
  </ul>
);

Dots.propTypes = {
  activePage: PropTypes.string,
  isHidden: PropTypes.bool
};

Dots.defaultProps = {
  activePage: '',
  isHidden: false
};

export default Dots;
