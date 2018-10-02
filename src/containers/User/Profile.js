import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from 'components/Common/Layout';

class Profile extends React.PureComponent {
  static propTypes = {
    userDisplayName: PropTypes.string
  };

  render() {
    const { userDisplayName } = this.props;

    return (
      <Layout>
        <p>
          Hi <strong>{userDisplayName}</strong>, this is your profile page!
        </p>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    userDisplayName: state.auth.data.displayName
  })
)(Profile);
