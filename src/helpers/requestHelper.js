export const formatUrl = (url, params) => {
  const queryStringArray = Object.entries(params).reduce(
    (acc, [key, val]) => {
      acc.push(key);
      acc.push("=");
      acc.push(JSON.stringify(val));
      return acc;
    },
    ["?"]
  );
  const queryString =
    queryStringArray.length > 1 ? queryStringArray.join("") : "";
  return `${url}${encodeURI(queryString)}`;
};

export const makeRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request rejected with status ${response.status}`);
  } else {
    return response.json();
  }
};
