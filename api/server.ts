import axios from 'axios';

const createServer = async (values: { name: string; imageUrl: string }) => {
  await axios.post('/api/servers', values);
};

const updateServer = async (
  values: { name: string; imageUrl: string },
  serverId: string,
) => {
  await axios.patch(`/api/servers/${serverId}`, values);
};

const serverApi = { createServer, updateServer };
export default serverApi;
