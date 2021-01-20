import React from 'react';
import { Link } from 'react-router-dom'; 

function Register({registration}) {
  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');

  function handleChangeEmail(e) {
    setValueEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setValuePassword(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault()
    const email = valueEmail;
    const password = valuePassword;
    registration(email, password)
  } 

  return (
    <section className="start-screen">
      <h1 className="start-screen__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="start-screen__form">
        <input value={valueEmail} type="email" className="start-screen__input" placeholder="Email" onChange={handleChangeEmail}/>
        <input value={valuePassword} type="password" className="start-screen__input" placeholder="Пароль" onChange={handleChangePassword}/>
        <button className="start-screen__submit">Зарегистрироваться</button>
      </form>
      <Link className="start-screen__login" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;