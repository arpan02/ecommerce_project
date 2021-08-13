import React, { Component } from 'react';
// import TopMenu from '../TopMenu/TopMenu';
import './Menu.scss';
// import BottomMenu from './BottomMenu/BottomMenu';
import { connect } from 'react-redux';
import { toggleSideMenu } from '../../redux/ui/ui.actions';
import PropTypes from 'prop-types';
import TopMenu from './TopMenu/TopMenu';
import BottomMenu from './BottomMenu/BottomMenu';

class Menu extends Component {
  static propTypes = {
    toggleSideMenu: PropTypes.func,
    isOpen: PropTypes.bool
  };

  onMenuBarClick = () => {
    const { toggleSideMenu } = this.props;
    toggleSideMenu();
  };

  render() {
    return (
      <nav className="menu">
        <TopMenu onMenuBarClick={this.onMenuBarClick} />
        <BottomMenu />
        <div className="menu__bottom"></div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.ui.isSideMenuOpen
});

export default connect(mapStateToProps, { toggleSideMenu })(Menu);
