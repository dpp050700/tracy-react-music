import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SerachList, { ISearchItem } from '../SerachList/SerachList';
import * as action from '../../store/actions';

interface IHistorySearch {
  historyList: ISearchItem[];
  getHistoryListDispatch: () => void;
}

const HistorySearch: React.FC<IHistorySearch> = (props: IHistorySearch) => {
  const { historyList, getHistoryListDispatch } = props;

  useEffect(() => {
    getHistoryListDispatch();
  }, []);

  return <SerachList label="历史搜索" list={historyList} />;
};

const mapStateToProps = (state: any) => {
  return {
    historyList: state.getIn(['search', 'historyList'])?.toJS() || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHistoryListDispatch() {
      dispatch(action.getHistoryList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistorySearch);
