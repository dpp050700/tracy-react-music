import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import Banner, { IBannerItem } from './components/Banner/Banner';
import RecommendList, { IRecommendItem } from './components/RecommendList/RecommendList';
import Scroll from '../../components/Scroll/Scroll';

interface IRecommend {
  bannerList: IBannerItem[];
  recommendList: IRecommendItem[];
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
    <Scroll>
      <div>
        <Banner list={bannerList} />
        <RecommendList list={recommendList} />
      </div>
    </Scroll>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
