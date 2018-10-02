const items = [];

export function register(maker) {
  items.push(maker);
}

export default function resolveInitialPromises() {
  return Promise.all(items.map(item => item())).catch(() => Promise.resolve());
}
