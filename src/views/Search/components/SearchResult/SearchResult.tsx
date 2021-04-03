import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Scroll from '../../../../components/Scroll/Scroll';
import styled from './SearchResult.module.css';
import * as action from '../../store/actions';

const { header, resultItem, left, right, songName, songInfo } = styled;

interface ISearchResult {
  result: any[];
  loadMoreSearchResult: () => void;
}

const SearchResult: React.FC<ISearchResult> = (props: ISearchResult) => {
  const { result, loadMoreSearchResult } = props;
  const iconClass = classnames(right, 'icon-erji iconfont');
  const pullDown = () => {
    console.log(1112);
  };
  const pullUp = () => {
    loadMoreSearchResult();
  };
  return (
    <Scroll pullDown={pullDown} pullUp={pullUp}>
      {result.length ? (
        <div>
          <h1 className={header}>
            <i className="icon-erji iconfont" />
            播放全部
          </h1>
          {result.map((item, index) => {
            const { name, al, ar } = item;
            const singerName = ar.map((_: any) => _.name).join('/');
            return (
              <li key={index} className={resultItem}>
                <div className={left}>
                  <h1 className={songName}>{name}</h1>
                  <p className={songInfo}>
                    {singerName}-{al.name}
                  </p>
                </div>
                <i className={iconClass} />
              </li>
            );
          })}
        </div>
      ) : (
        <div>暂无数据</div>
      )}
    </Scroll>
  );
};

const mapStateToProps = (state: any) => ({
  result: state.getIn(['search', 'result']).toJS(),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadMoreSearchResult() {
      dispatch(action.loadMoreSearchResult());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
