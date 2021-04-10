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
  current: any;
}

const MiniPlayer: React.FC<IMiniPlayer> = (props: IMiniPlayer) => {
  const { current } = props;
  const controlBtnClass = classnames(controlBtn, 'music-icon-video-play');
  return (
    <div className={root}>
      <div className={imgWrapper}>
        <img src={current.al.picUrl} alt="" />
      </div>
      <div className={descWrapper}>
        <p className={descName}>{current.name}</p>
        <p className={descSinger}>{current.ar.map((_: any) => _.name).join('/')}</p>
      </div>
      <div className={control}>
        <ProgressCircle radius={32}>
          <i className={controlBtnClass} />
        </ProgressCircle>
      </div>
      <div className={playList}>
        <i className="music-icon-broadcast" />
      </div>
    </div>
  );
};

export default MiniPlayer;
