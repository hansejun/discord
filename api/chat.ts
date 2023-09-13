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

const sendFile = async (
  url: string,
  query: Record<string, any>,
  values: { fileUrl: string },
) => {
  const apiUrl = queryString.stringifyUrl({
    url,
    query,
  });

  await axios.post(apiUrl, { ...values, content: values.fileUrl });
};

const chatApi = { sendMessage, sendFile };

export default chatApi;
