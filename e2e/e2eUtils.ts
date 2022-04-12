import axios from 'axios';
import { API_URL, TEST_ID } from './e2eFixtures';

export const deleteUser = async () => {
  try {
    await axios.delete(`${API_URL}/api/user/${TEST_ID}`);
  } catch (e) {
    // Do nothing
  }
};

export const confirmPlanReview = async (reviewer_id) => {
  await axios.post(`${API_URL}/api/backdoor/planReview/confirm`, {
    reviewer_id,
  });
};
