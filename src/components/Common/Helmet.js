import React from 'react';
import Helmet from 'react-helmet';
import { site } from 'config/constants';

const titleTemplate = `%s ${site.titleSeparator} ${site.title}`;

export const RootHelmet = ({ children }) => (
  <Helmet title={site.title}>
    {children}
  </Helmet>
);

export default ({ children, ...props }) => (
  <Helmet titleTemplate={titleTemplate} {...props}>
    {children}
  </Helmet>
);
