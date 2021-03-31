import React, { useRef, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from './SearchBox.module.css';
import * as actions from '../../store/actions';
import { debounce } from '../../../../utils/utils';

const { root, searchInputWrap, searchCancel, searchIcon, searchClear } = styled;

interface ISearchBox {
  keywords: string;
  inputChange: (keywords: string) => void;
  getSuggestList: (keywords: string) => void;
}

const SearchBox: React.FC<ISearchBox> = (props: ISearchBox) => {
  const { keywords, inputChange, getSuggestList } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleQueryDebounce = useMemo(() => {
    return debounce(getSuggestList, 500);
  }, [getSuggestList]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });
  useEffect(() => {
    handleQueryDebounce(keywords);
  }, [keywords]);
  return (
    <div className={root}>
      <div className={searchInputWrap}>
        <div className={searchIcon}>
          <i className="iconfont icon-sousuo" />
        </div>
        <input
          type="text"
          value={keywords}
          ref={inputRef}
          onChange={e => {
            inputChange(e.currentTarget.value);
          }}
        />
        {keywords ? (
          <div
            className={searchClear}
            onClick={() => {
              inputChange('');
            }}
          >
            <i className="iconfont icon-shibai" />
          </div>
        ) : null}
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
    getSuggestList(keywords: string) {
      dispatch(actions.getSuggestList(keywords));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
