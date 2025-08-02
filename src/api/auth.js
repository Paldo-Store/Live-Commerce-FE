import axios from 'axios';

const BASE_URL = 'http://localhost:19091/api/v1/auth';

export const signup = async (signupData) => {
  // 백엔드 통신 필요
  return await axios.post(`${BASE_URL}/signup`, signupData);
};

export const signin = async (signinData) => {
  // 백엔드 통신 필요
  return await axios.post(`${BASE_URL}/signin`, signinData);
};