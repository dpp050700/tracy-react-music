import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import style from './PersonDrawer.module.css';
import * as actions from '../../store/actions';

const { root, overlay, content } = style;
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
      <div className={content}>{isLogin ? <button onClick={userLogout}>out</button> : '登陆'}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonDrawer);
