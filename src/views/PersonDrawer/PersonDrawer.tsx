import React from 'react';
import classnames from 'classnames';
import style from './PersonDrawer.module.css';

const { root, overlay, content } = style;
interface IPersonDrawer {
  show?: boolean;
  onClose: () => void;
}

const PersonDrawer: React.FC<IPersonDrawer> = (props: IPersonDrawer) => {
  const { show, onClose } = props;
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
      <div className={content}>111</div>
    </div>
  );
};

PersonDrawer.defaultProps = {
  show: false,
};

export default PersonDrawer;
