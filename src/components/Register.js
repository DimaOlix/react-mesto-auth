import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';
import { useForm } from "../hooks/useForm";


function Register({ requestRegister }) {

  const{ values, handleChange } = useForm({ login: '', password: '' });

  function onRegister(e) {
    e.preventDefault();
    requestRegister({ values });
  }

  return (
    <>
      <section className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <Link className="header__link" to='/sign-in'>Войти</Link>
      </section>

      <div className="page-identification">
        <h1 className="page-identification__title">Регистрация</h1>
        
        <form 
        className="form-identification form-identification_type_login"
        name="popup-login"
        onSubmit={onRegister}
        >

          <input
            className="form-identification__input form-identification__input_value_login"
            type="email"
            name="login"
            id="login-input"
            value={values.login}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="40"
            placeholder="Email"
          />
          <span
            className="form-identification__input-error form-identification__input-error_position_top"
            id="login-input-error">
          </span>
          <input
            className="form-identification__input form-identification__input_value_password"
            type="password"
            name="password"
            id="password-input"
            value={values.password}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="200"
            placeholder="Пароль"
            />
          <span
            className="form-identification__input-error form-identification__input-error_position_button"
            id="password-input-error">
          </span>
          <button 
          className="form-identification__button"
          type="submit" 
          name="save-button">Зарегистрироваться
          </button>

        </form>

        <p className="page-identification__text">
          Уже зарегистрированы?
          <Link className="page-identification__link" to='/sign-in'> Войти</Link>
        </p>
      </div>
    </>
  )
}

export default Register;