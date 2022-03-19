import { getAPI } from '../resources/assets';
import { get, post } from '../utils';

/**
 * Attempts to log in user
 * @param cookieVal - value of stored login session hash
 * @returns a promises that resolves on success or failure in logging in
 */
const login = (cookieVal: string) => {
  return get(getAPI(window) + '/verifyLogin/' + cookieVal, true, true)
    .then((res) => res.json())
    .then((res) => res);
};

const getPlan = (planId: string) => {
  return get(getAPI(window) + '/plans/' + planId, true).then(handleResponse);
};

const getUser = (username: string) => {
  return get(`${getAPI(window)}/user?username=${username}`, true).then((res) =>
    handleResponse(res),
  );
};

const addPlan = (plan_id: string, reviewer_id: string, cb) => {
  return post(`${getAPI(window)}/planReview/request`, {
    plan_id,
    reviewer_id,
  }).then((res) => handleResponse(res, cb));
};

const handleResponse = (res, cb = undefined) => {
  return res.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!res.ok) {
      if (cb) cb(res.status);
      const error = (data && data.message) || res.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userService = { login, getPlan, getUser, addPlan };