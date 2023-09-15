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

const editMessage = async (
  socketUrl: string,
  id: string,
  socketQuery: Record<string, string>,
  values: { content: string },
) => {
  const apiUrl = queryString.stringifyUrl({
    url: `${socketUrl}/${id}`,
    query: socketQuery,
  });

  await axios.patch(apiUrl, values);
};

const chatApi = { sendMessage, sendFile, editMessage };

export default chatApi;
