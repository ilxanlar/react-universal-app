import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'components/Common/Helmet';
import Layout from 'components/Common/Layout';
import Repositories from 'components/Repositories/Repositories';

class Home extends React.Component {
  static propTypes = {
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    repositories: PropTypes.array
  };

  render() {
    const { loaded, loading, repositories } = this.props;

    return (
      <Layout>
        <Helmet title="Public Repos" />
        <h1>Public repositories</h1>
        {loaded && <Repositories repositories={repositories} />}
        {loading && 'Please wait...'}
      </Layout>
    );
  }
}

export default connect(state => ({
  loaded: state.repositories.loaded,
  loading: state.repositories.loading,
  repositories: state.repositories.response
}))(Home);
