import React from 'react';

interface IAlbumDetail {
  detail: any;
}

const AlbumDetail: React.FC<IAlbumDetail> = (props: IAlbumDetail) => {
  const { detail } = props;
  return (
    <div>
      <img src={detail.coverImgUrl} alt="" />
    </div>
  );
};

export default React.memo(AlbumDetail);
