import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './DrawerHead.module.css';
import defaultAvatar from '../../../../assets/images/defaultAvatar.png';

import { IUserInfo } from '../../../../store/actions';

const { root, userAvatar, userName } = style;

interface IDrawerHead {
  userInfo: IUserInfo;
  isLogin: boolean;
}

const DrawerHead: React.FC<IDrawerHead> = (props: IDrawerHead) => {
  const { userInfo, isLogin } = props;
  const linkPath = isLogin ? '/' : '/login';
  return (
    <div className={root}>
      <img className={userAvatar} src={userInfo.avatarUrl || defaultAvatar} alt="" />
      <Link to={linkPath}>
        <div className={userName}>
          {isLogin ? userInfo.nickname : '立即登陆'}
          <i className="iconfont icon-jiantou" />
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.getIn(['user', 'userInfo'])?.toJS(),
  isLogin: state.getIn(['user', 'isLogin']) || false,
});

export default connect(mapStateToProps)(DrawerHead);
