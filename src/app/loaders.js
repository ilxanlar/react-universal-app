const loaders = [];

export function register(route, items) {
  loaders[route] = items;
}

export default loaders;
