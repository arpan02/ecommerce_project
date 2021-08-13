import React from 'react';
import './MobileSideMenu.scss';
import { ReactComponent as MenuIcon } from '../../assets/icons/SVG/menu.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSideMenu } from '../../redux/ui/ui.actions';

const MobileSideMenu = ({ toggleSideMenu }) => {
  return (
    <div className="mobile-side-menu" onClick={() => toggleSideMenu()}>
      <MenuIcon className="mobile-side-menu__icon" />
    </div>
  );
};

MobileSideMenu.propTypes = {
  toggleSideMenu: PropTypes.func
};

export default connect(null, { toggleSideMenu })(MobileSideMenu);
