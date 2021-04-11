import React from 'react';
import classnames from 'classnames';
import styled from './Header.module.css';

const { root, headerTitle, iconWrapper } = styled;
interface IIcon {
  name: string;
  click?: () => void;
}

interface IHeader extends React.RefAttributes<HTMLDivElement> {
  title?: string | React.ReactNode;
  leftIcons?: IIcon[];
  rightIcons?: IIcon[];
  className?: string;
}

const Header: React.FC<IHeader> = React.forwardRef(
  (props: IHeader, ref: React.Ref<HTMLDivElement>) => {
    const { title, leftIcons, rightIcons, className = '' } = props;
    const rootClass = classnames(root, className);
    const getIconClass = (name: string) => {
      return classnames(name);
    };
    const iconClick = (clickHandler?: () => void) => {
      if (clickHandler) {
        clickHandler();
      }
    };
    return (
      <div className={rootClass} ref={ref}>
        <div className={iconWrapper}>
          {leftIcons &&
            leftIcons.map((item: any) => (
              <i
                key={item.name}
                className={getIconClass(item.name)}
                onClick={() => {
                  iconClick(item.click);
                }}
              />
            ))}
        </div>
        <h1 className={headerTitle}>{title}</h1>
        <div className={iconWrapper}>
          {rightIcons &&
            rightIcons.map((item: any) => (
              <i
                key={item.name}
                className={getIconClass(item.name)}
                onClick={() => {
                  iconClick(item.click);
                }}
              />
            ))}
        </div>
      </div>
    );
  },
);

Header.defaultProps = {
  title: '',
  leftIcons: [],
  rightIcons: [],
};

export default Header;
