import React from 'react';
import classnames from 'classnames';
import styled from './SwipeAction.module.css';

const { root, swipeWrapper, swipeItem, swipeLabel, swipeName, swipeContent, swipeArrow } = styled;

export interface ISwipeItem {
  label: string;
  icon: string;
  content?: React.ReactNode;
}

export interface ISwipeAction {
  list: ISwipeItem[];
  name?: string | React.ReactNode;
}

const SwipeAction: React.FC<ISwipeAction> = (props: ISwipeAction) => {
  const { list, name } = props;
  const arrowClass = classnames('iconfont icon-jiantou', swipeArrow);
  return (
    <div className={root}>
      {name ? <p className={swipeName}>{name}</p> : null}
      <ul className={swipeWrapper}>
        {list.map(item => {
          return (
            <li className={swipeItem} key={item.label}>
              <i className={`iconfont icon-${item.icon}`} />
              <div className={swipeLabel}>{item.label}</div>
              <div className={swipeContent}>{item.content}</div>
              <i className={arrowClass} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SwipeAction.defaultProps = {
  hasName: false,
};

export default SwipeAction;
