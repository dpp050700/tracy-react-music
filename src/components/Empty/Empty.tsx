import React from 'react';
import styled from './Empty.module.css';

const { root } = styled;

interface IAction {
  label: string;
  click: () => void;
}

interface IEmpty {
  text?: string;
  image?: string;
  actions?: IAction[];
}

const Empty: React.FC<IEmpty> = (props: IEmpty) => {
  const { text, image, actions } = props;

  return (
    <div className={root}>
      {image ? <img src={image} alt="" /> : null}
      <span>{text}</span>
      {actions && actions.length ? (
        <ul>
          {actions.map((action: IAction) => (
            <li>{action.label}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Empty.defaultProps = {
  text: '暂无数据',
  actions: [],
};

export default Empty;
