import qs from 'qs';
import { routes } from 'app/routes';

export function to(name, ...args) {
  const route = routes.find(route => route.name && route.name === name);

  if (!route) {
    return '/';
  }

  const parts = route.path.split('/').filter(part => part);
  const params = [...args];
  const segments = [];

  let j = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].charAt(0) === ':') {
      const param = params[j];
      segments.push(typeof param !== 'undefined' ? param : parts[i]);
      j++;
    } else {
      segments.push(parts[i]);
    }
  }

  let queryString = params.length > j ? params.pop() : undefined;
  if (queryString && typeof queryString !== 'string') {
    queryString = qs.stringify(queryString);
  }

  let url = `/${segments.join('/')}`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }

  return url;
}
