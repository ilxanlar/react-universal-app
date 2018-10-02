import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Repository from './Repository';

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default class Repositories extends React.Component {
  static propTypes = {
    repositories: PropTypes.array
  };

  renderRepository = (repository, key) => (
    <Repository
      key={key}
      description={repository.description}
      ownerAvatar={repository.owner.avatar_url}
      ownerLogin={repository.owner.login}
      name={repository.name}
    />
  );

  render() {
    const { repositories } = this.props;

    return (
      <Wrapper>
        {repositories.map(this.renderRepository)}
      </Wrapper>
    );
  }
}
