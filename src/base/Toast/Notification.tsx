import React from 'react';
import classnames from 'classnames';
import styled from './Notification.module.css';

const { root, leave, iconWrapper, iconFont, textWrapper } = styled;

const Notification = (props: any) => {
  const { content, duration, onClose, icon, customIcon, type } = props;
  const [show, setShow] = React.useState(true);
  let timer: any = setTimeout(() => {
    setShow(false);
    clearTimeout(timer);
    timer = null;
    if (onClose) onClose();
  }, duration - 300);
  const rootClass = classnames(root, { [leave]: !show });
  const iconClass = (name: string) => {
    return classnames(`music-icon-${name}`, iconFont);
  };
  const getIconElement = () => {
    if (customIcon) {
      return typeof customIcon === 'string' ? <i className={iconClass(customIcon)} /> : customIcon;
    }
    return <i className={iconClass(icon)} />;
  };
  return (
    <div className={rootClass}>
      {type === 'text' ? null : <div className={iconWrapper}>{getIconElement()}</div>}
      <div className={textWrapper}>{content}</div>
    </div>
  );
};
export default Notification;
