import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SerachList, { ISearchItem } from '../SerachList/SerachList';
import * as action from '../../store/actions';

interface IHotSearch {
  hotList: ISearchItem[];
  getHotListDispatch: () => void;
}

const HotSearch: React.FC<IHotSearch> = (props: IHotSearch) => {
  const { hotList, getHotListDispatch } = props;

  useEffect(() => {
    getHotListDispatch();
  }, []);

  return <SerachList label="热门搜索" list={hotList} />;
};

const mapStateToProps = (state: any) => {
  return {
    hotList: state.getIn(['search', 'hotList'])?.toJS() || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotListDispatch() {
      dispatch(action.getHotList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotSearch);
