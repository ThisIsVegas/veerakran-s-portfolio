const configuredBase = import.meta.env.BASE_URL;

export const basePath = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

export const withBase = (path = '') => `${basePath}${path.replace(/^\/+/, '')}`;

export const withoutBase = (pathname: string) => {
  const prefix = basePath === '/' ? '' : basePath.slice(0, -1);
  const relativePath = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  if (!relativePath || relativePath === '/') {
    return '/';
  }

  return relativePath.replace(/\/+$/, '');
};
