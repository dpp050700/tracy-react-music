import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

interface INoticeConfig {
  type?: 'success' | 'error' | 'info' | 'loading' | 'text';
  content?: String | React.ReactNode;
  duration?: number;
  icon?: string;
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

interface INoticeCreater {
  content?: string;
  duration?: number;
  customIcon?: React.ReactNode;
  onClose?: () => void;
}

const info: (data: INoticeCreater | string) => void = (data: INoticeCreater | string) => {
  let config: INoticeConfig = { type: 'info', content: '信息', icon: 'about' };
  if (typeof data === 'string' && data) {
    config.content = data;
  } else {
    config = Object.assign(config, data);
  }

  return notice(config);
};

const success: (data: INoticeCreater | string) => void = (data: INoticeCreater | string) => {
  let config: INoticeConfig = { type: 'success', content: '操作成功', icon: 'check' };
  if (typeof data === 'string' && data) {
    config.content = data;
  } else {
    config = Object.assign(config, data);
  }

  return notice(config);
};

const error: (data: INoticeCreater | string) => void = (data: INoticeCreater | string) => {
  let config: INoticeConfig = { type: 'error', content: '操作失败', icon: 'warning-circle' };
  if (typeof data === 'string' && data) {
    config.content = data;
  } else {
    config = Object.assign(config, data);
  }

  return notice(config);
};

const loading: (data: INoticeCreater | string) => void = (data: INoticeCreater | string) => {
  let config: INoticeConfig = { type: 'loading', content: 'Loading...', icon: 'loading' };
  if (typeof data === 'string' && data) {
    config.content = data;
  } else {
    config = Object.assign(config, data);
  }

  return notice(config);
};

interface ITextCreater {
  content?: string;
  duration?: number;
  onClose?: () => void;
}
const text: (data?: ITextCreater | string) => void = (data?: ITextCreater | string) => {
  let config: INoticeConfig = { type: 'text', content: '提示～' };
  if (typeof data === 'string' && data) {
    config.content = data;
  } else {
    config = Object.assign(config, data || {});
  }

  return notice(config);
};

export default {
  info,
  success,
  error,
  loading,
  text,
};
