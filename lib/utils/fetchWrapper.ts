const get = (url: string, token: string | undefined) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${token}`
    }
  });
};

const post = (url: string, token: string | undefined, data: Object) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
};

const _delete = (url: string, token: string, data: Object | undefined = undefined) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
};

export const fetchWrapper = { get, post, delete: _delete };
