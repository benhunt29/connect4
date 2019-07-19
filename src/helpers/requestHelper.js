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
  const defaultOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  const response = await fetch(url, { ...defaultOptions, ...options });
  // const json = await response.json();
  // console.log(json);
  if (!response.ok) {
    console.log(response);
    if (response.statusText) {
      throw new Error(response.statusText);
    } else {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }
  } else {
    return response.json();
  }
};
