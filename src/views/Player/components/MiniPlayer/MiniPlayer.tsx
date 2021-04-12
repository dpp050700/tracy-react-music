import React from 'react';
import classnames from 'classnames';
import styled from './MiniPlayer.module.css';
import ProgressCircle from '../../../../components/ProgressCircle/ProgressCircle';

const {
  root,
  imgWrapper,
  descWrapper,
  descSinger,
  descName,
  control,
  controlBtn,
  playList,
} = styled;

interface IMiniPlayer {
  isFull: boolean;
  current: any;
  percent: number;
  playing: boolean;
  playingClick: () => void;
  toggleFull: () => void;
}

const MiniPlayer: React.FC<IMiniPlayer> = (props: IMiniPlayer) => {
  const { current, percent, playing, isFull, playingClick, toggleFull } = props;
  const controlBtnClass = classnames(
    controlBtn,
    `${playing ? 'music-icon-video-pause' : 'music-icon-video-play'}`,
  );
  const imgWrapperClass = classnames(imgWrapper, { paused: !playing });
  return (
    <>
      {isFull ? null : (
        <div className={root} onClick={toggleFull}>
          <div className={imgWrapperClass}>
            <img src={current.al.picUrl} alt="" />
          </div>
          <div className={descWrapper}>
            <p className={descName}>{current.name}</p>
            <p className={descSinger}>{current.ar.map((_: any) => _.name).join('/')}</p>
          </div>
          <div className={control} onClick={playingClick}>
            <ProgressCircle radius={32} percent={percent}>
              <i className={controlBtnClass} />
            </ProgressCircle>
          </div>
          <div className={playList}>
            <i className="music-icon-broadcast" />
          </div>
        </div>
      )}
    </>
  );
};

export default MiniPlayer;
