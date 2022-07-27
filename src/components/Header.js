import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <section className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
    </section>
  )
}

export default Header;
