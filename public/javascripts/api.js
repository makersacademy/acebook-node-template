export const fetchData = async (url, method, body, headers) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    body,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: " + response.statusText);
  }
};

export const postJson = (url, method, data) =>
  fetchData(url, method, JSON.stringify(data), {
    "Content-Type": "application/json",
  });

export const postFormData = (url, method, formData) =>
  fetchData(url, method, formData);
