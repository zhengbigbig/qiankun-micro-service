import request from 'umi-request';

const userApi = {
  login: async (params: any) => {
    return request('/api/login', {
      method: 'POST',
      data: params,
    });
  },
  createUser: async (params: any) => {
    return request('/api/user', {
      method: 'POST',
      data: params,
    });
  }
};

export default userApi;
