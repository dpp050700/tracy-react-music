import React from 'react';
import classnames from 'classnames';
import styled from './Notification.module.css';

const { root, leave } = styled;

const Notification = (props: any) => {
  const { content, type, duration, onClose } = props;
  const [show, setShow] = React.useState(true);
  let timer: any = setTimeout(() => {
    setShow(false);
    clearTimeout(timer);
    timer = null;
    if (onClose) onClose();
  }, duration - 300);
  const rootClass = classnames(root, { [leave]: !show });
  const iconClass = classnames(` music-icon-${type}`);
  return (
    <div className={rootClass}>
      <div>
        <i className={iconClass} />
        {content}
      </div>
    </div>
  );
};
export default Notification;
