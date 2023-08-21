const get = (url: string, token?: string | undefined) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const post = (url: string, token: string | undefined, data: Object) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

<<<<<<< HEAD
=======
/*
  Update a comment
*/
const patch = (
  url: string,
  token: string,
  data: { comment_id: string; message: string },
) => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

>>>>>>> 9704b3ec (fixed prettier and eslint issues part 3)
const _delete = (
  url: string,
  token: string,
  data: Object | undefined = undefined,
) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

<<<<<<< HEAD
export const fetchWrapper = { get, post, delete: _delete };
=======
export const fetchWrapper = { get, post, patch, delete: _delete };
>>>>>>> 9704b3ec (fixed prettier and eslint issues part 3)
