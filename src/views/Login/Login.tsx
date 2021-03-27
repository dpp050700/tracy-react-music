import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './Login.module.css';
import { userLogin, changeAgreementChecked, ILoginParams } from '../../store/actions';
import Logo from '../../assets/images/logo.jpeg';

const {
  root,
  appLogo,
  loginForm,
  loginFormInput,
  phoneInputWrapper,
  passwordInputWrapper,
  loginButton,
  argumentWrapper,
  argumentText,
} = style;

const Login: React.FC = (props: any) => {
  const { isLogin, agreementChecked } = props;
  const { login, history, toogleChecked } = props;
  const phoneRef = useRef(null);
  const [phone, setPhone] = useState('16602124116');
  const [password, setPassword] = useState('9aa10d9f658beee4b4eccc63941d767b');

  const phoneClass = classnames(loginFormInput, phoneInputWrapper);
  const passwordClass = classnames(loginFormInput, passwordInputWrapper);

  useEffect(() => {
    if (isLogin) {
      history.push('/recommend');
    }
  }, [isLogin]);

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPhone(val);
  };
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPassword(val);
  };
  const handlerLogin = () => {
    login({
      phone,
      password,
    });
  };
  return (
    <div className={root}>
      <img src={Logo} alt="" className={appLogo} />
      <div className={loginForm}>
        <div className={phoneClass}>
          <input
            placeholder="输入手机号码"
            value={phone}
            ref={phoneRef}
            onChange={handlePhoneChange}
          />
        </div>
        <div className={passwordClass}>
          <input
            placeholder="输入密码"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button onClick={handlerLogin} className={loginButton}>
          登陆
        </button>

        <label htmlFor="argument" className={argumentWrapper}>
          <input
            type="checkbox"
            id="argument"
            checked={agreementChecked}
            onChange={() => {
              toogleChecked(!agreementChecked);
            }}
          />
          <p className={argumentText}>
            <span>同意</span>
            <span>用户协议</span>
            <span>隐私政策</span>
          </p>
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isLogin: state.getIn(['user', 'isLogin']),
  agreementChecked: state.getIn(['user', 'agreementChecked']),
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    login(params: ILoginParams) {
      dispatch(userLogin(params));
    },
    toogleChecked(isChecked: boolean) {
      dispatch(changeAgreementChecked(isChecked));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login));
