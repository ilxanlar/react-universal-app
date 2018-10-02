import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #ccc;
`;

export default class Loading extends React.PureComponent {
  render() {
    return <Wrapper>
      Please wait...
    </Wrapper>;
  }
}
