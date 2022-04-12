import axios from 'axios';
import { API_URL } from './e2eFixtures';

export const deleteUser = async (user_id) => {
  try {
    await axios.delete(`${API_URL}/api/user/${user_id}`);
  } catch (e) {
    // Do nothing
  }
};

export const confirmPlanReview = async (reviewer_id) => {
  await axios.post(`${API_URL}/api/backdoor/planReview/confirm`, {
    reviewer_id,
  });
};
