import React from 'react';
import styled from './ProgressCircle.module.css';

const { root, progressBar, progressBackground } = styled;

interface IProgressCircle {
  radius?: number;
  children?: React.ReactNode;
  percent: number;
}

const ProgressCircle: React.FC<IProgressCircle> = (props: IProgressCircle) => {
  const { radius, children, percent } = props;
  return (
    <div className={root}>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={progressBackground} r="50" cx="50" cy="50" fill="transparent" />
        <circle
          className={progressBar}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={Math.PI * 100}
          strokeDashoffset={Math.PI * 100 * (1 - percent)}
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressCircle;
