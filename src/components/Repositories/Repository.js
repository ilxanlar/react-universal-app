import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Name = styled(Link)`
  font-size: 18px;
  font-weight: bold;

  img {
    border-radius: 3px;
    height: 16px;
    margin-right: 5px;
    vertical-align: middle;
    width: 16px;
  }

  &:hover {
    color: indianred;
    text-decoration: underline;
  }
`;

const Description = styled.p`
  color: #777;
  font-size: 12px;
  margin: 5px 0 0 0;
`;

const Wrapper = styled.li`
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 20px;

  footer {
    margin-top: 5px;
    text-decoration: none;
  }
`;

export default ({ description, name, ownerAvatar, ownerLogin }) => (
  <Wrapper>
    <Name to={`/${ownerLogin}/${name}`}>
      <img src={ownerAvatar} alt={ownerLogin} />
      {ownerLogin}/{name}
    </Name>

    {description ? <Description>{description}</Description> : null}

    <footer>
      Author: <a>{ownerLogin}</a>
      &nbsp;|&nbsp;
      Issues
      &nbsp;|&nbsp;
      Contributors
    </footer>
  </Wrapper>
);
