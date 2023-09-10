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

const inviteServer = async (serverId: string | undefined) => {
  const response = await axios.patch(`/api/servers/${serverId}/invite-code`);
  return response.data;
};

const leaveServer = async (serverId: string | undefined) => {
  await axios.patch(`/api/servers/${serverId}/leave`);
};

const serverApi = { createServer, updateServer, inviteServer, leaveServer };
export default serverApi;
