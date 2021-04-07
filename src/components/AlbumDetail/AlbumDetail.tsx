import React from 'react';
import styled from './AlbumDetail.module.css';
import { httpCollectAlbum } from '../../request/index';

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
}

const AlbumDetail: React.FC<IAlbumDetail> = (props: IAlbumDetail) => {
  const { detail } = props;
  const aa = () => {
    httpCollectAlbum(detail.id, 1);
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
          <i className="iconfont icon-xiaoxi" />
          评论
        </li>
        <li>
          <i className="iconfont icon-aixin-xian" />
          点赞
        </li>
        <li onClick={aa}>
          <i className="iconfont icon-tianjiashoucang" />
          {detail.subscribed ? '取消' : '收藏'}
        </li>
      </ul>
      <div className={songWrapper}>
        <div className={songHeader}>
          <div className={songHeaderLeft}>
            <i className="iconfont icon-erji" />
            <span>
              <span>播放全部</span>
              <span className={sum}>(共{detail.tracks.length}首)</span>
            </span>
          </div>
          <div className={songHeaderRight} onClick={aa}>
            <i className="iconfont icon-tianjiashoucang" />
            收藏(0.1万)
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

export default React.memo(AlbumDetail);
