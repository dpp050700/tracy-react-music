import React from 'react';
import styled from './NormalPlayer.module.css';
import Header from '../../../../components/Header/Header';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import { getPlayTimeByPercent } from '../../../../utils/utils';

const {
  root,
  headerWrapper,
  headerContent,
  headerName,
  headerSinger,
  background,
  layer,
  content,
  bottom,
  playerController,
} = styled;

interface INormalPlayer {
  isFull: boolean;
  current: any;
  percent: number;
  playing: boolean;
  mode: number;
  playingClick: () => void;
  toggleFull: () => void;
}

const NormalPlayer: React.FC<INormalPlayer> = (props: INormalPlayer) => {
  const { current, percent, isFull, playing, mode, playingClick, toggleFull } = props;
  const leftIcon = [
    {
      name: 'music-icon-arrow-down',
      click: toggleFull,
    },
  ];

  const title = (
    <div className={headerContent}>
      <div className={headerName}>{current.name}</div>
      <div className={headerSinger}>{current.ar.map((_: any) => _.name).join('/')}</div>
    </div>
  );

  const controllers = [
    {
      name: 'mode',
      icon: () => {
        return ['music-icon-loop', 'music-icon-single-loop', 'music-icon-random'][mode];
      },
      click: () => {},
    },
    {
      name: 'prev',
      icon: 'music-icon-prev',
    },
    {
      name: 'status',
      icon: () => {
        return playing ? 'music-icon-video-pause-line' : 'music-icon-video-play-line';
      },
      click: () => {
        playingClick();
      },
    },
    { name: 'next', icon: 'music-icon-next' },
    { name: 'list', icon: 'music-icon-list' },
  ];

  const getIcon = (icon: any) => {
    if (typeof icon === 'string') return icon;
    return icon();
  };

  const PlayerController = () => {
    return (
      <>
        {controllers.map(item => (
          <div>
            <i className={getIcon(item.icon)} onClick={item.click} />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {isFull ? (
        <div className={root}>
          <Header leftIcons={leftIcon} className={headerWrapper} title={title} />
          <div className={background}>
            <img src={current.al.picUrl} alt="" />
          </div>
          <div className={`${layer} ${background}`} />
          <div className={content} />
          <div className={bottom}>
            <ProgressBar
              percent={percent}
              playTime={getPlayTimeByPercent(percent, current.dt)}
              totalTime={getPlayTimeByPercent(1, current.dt)}
            />
            <div className={playerController}>{PlayerController()}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NormalPlayer;
