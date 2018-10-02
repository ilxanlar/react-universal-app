import React from 'react';
import Layout from 'components/Common/Layout';

export default class NotFound extends React.PureComponent {
  render() {
    return (
      <Layout>
        <h1>404</h1>

        <h3>The page you are looking for is missing!</h3>
      </Layout>
    );
  }
}
