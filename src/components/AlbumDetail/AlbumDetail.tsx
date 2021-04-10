import React from 'react';
import { connect } from 'react-redux';
import styled from './AlbumDetail.module.css';
import Toast from '../../base/Toast/toast';

const {
  root,
  top,
  topBackground,
  filter,
  topContent,
  topImageWrapper,
  topDescWrapper,
  creatorWrapper,
  creatorAvatar,
  creatorName,
  actionWrapper,
  songWrapper,
  songHeader,
  songHeaderLeft,
  sum,
  songHeaderRight,
  songList,
  songItem,
  songIndex,
  songDesc,
  songSinger,
} = styled;

interface IAlbumDetail {
  detail: any;
  subscribedHandler: () => void;
  playHandler: () => void;
}

const AlbumDetail: React.FC<IAlbumDetail> = (props: IAlbumDetail) => {
  const { detail, subscribedHandler, playHandler } = props;
  const subscribedClick = () => {
    if (detail.subscribed) {
      Toast.text('您已经收藏了～');
      return;
    }
    subscribedHandler();
  };

  return (
    <div className={root}>
      <div className={top}>
        <div className={topBackground} style={{ backgroundImage: `url(${detail.coverImgUrl})` }}>
          <div className={filter} />
        </div>
        <div className={topContent}>
          <div className={topImageWrapper}>
            <img src={detail.coverImgUrl} alt="" />
          </div>
          <div className={topDescWrapper}>
            <h1>{detail.name}</h1>
            <div className={creatorWrapper}>
              <img className={creatorAvatar} src={detail.creator.avatarUrl} alt="" />
              <span className={creatorName}>{detail.creator.nickname}</span>
            </div>
          </div>
        </div>
      </div>
      <ul className={actionWrapper}>
        <li>
          <i className=" music-icon-chat-dot-square" />
          评论
        </li>
        <li>
          <i className=" music-icon-love-outline" />
          点赞
        </li>
        <li onClick={subscribedHandler}>
          <i className={detail.subscribed ? 'music-icon-un-subscribed' : 'music-icon-subscribed'} />
          {detail.subscribed ? '取消' : '收藏'}
        </li>
      </ul>
      <div className={songWrapper}>
        <div className={songHeader}>
          <div className={songHeaderLeft}>
            <i className=" music-icon-erji" />
            <span>
              <span onClick={playHandler}>播放全部</span>
              <span className={sum}>(共{detail.tracks.length}首)</span>
            </span>
          </div>
          <div className={songHeaderRight} onClick={subscribedClick}>
            <i className=" music-icon-tianjiashoucang" />
            收藏(
            {detail.subscribedCount < 1000
              ? detail.subscribedCount
              : `${(detail.subscribedCount / 10000).toFixed(1)}万`}
            )
          </div>
        </div>
        <ul className={songList}>
          {detail.tracks.map((item: any, index: number) => (
            <li key={index} className={songItem}>
              <div className={songIndex}>{index + 1}</div>
              <div className={songDesc}>
                <p>{item.name}</p>
                <p className={songSinger}>
                  {item.ar.map((_: any) => _.name).join('/')} - {item.al.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDsipatchToProps = () => ({});

export default connect(mapStateToProps, mapDsipatchToProps)(React.memo(AlbumDetail));
