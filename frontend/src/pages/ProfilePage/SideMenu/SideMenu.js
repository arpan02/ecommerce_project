import React from 'react';
import PropTypes from 'prop-types';

const SideMenu = ({ user, onMenuItemClick, selected }) => {
  return (
    <div className="profile__side-menu">
      <div className="profile__pic">
        <img src={user.photo}
          alt={user.firstName}
          className="profile__pic__img"
        />
      </div>
      <div className={`profile__side-menu__option ${
          selected === 1 ? 'profile__side-menu__option--selected' : null
        }`}
        onClick={() => onMenuItemClick(1)}
      >
        Profile Info
      </div>
      <div className={`profile__side-menu__option ${
          selected === 2 ? 'profile__side-menu__option--selected' : null
        }`}
        onClick={() => onMenuItemClick(2)}
      >
        Password
      </div>
      <div className={`profile__side-menu__option ${
          selected === 3 ? 'profile__side-menu__option--selected' : null
        }`}
        onClick={() => onMenuItemClick(3)}
      >
        Settings
      </div>
    </div>
  );
};

SideMenu.propTypes = {
  user: PropTypes.object,
  onMenuItemClick: PropTypes.func,
  selected: PropTypes.number
};

export default SideMenu;
