import React from 'react';
import { connect } from 'react-redux';
import Unauthorized from 'components/Common/Unauthorized';

export default function guardRoute() {
  return function (Component) {
    class GuardedRoute extends React.PureComponent {
      render() {
        const { authenticated, ...rest } = this.props;

        if (authenticated) {
          return <Component {...rest} />;
        }

        return <Unauthorized />;
      }
    }

    return connect(
      state => ({
        authenticated: state.auth.authenticated
      })
    )(GuardedRoute);
  }
}
