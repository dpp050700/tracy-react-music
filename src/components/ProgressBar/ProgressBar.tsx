import React, { useEffect, useRef } from 'react';
import styled from './ProgressBar.module.css';
// import { getPlayTimeByPercent } from '../../utils/utils';

const { root, time, line, lineActive, progressBtnWrapper, progressBtn } = styled;

interface IProgressBar {
  percent: number;
  playTime: string;
  totalTime: string;
}

const progressBtnWidth = 16;

const ProgressBar: React.FC<IProgressBar> = (props: IProgressBar) => {
  const { percent, playTime, totalTime } = props;
  const progressBar = useRef<HTMLDivElement | null>(null);
  const progressButton = useRef<HTMLDivElement | null>(null);
  const progressActive = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (
      progressBar &&
      progressBar.current &&
      progressActive &&
      progressActive.current &&
      progressButton &&
      progressButton.current
    ) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progressActive.current.style.width = `${offsetWidth}px`;
      progressButton.current.style.transform = `translateX(${offsetWidth}px)`;
    }
  }, [percent]);

  return (
    <div className={root}>
      <div className={time}>{playTime}</div>
      <div className={line} ref={progressBar}>
        <div className={lineActive} ref={progressActive} />
        <div className={progressBtnWrapper}>
          <div className={progressBtn} ref={progressButton} />
        </div>
      </div>
      <div className={time}>{totalTime}</div>
    </div>
  );
};

export default ProgressBar;
