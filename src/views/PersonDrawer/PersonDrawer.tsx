import React from 'react';
import classnames from 'classnames';
import style from './PersonDrawer.module.css';

const { root, overlay, content } = style;
interface IPersonDrawer {
  show?: boolean;
}

const PersonDrawer: React.FC<IPersonDrawer> = (props: IPersonDrawer) => {
  const { show } = props;
  const rootClass = classnames(root, {
    'is-active': show,
  });
  return (
    <div className={rootClass}>
      <div className={overlay} />
      <div className={content}>111</div>
    </div>
  );
};

PersonDrawer.defaultProps = {
  show: false,
};

export default PersonDrawer;
