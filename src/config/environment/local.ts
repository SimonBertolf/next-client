// export env variables or defaults
export const local = {
  // detect if app is opened from pupeteer in container
  API_BASE_URL:
    navigator.platform.includes('Linux') && navigator.appVersion.includes('HeadlessChrome')
      ? 'http://api:5000'
      : 'http://localhost:5010',
};
