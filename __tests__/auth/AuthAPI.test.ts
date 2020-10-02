import { AuthServiceApiHMAC } from '../../src/API';

const baseUrl = 'https://dev.zestlabs.cloud';
var authAPI: AuthServiceApiHMAC

beforeAll(() => {
  return initAPIs();
});

const initAPIs = () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  authAPI = new AuthServiceApiHMAC(baseUrl, cloudKey, cloudSecret);
}


test('Create and Delete user', async () => {
  try {
    const userCreateResponse = await authAPI.createUser({ firstName: 'Test', lastName: 'User', email: 'test@zestlabs.io' });
    console.log('user created', userCreateResponse.data.userID);
    const accessKeyCreateReq = await authAPI.createAccessKey({ userID: userCreateResponse.data.userID });

    const user = await authAPI.getUserIDByEmail('test@zestlabs.io')
    expect(user.data.userID).toBe(userCreateResponse.data.userID)

    console.log('created access key', accessKeyCreateReq.data.accessKeyID, accessKeyCreateReq.data.accessSecret);
    if (userCreateResponse.data.userID) {
      const resDel = await authAPI.deleteUser(userCreateResponse.data.userID);
      expect(resDel.status).toBe(200);
    }
  } catch (err) {
    console.error(err);
  }
});