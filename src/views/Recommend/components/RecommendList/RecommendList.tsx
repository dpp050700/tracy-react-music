import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import style from './RecommendList.module.css';

const {
  listWrap,
  recommendTitle,
  recommendItem,
  recommendItemImage,
  recommendItemDesc,
  recommendCount,
} = style;

export interface IRecommendItem {
  name: string;
  id: number;
  picUrl: string;
  playCount: number;
}

export interface IRecommendList {
  list: IRecommendItem[];
}

const RecommendList: React.FC<IRecommendList & RouteComponentProps> = (
  props: IRecommendList & RouteComponentProps,
) => {
  const { list } = props;

  const clickItem = (item: IRecommendItem) => {
    props.history.push(`/recommend/${item.id}`);
  };
  return (
    <div>
      <h1 className={recommendTitle}>推荐歌单</h1>
      <div className={listWrap}>
        {list.map(item => (
          <div
            key={item.id}
            className={recommendItem}
            onClick={() => {
              clickItem(item);
            }}
          >
            <div className={recommendCount}>
              <i className="iconfont icon-erji" />
              <span>{Math.floor(item.playCount / 10000)}万</span>
            </div>
            <div className={recommendItemImage}>
              <img src={item.picUrl} alt="" />
            </div>
            <p className={recommendItemDesc}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(RecommendList);
