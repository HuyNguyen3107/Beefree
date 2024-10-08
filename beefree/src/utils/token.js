export const getToken = async (cookie) => {
  const response = await fetch(`${process.env.APP_HOST}/api/token`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });
  return response.json();
};

export const getTokenClient = async () => {
  const response = await fetch(`${process.env.APP_HOST}/api/token`);
  return response.json();
};

export const setToken = async (data, cookie = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(`${process.env.APP_HOST}/api/token`, {
    method: "POST",
    cache: "no-store",
    headers,
    body: JSON.stringify(data),
  });
  return response.json();
};
