import React from 'react';
import style from './RecommendList.module.css';

const { listWrap, recommendItem, recommendItemImage } = style;

interface IRecommendItem {
  name: string;
  id: number;
  picUrl: string;
}

export interface IRecommendList {
  list: IRecommendItem[];
}

const RecommendList: React.FC<IRecommendList> = (props: IRecommendList) => {
  const { list } = props;
  return (
    <div>
      <h1>推荐歌单</h1>
      <div className={listWrap}>
        {list.map(item => (
          <div key={item.id} className={recommendItem}>
            <div className={recommendItemImage}>
              <img src={item.picUrl} alt="" />
            </div>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendList;
