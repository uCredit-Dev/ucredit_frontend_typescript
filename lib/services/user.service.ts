import getConfig from 'next/config';
import { get, post } from '../utils';

const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

/**
 * Attempts to log in user
 * @param cookieVal - value of stored login session hash
 * @returns a promises that resolves on success or failure in logging in
 */
const login = (cookieVal: string) => {
  return get(apiUrl + '/verifyLogin/' + cookieVal, true, true)
    .then((res) => res.json())
    .then((res) => res);
};

const getPlan = (planId: string) => {
  return get(apiUrl + '/plans/' + planId, true).then(handleResponse);
};

const getUser = (username: string) => {
  return get(`${apiUrl}/user?username=${username}`, true).then((res) =>
    handleResponse(res),
  );
};

const requestReviewerPlan = (
  plan_id: string,
  reviewer_id: string,
  reviewee_id: string,
  cb = undefined,
) => {
  return post(`${apiUrl}/planReview/request`, {
    plan_id,
    reviewer_id,
    reviewee_id,
  }).then((res) => handleResponse(res, cb));
};

const removeReview = (review_id: string, cb = undefined) => {
  return post(`${apiUrl}/planReview/removeReview`, {
    review_id,
  }).then((res) => handleResponse(res, cb));
};

const confirmReviewerPlan = (review_id: string, cb = undefined) => {
  return post(`${apiUrl}/planReview/confirm`, {
    review_id,
  }).then((res) => handleResponse(res, cb));
};

const getReviewerPlans = (reviewer_id: string, cb = undefined) => {
  return get(
    `${apiUrl}/planReview/plansToReview?reviewer_id=${reviewer_id}`,
  ).then((res) => handleResponse(res, cb));
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

export const userService = {
  login,
  getPlan,
  getUser,
  requestReviewerPlan,
  confirmReviewerPlan,
  removeReview,
  getReviewerPlans,
};
