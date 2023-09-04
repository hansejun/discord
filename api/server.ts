import axios from 'axios';

const createServer = async (values: { name: string; imageUrl: string }) => {
  await axios.post('/api/servers', values);
};

const serverApi = { createServer };
export default serverApi;
