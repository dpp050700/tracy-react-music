import React from 'react';
import Toast from '../../base/Toast/toast';

function Singer() {
  const test = () => {
    Toast.info({});
  };
  return <div onClick={test}>Singer</div>;
}

export default Singer;
