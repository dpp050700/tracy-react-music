/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './components/MiniPlayer/MiniPlayer';
import { getSongUrl } from '../../utils/utils';
import * as actions from './store/actions';
import Toast from '../../base/Toast/toast';
import NormalPlayer from './components/NormalPlayer/NormalPlayer';

interface IPlayer {
  currentSong: any;
  playList: any[];
  currentIndex: number;
  playing: boolean;
  isFull: boolean;
  nextSong: () => void;
  changePlaying: (playing: boolean) => void;
  toggleFull: (toggleFull: boolean) => void;
}

const Player: React.FC<IPlayer> = (props: IPlayer) => {
  const {
    currentSong,
    playList,
    currentIndex,
    nextSong,
    playing,
    isFull,
    changePlaying,
    toggleFull,
  } = props;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPause, setPause] = useState(false);

  const percent = Number.isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const handleEnd = () => {
    nextSong();
  };

  const handleError = () => {
    setPause(false);
    nextSong();
    Toast.error('播放出错');
  };

  const timeUpdate = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (playing) {
        audioRef.current.play();
        return;
      }
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (currentIndex === -1 || !playList.length || isPause) {
      return;
    }
    console.log(currentIndex, playList);
    if (audioRef && audioRef.current) {
      audioRef.current.src = getSongUrl(currentSong.id);
      changePlaying(true);
      audioRef.current.play();
      setDuration(currentSong.dt / 1000 || 0);
    }
  }, [currentIndex, playList]);

  return (
    <>
      {playList.length && !isFull ? (
        <MiniPlayer
          isFull={isFull}
          current={currentSong}
          percent={percent}
          playing={playing}
          playingClick={() => {
            changePlaying(!playing);
            setPause(true);
          }}
          toggleFull={() => {
            toggleFull(!isFull);
          }}
        />
      ) : null}
      {playList.length && isFull ? (
        <NormalPlayer
          isFull={isFull}
          current={currentSong}
          percent={percent}
          toggleFull={() => {
            toggleFull(!isFull);
          }}
        />
      ) : null}
      <audio ref={audioRef} onEnded={handleEnd} onError={handleError} onTimeUpdate={timeUpdate} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentSong: state.getIn(['player', 'currentSong'])?.toJS(),
  playList: state.getIn(['player', 'playList']).toJS(),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playing: state.getIn(['player', 'playing']),
  isFull: state.getIn(['player', 'isFull']),
});

const mapDispatchToProps = (dispatch: any) => ({
  nextSong() {
    dispatch(actions.nextSong());
  },
  changePlaying(playing: boolean) {
    dispatch(actions.changePlaying(playing));
  },
  toggleFull(isFull: boolean) {
    dispatch(actions.changePlayerFull(isFull));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
