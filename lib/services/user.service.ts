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
  return get(apiUrl + '/retrieveUser/' + cookieVal).then((resp) => resp.json());
};

export const userService = { login };
