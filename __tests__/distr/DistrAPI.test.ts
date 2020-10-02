import { DistrConfigServiceApiHMAC } from '../../src/API';
import { DistrconfigPoolType } from '../../src/openapi';

const baseUrl = 'https://dev.zestlabs.cloud';

var distrAPI: DistrConfigServiceApiHMAC;

beforeAll(() => {
  return initAPIs();
});

const initAPIs = () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  distrAPI = new DistrConfigServiceApiHMAC(baseUrl, cloudKey, cloudSecret);
}

test('Create and Pool user', async () => {
  const poolId = 'test_pool_1';

  const poolCreateResp = await distrAPI.createPool({
    id: poolId,
    poolType: DistrconfigPoolType.GLOBAL,
    pkExtractExpression: '$.pk',
    tagExtractExpression: '$.locality'
  });
  expect(poolCreateResp.status).toBe(200);
  // console.log('pool created', poolId);
  const resDel = await distrAPI.deletePool(poolId);
  expect(resDel.status).toBe(200);
});

test('List users', () => {
  const poolId = 'test_pool_1';
  expect(async () => {
    const mobileUsers = await distrAPI.getUsers();
  }).not.toThrowError()
});

