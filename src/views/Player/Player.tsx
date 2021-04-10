/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './components/MiniPlayer/MiniPlayer';
import { getSongUrl } from '../../utils/utils';
import * as actions from './store/actions';
import Toast from '../../base/Toast/toast';

interface IPlayer {
  currentSong: any;
  playList: any[];
  currentIndex: number;
  nextSong: () => void;
}

const Player: React.FC<IPlayer> = (props: IPlayer) => {
  const { currentSong, playList, currentIndex, nextSong } = props;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnd = () => {
    nextSong();
  };

  const handleError = () => {
    nextSong();
    Toast.error('播放出错');
  };

  useEffect(() => {
    if (currentIndex === -1 || !playList.length) {
      return;
    }
    if (audioRef && audioRef.current) {
      console.log(getSongUrl(currentSong.id));
      audioRef.current.src = getSongUrl(currentSong.id);
      audioRef.current.playbackRate = 10;
      audioRef.current.play();
    }
  }, [currentIndex, playList]);

  return (
    <>
      {playList.length ? <MiniPlayer current={currentSong} /> : null}
      <audio ref={audioRef} onEnded={handleEnd} onError={handleError} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentSong: state.getIn(['player', 'currentSong'])?.toJS(),
  playList: state.getIn(['player', 'playList']).toJS(),
  currentIndex: state.getIn(['player', 'currentIndex']),
});

const mapDispatchToProps = (dispatch: any) => ({
  nextSong() {
    dispatch(actions.nextSong());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
