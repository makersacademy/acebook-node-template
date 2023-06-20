export const postJson = async (url, method, data) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: " + response.statusText);
  }
};

export const postFormData = async (url, method, formData) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: " + response.statusText);
  }
};
