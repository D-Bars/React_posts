import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context/index.js'

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const logIn = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }
  return (
    <div>
        <h1>Authorization Page</h1>
        <form onSubmit={logIn}>
            <MyInput type="text" placeholder="Email" />
            <MyInput type="password" placeholder="Password" />
            <MyButton>Log in</MyButton>
        </form>
    </div>
  );
};
export default Login;