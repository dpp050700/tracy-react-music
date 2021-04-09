import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

interface INoticeConfig {
  type?: 'success' | 'error' | 'info' | 'loading' | 'text';
  content?: String | React.ReactNode;
  duration?: number;
  icon?: string | React.ReactNode;
  customIcon?: React.ReactNode;
  onClose?: () => void;
}

const toastId = 'music-tost';
let timer: any;

type noticeFunc = (config: INoticeConfig) => void;

const notice: noticeFunc = (config: INoticeConfig) => {
  const { type, content, duration = 1500, icon, customIcon, onClose } = config;

  let div: HTMLElement | null = null;
  if (document.getElementById(toastId)) {
    div = document.getElementById(toastId);
  } else {
    div = document.createElement('div');
    div.id = toastId;
    document.body.appendChild(div as HTMLElement);
  }

  const remove = () => {
    document.body.removeChild(div as HTMLElement);
    clearTimeout(timer);
    timer = null;
  };
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(remove, duration);
  ReactDOM.render(
    <Notification
      content={content}
      type={type}
      icon={icon}
      onClose={onClose}
      duration={duration}
      customIcon={customIcon}
    />,
    div,
  );
};

const info: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'info';
  config.content = config.content || '信息';
  config.icon = 'about';
  return notice(config);
};

const success: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'success';
  config.content = config.content || '操作成功';
  config.icon = 'check';
  return notice(config);
};
const error: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'error';
  config.content = config.content || '发生错误';
  config.icon = 'warning-circle';
  return notice(config);
};
const loading: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'loading';
  config.content = config.content || 'Loading...';
  config.icon = 'loading';
  return notice(config);
};
const text: noticeFunc = data => {
  const { ...config } = data;
  config.type = 'text';
  config.content = config.content || '提示～';
  config.icon = '';
  return notice(config);
};

export default {
  info,
  success,
  error,
  loading,
  text,
};
