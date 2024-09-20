export const client = {
  serverApi: process.env.SERVER_API,
  token: null,
  setToken: function (token) {
    this.token = token;
  },
  send: async function (url, method = "GET", body = null) {
    url = `${this.serverApi}${url}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      //   headers["X-Api-Key"] = `${this.token}`;
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    return { response, data };
  },

  //http get
  get: function (url) {
    return this.send(url);
  },
  //http post
  post: function (url, body) {
    return this.send(url, "POST", body);
  },
  //http put
  put: function (url, body) {
    return this.send(url, "PUT", body);
  },
  //http patch
  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },
  //http delete
  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
