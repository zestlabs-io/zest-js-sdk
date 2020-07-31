import { AuthAPI } from '../../src/auth/AuthAPI';

const baseUrl = 'https://dev.zestlabs.cloud';
var authAPI: AuthAPI

beforeAll(() => {
  return initAPIs();
});

const initAPIs = () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  authAPI = new AuthAPI(baseUrl, cloudKey, cloudSecret);
}


test('Create and Delete user', async () => {
  const userCreateResponse = await authAPI.createUser('Test', 'User', 'contact@zestlabs.io');
  console.log('user created', userCreateResponse.userID);
  const accessKeyCreateReq = await authAPI.createAccessKey(userCreateResponse.userID);
  console.log('created access key', accessKeyCreateReq.accessKeyID, accessKeyCreateReq.accessSecret);
  const resDel = await authAPI.deleteUser(userCreateResponse.userID);
  expect(resDel.statusCode).toBe(200);
});