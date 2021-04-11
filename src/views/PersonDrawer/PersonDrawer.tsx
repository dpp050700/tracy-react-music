import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import style from './PersonDrawer.module.css';
import * as actions from '../../store/actions';
import DrawerHead from './components/DrawerHead/DrawerHead';
import SwipeAction from '../../components/SwipeAction/SwipeAction';
import swipeActionList from './swipeActionList';
import MessageNumber from './components/MessageNumber/MessageNumber';

swipeActionList[0].list[0].content = <MessageNumber />;

const { root, overlay, content, listWrap, logoutBtn } = style;
interface IPersonDrawer {
  show?: boolean;
  onClose: () => void;
  isLogin: boolean;
  userLogout: () => void;
}

const PersonDrawer: React.FC<IPersonDrawer> = (props: IPersonDrawer) => {
  const { show, onClose, isLogin, userLogout } = props;
  const rootClass = classnames(root, {
    'is-active': show,
  });
  return (
    <div className={rootClass}>
      <div
        role="button"
        className={overlay}
        onClick={onClose}
        onKeyDown={onClose}
        aria-label="Mute volume"
        tabIndex={0}
      />
      <div className={content}>
        <DrawerHead />
        <div className={listWrap}>
          {swipeActionList.map((item, index) => {
            return <SwipeAction list={item.list} name={item.name} key={index} />;
          })}

          {isLogin ? (
            <div className={logoutBtn}>
              <button onClick={userLogout}>退出登录</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PersonDrawer.defaultProps = {
  show: false,
};

const mapStateToProps = (state: any) => ({
  isLogin: state.getIn(['user', 'isLogin']) || false,
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    userLogout() {
      dispatch(actions.userLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PersonDrawer));
