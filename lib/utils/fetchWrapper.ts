const get = (
  url: string,
  cors: boolean = false,
  includeCred: boolean = false,
) => {
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
  // .then((res) => res.text())
  // .then((text) => {
  //   JSON.parse(text);
  // });}
};

export { get, post };
