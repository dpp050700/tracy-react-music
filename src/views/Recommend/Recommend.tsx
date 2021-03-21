import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import Banner, { IBannerItem } from './components/Banner/Banner';

interface IRecommend {
  bannerList: IBannerItem[];
  getBannerDataDispatch: () => void;
}

const Recommend: React.FC<IRecommend> = (props: IRecommend) => {
  const { bannerList, getBannerDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
  }, []);

  return (
    <div>
      <Banner list={bannerList} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList'])?.toJS() || [],
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
  };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
