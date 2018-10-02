import React from 'react';
import Loadable from 'react-loadable';
import { asyncConnect } from 'redux-connect';
import { Redirect } from 'react-router';
import Loading from 'components/Common/Loading';
import Wrapper from 'components/Common/Wrapper';
import allLoaders from './loaders';
import guard from './helpers/guardRoute';

export const routes = [];

export function register(path, container, name) {
  const route = {
    container,
    name,
    path
  };

  routes.push(route);

  const routeObject = {};

  routeObject.guard = (status = true) => {
    route.guarded = status;
    return routeObject;
  };

  return routeObject;
}

register.redirect = function (path, redirectTo) {
  routes.push({ path, redirectTo });
};

function makeContainer({ container: component, guarded, name, path, redirectTo } = {}) {
  if (redirectTo) {
    return () => <Redirect from={path} to={redirectTo} />;
  }

  const loaders = allLoaders[name] || [];

  const Chunk = Loadable({
    loader: () => import(`../containers/${component}`),
    loading: Loading,
    modules: [component]
  });

  let Component = props => (
    <Wrapper>
      <Chunk {...props} />
    </Wrapper>
  );

  Component.displayName = `${component}Chunk`;

  if (guarded) {
    Component = guard()(Component);
    Component.displayName = `${component}Guarded`;
  }

  // @TODO: Add redux-connect promise support
  const finalAsyncItems = [];

  if (loaders && loaders.length) {
    loaders.forEach(loader => {
      finalAsyncItems.push({
        promise: loader
      });
    });
  }

  if (finalAsyncItems.length > 0) {
    Component = asyncConnect(finalAsyncItems)(Component);
    Component.displayName = `${component}AsyncConnected`;
  }

  return Component;
}

export function walkRoutes(items) {
  return items.map(item => ({
    component: makeContainer(item),
    exact: typeof item.exact !== 'undefined' ? item.exact : true,
    path: item.path,
    routes: item.routes ? walkRoutes(item.routes) : []
  }));
}

export default function getRoutes() {
  return walkRoutes([
    ...routes,
    {
      container: 'NotFound',
      name: 'notFound',
      path: '*'
    }
  ]);
}
