import { API_URL } from "./App";

const apiRequest = async (url = "", optionObj = {}, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) {
      throw new Error("Error when fetching at apiRequest line 9");
    }
  } catch (error: any) {
    return error.message;
  }
};
export default apiRequest;
