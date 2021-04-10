import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from './Album.module.css';
import * as actions from './store/actions';
import Header from '../../components/Header/Header';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';
import Scroll from '../../components/Scroll/Scroll';

const HEAD_HEIGHT = 40;

const { root } = styled;
interface IAlbum {
  albumDetail: any;
  getAlbumDetail: (id: number) => void;
  changeAlbumSubscribedStatus: () => void;
}

interface IRouteParams {
  id: string;
}

const Album: React.FC<IAlbum & RouteComponentProps & HTMLDivElement> = (
  props: IAlbum & RouteComponentProps & HTMLDivElement,
) => {
  const {
    getAlbumDetail,
    changeAlbumSubscribedStatus,
    albumDetail,
    match: { params },
  } = props;

  const headerEl = useRef<any>();

  const routeParams: IRouteParams = params as IRouteParams;
  const id = Number(routeParams.id);
  const leftIcon = [
    {
      name: 'music-icon-back',
      click: () => {
        props.history.go(-1);
      },
    },
  ];

  const onScrollHandler = useCallback(
    pos => {
      const speed = 2;
      const height = Math.abs(pos.y);
      const percent = height / HEAD_HEIGHT > speed ? speed : height / HEAD_HEIGHT;
      const headerDom = headerEl.current;
      if (height === 0) {
        headerDom.style.backgroundColor = '';
        headerDom.style.opacity = 1;
        return;
      }
      if (height < HEAD_HEIGHT * speed) {
        headerDom.style.backgroundColor = 'rgb(212, 68, 57)';
        headerDom.style.opacity = percent / 2;
        return;
      }
      headerDom.style.backgroundColor = 'rgb(212, 68, 57)';
      headerDom.style.opacity = 1;
    },
    [albumDetail],
  );

  useEffect(() => {
    getAlbumDetail(id);
  }, [id]);
  return (
    <div className={root}>
      <Header title="歌单" leftIcons={leftIcon} ref={headerEl} />
      {albumDetail.id ? (
        <Scroll bounceTop={false} onScroll={onScrollHandler}>
          <AlbumDetail detail={albumDetail} subscribedHandler={changeAlbumSubscribedStatus} />
        </Scroll>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  albumDetail: state.getIn(['album', 'albumDetail']).toJS(),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDetail(id: number) {
      dispatch(actions.getAlbumDetail(id));
    },
    changeAlbumSubscribedStatus() {
      dispatch(actions.changeAlbumSubscribedStatus());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
