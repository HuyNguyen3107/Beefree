export const getSessionServer = async (cookie) => {
  const response = await fetch(`${process.env.APP_HOST}/api/session`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });
  return response.json();
};

export const getSessionClient = async () => {
  const response = await fetch(`${process.env.APP_HOST}/api/session`);
  return response.json();
};

export const setSession = async (data, cookie = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(`${process.env.APP_HOST}/api/session`, {
    method: "POST",
    cache: "no-store",
    headers,
    body: JSON.stringify(data),
  });
  return response.json();
};
