const get = (
  url: string,
  cors: boolean = false,
  includeCred: boolean = false,
) => {
  return fetch(url, {
    method: 'GET',
    mode: cors ? 'cors' : 'no-cors',
    credentials: includeCred ? 'include' : 'omit',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
const post = (url: string, data: Object) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export { get, post };
