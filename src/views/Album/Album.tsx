import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from './Album.module.css';
import * as actions from './store/actions';
import Header from '../../components/Header/Header';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';
import Scroll from '../../components/Scroll/Scroll';

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

  const routeParams: IRouteParams = params as IRouteParams;
  const id = Number(routeParams.id);
  const leftIcon = [
    {
      name: 'music-icon-back',
    },
  ];

  useEffect(() => {
    getAlbumDetail(id);
  }, [id]);
  return (
    <div className={root}>
      <Header title="歌单" leftIcons={leftIcon} />
      {albumDetail.id ? (
        <Scroll bounceTop={false}>
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
