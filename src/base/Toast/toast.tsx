import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

interface INoticeConfig {
  type?: 'success' | 'error' | 'info' | 'loading';
  content?: String | React.ReactNode;
  duration?: number;
  icon?: string | React.ReactNode;
  onClose?: () => void;
}

type noticeFunc = (config: INoticeConfig) => void;

const notice: noticeFunc = (config: INoticeConfig) => {
  const { type, content, duration = 3000, icon, onClose } = config;

  const div = document.createElement('div');
  document.body.appendChild(div);

  let timer: any;
  const remove = () => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    clearTimeout(timer);
    timer = null;
  };
  timer = setTimeout(remove, duration);
  ReactDOM.render(
    <Notification
      content={content}
      type={type}
      icon={icon}
      onClose={onClose}
      duration={duration}
    />,
    div,
  );
  // return (
  //   <Notification content={content} type={type} icon={icon} onClose={onClose} duration={duration} />
  // );
};

const info: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'info';
  config.content = config.content || '信息';
  return notice(config);
};

const success: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'success';
  config.content = config.content || '操作成功';
  return notice(config);
};
const error: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'error';
  config.content = config.content || '发生错误';
  return notice(config);
};
const loading: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'loading';
  config.content = config.content || 'Loading...';
  return notice(config);
};

export default {
  info,
  success,
  error,
  loading,
};
