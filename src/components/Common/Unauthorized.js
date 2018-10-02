import React from 'react';
import Layout from 'components/Common/Layout';

class Unauthorized extends React.PureComponent {
  render() {
    return (
      <Layout>
        <h1>Unauthorized area</h1>
        <p>You do not have permission to view this page!</p>
      </Layout>
    );
  }
}

export default Unauthorized;
