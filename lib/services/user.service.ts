import getConfig from 'next/config';
import { fetchWrapper } from '../utils';

const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

/**
 * Attempts to log in user
 * @param cookieVal - value of stored login session hash
 * @returns a promises that resolves on success or failure in logging in
 */
const login = (cookieVal: string) => {
  return fetchWrapper
    .get(`${apiUrl}/verifyLogin/${cookieVal}`)
    .then((res) => res.json())
    .then((res) => res);
};

const getPlan = (planId: string) => {
  return fetchWrapper.get(`${apiUrl}/plans/${planId}`).then(handleResponse);
};

const getUser = (username: string) => {
  return fetchWrapper
    .get(`${apiUrl}/user?username=${username}`)
    .then((res) => handleResponse(res));
};

const requestReviewerPlan = (
  plan_id: string,
  reviewer_id: string,
  reviewee_id: string,
  cb = undefined,
) => {
  return fetchWrapper
    .post(`${apiUrl}/planReview/request`, {
      plan_id,
      reviewer_id,
      reviewee_id,
    })
    .then((res) => handleResponse(res, cb));
};

const removeReview = (review_id: string, cb = undefined) => {
  return fetchWrapper
    .delete(`${apiUrl}/planReview/removeReview?review_id=${review_id}`)
    .then((res) => handleResponse(res, cb));
};

const confirmReviewerPlan = (review_id: string, cb = undefined) => {
  return fetchWrapper
    .post(`${apiUrl}/planReview/confirm`, {
      review_id,
    })
    .then((res) => handleResponse(res, cb));
};

const getReviewerPlans = (reviewer_id: string, cb = undefined) => {
  return fetchWrapper
    .get(`${apiUrl}/planReview/plansToReview?reviewer_id=${reviewer_id}`)
    .then((res) => handleResponse(res, cb));
};

const getPlanReviewers = (plan_id: string, cb = undefined) => {
  return fetchWrapper
    .get(`${apiUrl}/planReview/getReviewers?plan_id=${plan_id}`)
    .then((res) => handleResponse(res, cb));
};

const handleResponse = (res, cb = undefined) => {
  return res.text().then((text) => {
    const data = text && JSON.parse(text);

    if (cb) cb(res.status);
    if (!res.ok) {
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
  getPlanReviewers,
};
