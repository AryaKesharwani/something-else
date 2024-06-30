const getURI = () => {
  let uri = import.meta.env.VITE_APP_BASE_URL_LIVE
  return uri;
};

export default getURI;
