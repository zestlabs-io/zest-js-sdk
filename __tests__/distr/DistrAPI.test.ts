import { DistrAPI } from '../../src/distr/DistrAPI';

const baseUrl = 'https://dev.zestlabs.cloud';

var distrAPI: DistrAPI;

beforeAll(() => {
  return initAPIs();
});

const initAPIs = () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  distrAPI = new DistrAPI(baseUrl, cloudKey, cloudSecret);
}

test('Create and Pool user', async () => {
  const poolId = 'test_pool_1';

  const poolCreateResp = await distrAPI.createPool(poolId, 'GLOBAL', '$.pk', '$.locality', '', '');
  expect(poolCreateResp.statusCode).toBe(200);
  console.log('pool created', poolId);
  const resDel = await distrAPI.deletePool(poolId);
  expect(resDel.statusCode).toBe(200);
});

test('List users', () => {
  const poolId = 'test_pool_1';
  expect(async () => {
    const mobileUsers = await distrAPI.getUsers();
  }).not.toThrowError()
});

