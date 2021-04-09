import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Scroll from '../../../../components/Scroll/Scroll';
import styled from './SearchResult.module.css';
import * as action from '../../store/actions';
import Empty from '../../../../components/Empty/Empty';
import EmptyImg from '../../../../assets/images/empty-image-default.png';

const { header, resultItem, left, right, songName, songInfo } = styled;

interface ISearchResult {
  result: any[];
  loadMoreSearchResult: () => void;
}

const SearchResult: React.FC<ISearchResult> = (props: ISearchResult) => {
  const { result, loadMoreSearchResult } = props;
  const iconClass = classnames(right, 'music-icon-erji ');

  const pullUp = () => {
    loadMoreSearchResult();
  };
  return (
    <Scroll pullUp={pullUp}>
      {result.length ? (
        <div>
          <h1 className={header}>
            <i className="music-icon-headset " />
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
        <Empty image={EmptyImg} />
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
