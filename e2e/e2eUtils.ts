import axios from 'axios';
import { API_URL, TEST_ID } from './e2eFixtures';

export const deleteUser = async () => {
  try {
    await axios.delete(`${API_URL}/api/user/${TEST_ID}`);
  } catch (e) {
    // Do nothing
  }
};
