import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import Banner, { IBannerItem } from './components/Banner/Banner';
import RecommendList from './components/RecommendList/RecommendList';

interface IRecommend {
  bannerList: IBannerItem[];
  recommendList: any[];
  getBannerDataDispatch: () => void;
  getRecommendListDispatch: () => void;
}

const Recommend: React.FC<IRecommend> = (props: IRecommend) => {
  const { bannerList, recommendList, getBannerDataDispatch, getRecommendListDispatch } = props;

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDispatch();
    }
  }, []);

  return (
    <div>
      <Banner list={bannerList} />
      <RecommendList list={recommendList} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList'])?.toJS() || [],
  recommendList: state.getIn(['recommend', 'recommendList'])?.toJS() || [],
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
