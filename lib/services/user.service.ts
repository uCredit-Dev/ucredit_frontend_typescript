import getConfig from 'next/config';
import { get } from '../utils';

const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

/**
 * Attempts to log in user
 * @param cookieVal - value of stored login session hash
 * @returns a promises that resolves on success or failure in logging in
 */
const login = (cookieVal: string) => {
  return get(apiUrl + '/verifyLogin/' + cookieVal, true, true)
    .then((resp) => resp.json())
    .then((resp) => resp);
};

export const userService = { login };
