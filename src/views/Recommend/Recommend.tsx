import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import * as actionTypes from './store/actions';
import Banner, { IBannerItem } from './components/Banner/Banner';
import RecommendList, { IRecommendItem } from './components/RecommendList/RecommendList';
import Scroll from '../../components/Scroll/Scroll';
import styled from './Recommend.module.css';

const { root } = styled;
interface IRecommend {
  bannerList: IBannerItem[];
  recommendList: IRecommendItem[];
  getBannerDataDispatch: () => void;
  getRecommendListDispatch: () => void;
}

const Recommend: React.FC<IRecommend & RouteConfigComponentProps> = (
  props: IRecommend & RouteConfigComponentProps,
) => {
  const {
    bannerList,
    recommendList,
    route,
    getBannerDataDispatch,
    getRecommendListDispatch,
  } = props;

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDispatch();
    }
  }, []);

  return (
    <div className={root}>
      <Scroll>
        <div>
          <Banner list={bannerList} />
          <RecommendList list={recommendList} />
        </div>
      </Scroll>
      {route ? renderRoutes(route.routes) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
