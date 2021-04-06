import React from 'react';
import classnames from 'classnames';
import styled from './Header.module.css';

const { root, headerTitle } = styled;
interface IIcon {
  name: string;
  click?: () => void;
}

interface IHeader {
  title?: string;
  leftIcons?: IIcon[];
  rightIcons?: IIcon[];
  className?: string;
}

const Header: React.FC<IHeader> = (props: IHeader) => {
  const { title, leftIcons, rightIcons, className = '' } = props;
  const rootClass = classnames(root, className);
  const getIconClass = (name: string) => {
    return classnames(name, 'iconfont');
  };
  return (
    <div className={rootClass}>
      <div>
        {leftIcons &&
          leftIcons.map(item => <i key={item.name} className={getIconClass(item.name)} />)}
      </div>
      <h1 className={headerTitle}>{title}</h1>
      <div>
        {rightIcons &&
          rightIcons.map(item => <i key={item.name} className={getIconClass(item.name)} />)}
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: '',
  leftIcons: [],
  rightIcons: [],
};

export default Header;
