import React from 'react';
import styled from './SerachList.module.css';

const { root, title, searchList, searchItem, searchEmpty } = styled;

export interface ISearchItem {
  label: string;
}

export interface ISearchList {
  label: string;
  list: ISearchItem[];
}

const SerachList: React.FC<ISearchList> = (props: ISearchList) => {
  const { label, list } = props;
  return (
    <div className={root}>
      <h1 className={title}>
        {label}
        <i className="iconfont icon-shanchu" />
      </h1>
      {list.length ? (
        <ul className={searchList}>
          {list.map((item, index) => (
            <li className={searchItem} key={index}>
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

export default SerachList;
