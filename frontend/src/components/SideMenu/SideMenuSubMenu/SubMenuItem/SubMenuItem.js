import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SubMenuItem = ({ Icon, itemNumber, sideMenuItemNumber, link }) => {
  return (
    <Link to={link}
      className={`side-menu__sub-menu__item ${
        itemNumber === sideMenuItemNumber
          ? 'side-menu__sub-menu__item--selected'
          : ''
      }`}
    >
      <Icon className={`side-menu__sub-menu__item__icon`} />
    </Link>
  );
};

SubMenuItem.propTypes = {
  Icon: PropTypes.object,
  itemNumber: PropTypes.number,
  sideMenuItemNumber: PropTypes.number,
  link: PropTypes.string
};

const mapStateToProps = (state) => ({
  sideMenuItemNumber: state.ui.sideMenuItemNumber
});

export default connect(mapStateToProps)(SubMenuItem);
