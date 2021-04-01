import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styled from './SuggestList.module.css';
import * as actions from '../../store/actions';

const { root, searchIcon, searchLabel } = styled;
interface ISuggestList {
  list: any[];
  getSearchValue: (keywords: string) => void;
}
const SuggestList: React.FC<ISuggestList> = (props: ISuggestList) => {
  const { list, getSearchValue } = props;
  const iconClass = classnames('iconfont icon-sousuo', searchIcon);
  const labelClass = classnames('border-bottom', searchLabel);
  return (
    <ul className={root}>
      {list.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            getSearchValue(item.keyword);
          }}
        >
          <i className={iconClass} />
          <span className={labelClass}>{item.keyword}</span>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: any) => ({
  list: state.getIn(['search', 'suggestList'])?.toJS() || [],
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchValue(keywords: string) {
      dispatch(actions.getSearchValue(keywords));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestList);
