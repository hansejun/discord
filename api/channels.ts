import axios from "axios";
import qs from "query-string";

const createChannel = async (
  serverId: string | undefined,
  values: { name: string; type: string },
) => {
  const url = qs.stringifyUrl({
    url: `/api/channels`,
    query: {
      serverId,
    },
  });

  await axios.post(url, values);
};

const editChannel = async (
  serverId: string,
  channelId: string,
  values: { name: string; type: string },
) => {
  const url = qs.stringifyUrl({
    url: `/api/channels/${channelId}`,
    query: {
      serverId,
    },
  });
  await axios.patch(url, values);
};

const removeChannel = async (serverId: string, channelId: string) => {
  const url = qs.stringifyUrl({
    url: `/api/channels/${channelId}`,
    query: {
      serverId,
    },
  });
  await axios.delete(url);
};

const channelApi = { createChannel, removeChannel, editChannel };

export default channelApi;
