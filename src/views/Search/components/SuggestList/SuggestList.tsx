import React from 'react';
import { connect } from 'react-redux';

interface ISuggestList {
  list: any[];
}
const SuggestList: React.FC<ISuggestList> = (props: ISuggestList) => {
  const { list } = props;
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item.keyword}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: any) => ({
  list: state.getIn(['search', 'suggestList'])?.toJS() || [],
});

export default connect(mapStateToProps)(SuggestList);
