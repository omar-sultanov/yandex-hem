import React from 'react';
import '../assets/scss/app.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  return (
    <div className="header">
      <span>
        <FontAwesomeIcon className='homeIcon' icon={faHouseUser} />
      </span>
      Мой дом
    </div>
  );
};

export default Header;
