import axios from 'axios';
import qs from 'query-string';

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

const channelApi = { createChannel };

export default channelApi;
