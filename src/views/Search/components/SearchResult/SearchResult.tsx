import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Scroll from '../../../../components/Scroll/Scroll';
import styled from './SearchResult.module.css';

const { header, resultItem, left, right, songName, songInfo } = styled;

interface ISearchResult {
  result: any[];
}

const SearchResult: React.FC<ISearchResult> = (props: ISearchResult) => {
  const { result } = props;
  const iconClass = classnames(right, 'icon-erji iconfont');
  return (
    <Scroll>
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
    </Scroll>
  );
};

const mapStateToProps = (state: any) => ({
  result: state.getIn(['search', 'result']).toJS(),
});

export default connect(mapStateToProps)(SearchResult);
