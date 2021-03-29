import React from 'react';
import { connect } from 'react-redux';
import styled from './MessageNumber.module.css';

interface IMessageNumber {
  count: number;
}
const MessageNumber: React.FC<IMessageNumber> = (props: IMessageNumber) => {
  const { count } = props;
  return count ? <span className={styled.root}>{count > 99 ? '99+' : count}</span> : null;
};

const mapStateToProps = (state: any) => {
  return {
    count: state.getIn(['user', 'messageNumber']),
  };
};
export default connect(mapStateToProps)(MessageNumber);
