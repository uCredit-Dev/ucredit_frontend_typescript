import { getAPI } from '../resources/assets';
import { fetchWrapper } from '../utils';

/**
 * Attempts to log in user
 * @param cookieVal - value of stored login session hash
 * @returns a promises that resolves on success or failure in logging in
 */
const login = (cookieVal: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/verifyLogin/${cookieVal}`)
    .then((res) => res.json())
    .then((res) => res);
};

const getPlan = (planId: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/plans/${planId}`)
    .then(handleResponse);
};

const getUser = (username: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/user?username=${username}`)
    .then((res) => handleResponse(res));
};

const requestReviewerPlan = (
  plan_id: string,
  reviewer_id: string,
  reviewee_id: string,
  cb = undefined,
) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/request`, {
      plan_id,
      reviewer_id,
      reviewee_id,
    })
    .then((res) => handleResponse(res, cb));
};

const removeReview = (review_id: string, cb = undefined) => {
  return fetchWrapper
    .delete(`${getAPI(window)}/planReview/removeReview?review_id=${review_id}`)
    .then((res) => handleResponse(res, cb));
};

const confirmReviewerPlan = (review_id: string, cb = undefined) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/confirm`, {
      review_id,
    })
    .then((res) => handleResponse(res, cb));
};

const getReviewerPlans = (reviewer_id: string, cb = undefined) => {
  return fetchWrapper
    .get(
      `${getAPI(window)}/planReview/plansToReview?reviewer_id=${reviewer_id}`,
    )
    .then((res) => handleResponse(res, cb));
};

const getPlanReviewers = (plan_id: string, cb = undefined) => {
  return fetchWrapper
    .get(`${getAPI(window)}/planReview/getReviewers?plan_id=${plan_id}`)
    .then((res) => handleResponse(res, cb));
};

const postNewThread = (data: any) => {
  return fetchWrapper
    .post(`${getAPI(window)}/thread/new`, data)
    .then(handleResponse);
};

const getThreads = (id: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/thread/getByPlan/${id}`)
    .then(handleResponse);
};

const postNewComment = (data: any, cb = undefined) => {
  return fetchWrapper
    .post(`${getAPI(window)}/thread/reply`, data)
    .then(handleResponse);
};
const changeReviewStatus = (review_id, status, cb = undefined) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/changeStatus`, {
      review_id,
      status,
    })
    .then((res) => handleResponse(res, cb));
};

const handleResponse = (res, cb = undefined) => {
  if (!res) return;
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
  postNewThread,
  getThreads,
  postNewComment,
  changeReviewStatus,
};
