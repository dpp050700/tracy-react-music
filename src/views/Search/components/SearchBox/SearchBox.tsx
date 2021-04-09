import React, { useRef, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from './SearchBox.module.css';
import * as actions from '../../store/actions';
import { debounce } from '../../../../utils/utils';

const { root, searchInputWrap, searchCancel, searchIcon, searchClear } = styled;

interface ISearchBox {
  keywords: string;
  showSuggest: boolean;
  inputChange: (keywords: string) => void;
  getSuggestList: (keywords: string) => void;
  changeShowSuggest: (isShow: boolean) => void;
}

const SearchBox: React.FC<ISearchBox> = (props: ISearchBox) => {
  const { keywords, showSuggest, inputChange, getSuggestList, changeShowSuggest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryDebounce = useMemo(() => {
    return debounce(getSuggestList, 500);
  }, [getSuggestList]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (keywords && showSuggest) {
      handleQueryDebounce(keywords);
    }
  }, [keywords, showSuggest]);

  const handlerClearClick = () => {
    inputChange('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={root}>
      <div className={searchInputWrap}>
        <div className={searchIcon}>
          <i className=" music-icon-search" />
        </div>
        <input
          type="text"
          value={keywords}
          ref={inputRef}
          onChange={e => {
            inputChange(e.currentTarget.value);
          }}
          onFocus={() => {
            changeShowSuggest(true);
          }}
        />
        {keywords ? (
          <div className={searchClear} onClick={handlerClearClick}>
            <i className=" music-icon-circle-close" />
          </div>
        ) : null}
      </div>
      <span className={searchCancel}>取消</span>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keywords: state.getIn(['search', 'keywords']),
  showSuggest: state.getIn(['search', 'showSuggest']),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    inputChange(keywords: string) {
      dispatch(actions.changeSearchKeywords(keywords));
    },
    getSuggestList(keywords: string) {
      dispatch(actions.getSuggestList(keywords));
    },
    changeShowSuggest(isShow: boolean) {
      dispatch(actions.changeShowSuggest(isShow));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
