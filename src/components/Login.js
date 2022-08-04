import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';
import { useForm } from "../hooks/useForm";



function Login({ requestLogin }) {

  const{ values, handleChange } = useForm({ login: '', password: '' });

  function onLogin(e) {
    e.preventDefault();
    requestLogin({ values });
  }

  return (
    <>
      <section className="header">
        <img className="header__logo" src={logo} alt="Логотип"/>
        <Link className="header__link" to='/sign-up'>
          Регистрация
        </Link>
      </section>

      <div className="page-identification">
        <h1 className="page-identification__title">
          Вход
        </h1>
        
        <form 
        className="form-identification form-identification_type_login"
        name="identification-login"
        onSubmit={onLogin}
        >

          <input
            className="form-identification__input form-identification__input_value_login"
            type="text"
            name="login"
            id="login-input"
            value={ values.login }
            onChange={ handleChange }
            required
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
            value={ values.password }
            onChange={ handleChange }
            required
            placeholder="Пароль"
            />
          <span
            className="form-identification__input-error form-identification__input-error_position_button"
            id="password-input-error">
          </span>
          <button 
          className="form-identification__button"
          type="submit" 
          name="save-button">
            Войти
          </button>

        </form>
      </div>
    </>
  )
}

export default Login;