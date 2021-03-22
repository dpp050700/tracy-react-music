import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import * as actionTypes from './store/actions';
import Banner, { IBannerItem } from './components/Banner/Banner';
import RecommendList, { IRecommendItem } from './components/RecommendList/RecommendList';

interface IRecommend {
  bannerList: IBannerItem[];
  recommendList: IRecommendItem[];
  getBannerDataDispatch: () => void;
  getRecommendListDispatch: () => void;
}

const Recommend: React.FC<IRecommend> = (props: IRecommend) => {
  const { bannerList, recommendList, getBannerDataDispatch, getRecommendListDispatch } = props;
  const [bScroll, setBScroll] = useState<any>(null);
  const scrollContaninerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDispatch();
    }
  }, []);

  useEffect(() => {
    if (scrollContaninerRef && scrollContaninerRef.current) {
      console.log(scrollContaninerRef.current);
      const scroll = new BScroll(scrollContaninerRef.current, {
        probeType: 3,
        click: true,
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      };
    }
    return undefined;
  }, []);
  useEffect(() => {
    if (bScroll) {
      bScroll.refresh();
    }
  });

  return (
    <div
      style={{ overflow: 'hidden', height: '100%' }}
      className="wrapper"
      ref={scrollContaninerRef}
    >
      <div>
        <Banner list={bannerList} />
        <RecommendList list={recommendList} />
      </div>
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
