import React from 'react';
import { connect } from 'react-redux';
import styled from './SerachList.module.css';
import * as actions from '../../store/actions';

const { root, title, searchList, searchItem, searchEmpty } = styled;

export interface ISearchItem {
  label: string;
}

export interface ISearchList {
  label: string;
  list: ISearchItem[];
  getSearchValue: (keywords: string) => void;
  iconClick?: () => void;
}

const SerachList: React.FC<ISearchList> = (props: ISearchList) => {
  const { label, list, getSearchValue, iconClick } = props;
  return (
    <div className={root}>
      <h1 className={title}>
        {label}
        <i className="iconfont icon-shanchu" onClick={iconClick} />
      </h1>
      {list.length ? (
        <ul className={searchList}>
          {list.map((item, index) => (
            <li
              className={searchItem}
              key={index}
              onClick={() => {
                getSearchValue(item.label);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      ) : (
        <div className={searchEmpty}>暂无搜索记录</div>
      )}
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchValue(keywords: string) {
      dispatch(actions.getSearchValue(keywords));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SerachList);
