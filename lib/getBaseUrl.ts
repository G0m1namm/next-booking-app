export const getBaseUrl = (): string => {
  return `${process.env.NODE_ENV === 'development' ? 'http://' : 'https://'}${process.env.VERCEL_URL}`;
};

export const getApiUrl = () => {
  return `${getBaseUrl()}/api`;
};
