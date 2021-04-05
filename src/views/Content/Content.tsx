import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Content: React.FC = (props: any) => {
  const { getLoginStatu, route } = props;
  useEffect(() => {
    getLoginStatu();
  }, []);
  return <>{renderRoutes(route.routes)}</>;
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getLoginStatu() {
      dispatch(actions.getLoginStatu());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
