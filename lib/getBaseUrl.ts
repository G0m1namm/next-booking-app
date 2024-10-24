export const getBaseUrl = (): string => {
  return `${process.env.NODE_ENV === 'development' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
};

export const getApiUrl = () => {
  return `${getBaseUrl()}/api`;
};
