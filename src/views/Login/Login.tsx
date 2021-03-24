import React, { useRef, useState } from 'react';
import style from './Login.module.css';
import { userLogin } from '../../request/index';

const { root, loginForm, phoneInputWrapper, passwordInputWrapper } = style;

const Login: React.FC = () => {
  const phoneRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPhone(val);
  };
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPassword(val);
  };
  const handlerLogin = () => {
    userLogin(phone, password);
  };
  return (
    <div className={root}>
      <div className={loginForm}>
        <div className={phoneInputWrapper}>
          <input
            placeholder="输入手机号码"
            value={phone}
            ref={phoneRef}
            onChange={handlePhoneChange}
          />
        </div>
        <div className={passwordInputWrapper}>
          <input placeholder="输入验证码" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <input type="checkbox" />
        </div>
        <button onClick={handlerLogin}>登陆</button>
      </div>
    </div>
  );
};

export default Login;
