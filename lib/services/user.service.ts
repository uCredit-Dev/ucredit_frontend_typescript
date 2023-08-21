import axios from 'axios';
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

const getPlan = (planId: string, token: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/plans/${planId}`, token)
    .then(handleResponse);
};

const getUser = (username: string, token: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/user?username=${username}`, token)
    .then((res) => handleResponse(res));
};

const requestReviewerPlan = (
  plan_id: string,
  reviewer_id: string,
  reviewee_id: string,
  token: string,
  cb = undefined,
) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/request`, token, {
      plan_id,
      reviewer_id,
      reviewee_id,
    })
    .then((res) => handleResponse(res, cb));
};

const removeReview = (review_id: string, token: string, cb = undefined) => {
  return fetchWrapper
    .delete(
      `${getAPI(window)}/planReview/removeReview?review_id=${review_id}`,
      token,
    )
    .then((res) => handleResponse(res, cb));
};

const confirmReviewerPlan = (
  review_id: string,
  token: string,
  cb = undefined,
) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/confirm`, token, {
      review_id,
    })
    .then((res) => handleResponse(res, cb));
};

const getReviewerPlans = (
  reviewer_id: string,
  token: string,
  cb = undefined,
) => {
  return fetchWrapper
    .get(
      `${getAPI(window)}/planReview/plansToReview?reviewer_id=${reviewer_id}`,
      token,
    )
    .then((res) => handleResponse(res, cb));
};

const getPlanReviewers = (plan_id: string, token: string, cb = undefined) => {
  return fetchWrapper
    .get(`${getAPI(window)}/planReview/getReviewers?plan_id=${plan_id}`, token)
    .then((res) => handleResponse(res, cb));
};

const postNewThread = (data: any, token: string) => {
  return fetchWrapper
    .post(`${getAPI(window)}/thread/new`, token, data)
    .then(handleResponse);
};

const getThreads = (
  id: string,
  token: string,
  unmounted: boolean,
  cancelToken,
) => {
  return axios
    .get(`${getAPI(window)}/thread/getByPlan/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cancelToken: cancelToken,
    })
    .then((res) => {
      if (!unmounted) return res;
    });
};

const postNewComment = (data: any, token: string, cb = undefined) => {
  return fetchWrapper
    .post(`${getAPI(window)}/thread/reply`, token, data)
    .then(handleResponse);
};

const removeComment = (comment_id: string, token: string, cb = undefined) => {
  return fetchWrapper
    .delete(`${getAPI(window)}/comment`, token, { comment_id })
    .then((res) => handleResponse(res, cb));
};

const editComment = (data: any, token: string, cb = undefined) => {
  return fetchWrapper
    .patch(`${getAPI(window)}/comment`, token, data)
    .then((res) => handleResponse(res, cb));
};

const changeReviewStatus = (
  review_id,
  status,
  token: string,
  cb = undefined,
) => {
  return fetchWrapper
    .post(`${getAPI(window)}/planReview/changeStatus`, token, {
      review_id,
      status,
    })
    .then((res) => handleResponse(res, cb));
};

const getNotifications = (userID: string, token: string) => {
  return fetchWrapper
    .get(`${getAPI(window)}/notifications/${userID}`, token)
    .then(handleResponse);
};

const handleResponse = (res, cb: any = undefined) => {
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
  removeComment,
  editComment,
  changeReviewStatus,
  getNotifications,
};
