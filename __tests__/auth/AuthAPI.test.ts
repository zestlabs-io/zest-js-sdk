import { AuthAPI } from '../../src/auth/AuthAPI';


test('Create and Delete user', async () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  const baseUrl = 'https://dev.zestlabs.cloud';

  const api = new AuthAPI(baseUrl, cloudKey, cloudSecret);
  const userCreateResponse = await api.createUser('Test', 'User', 'contact@zestlabs.io');
  const resDel = await api.deleteUser(userCreateResponse.userID);
  expect(resDel.statusCode).toBe(200);
});