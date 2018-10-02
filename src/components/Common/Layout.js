import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { to } from 'app/helpers/url';

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  margin: 200px auto;
  max-width: 640px;

  > header {
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    padding: 20px 30px;
    position: sticky;
    top: 0;
  }

  > section {
    padding: 20px 30px;
  }
`;

const Layout = ({ children, authenticated, displayName, ...props }) => (
  <Wrapper {...props}>
    <header>
      <nav>
        <Link to={to('home')}>Home</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to={to('profile')}>Profile</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to={to('about')}>About</Link>
        {authenticated && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
        {authenticated && <span>Hi {displayName}!</span>}
      </nav>
    </header>

    <section>
      {children}
    </section>
  </Wrapper>
);

export default connect(
  state => ({
    authenticated: state.auth.authenticated,
    displayName: state.auth.data.displayName
  })
)(Layout);
