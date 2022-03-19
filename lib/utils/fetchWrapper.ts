const get = (url: string) => {
  return fetch(url, {
    method: 'GET',
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

const _delete = (url: string) => {
  return fetch(url, {
    method: 'DELETE',
  });
};

export const fetchWrapper = { get, post, delete: _delete };
