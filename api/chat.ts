import axios from "axios";
import queryString from "query-string";

const sendMessage = async (
  url: string,
  query: Record<string, any>,
  values: { content: string },
) => {
  const apiUrl = queryString.stringifyUrl({
    url,
    query,
  });
  await axios.post(apiUrl, values);
};

const chatApi = { sendMessage };

export default chatApi;
