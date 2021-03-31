import React from 'react';
import { connect } from 'react-redux';
import styled from './SearchBox.module.css';
import * as actions from '../../store/actions';

const { root, searchInputWrap, searchCancel, searchIcon, searchClear } = styled;

interface ISearchBox {
  keywords: string;
  inputChange: (keywords: string) => void;
  getSearchValue: (keywords: string) => void;
}

const SearchBox: React.FC<ISearchBox> = (props: ISearchBox) => {
  const { keywords, inputChange, getSearchValue } = props;
  return (
    <div className={root}>
      <div className={searchInputWrap}>
        <div className={searchIcon}>
          <i className="iconfont icon-sousuo" />
        </div>
        <input
          type="text"
          value={keywords}
          onChange={e => {
            inputChange(e.currentTarget.value);
          }}
          onBlur={e => {
            getSearchValue(e.currentTarget.value);
          }}
        />
        <div className={searchClear}>
          <i className="iconfont icon-shibai" />
        </div>
      </div>
      <span className={searchCancel}>取消</span>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keywords: state.getIn(['search', 'keywords']),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    inputChange(keywords: string) {
      dispatch(actions.changeSearchKeywords(keywords));
    },
    getSearchValue(keywords: string) {
      dispatch(actions.getSearchValue(keywords));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
