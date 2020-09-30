import axios from "axios";

export const fetchAccount = async (username: string): Promise<any> => {
  let response;
  try {
    response = await axios.get(`https://instagram.com/${username}/?__a=1`);
    response = response.data.graphql.user;
    response.ok = true;
  } catch (error) {
    return error;
  }

  return response;
};
