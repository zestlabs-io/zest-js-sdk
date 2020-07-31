import { DistrAPI } from '../../src/distr/DistrAPI';


test('Create and Pool user', async () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';
  const baseUrl = 'https://dev.zestlabs.cloud';

  const poolId = 'test_pool_1';

  const api = new DistrAPI(baseUrl, cloudKey, cloudSecret);
  const poolCreateResp = await api.createPool(poolId, 'GLOBAL', '$.pk', '$.locality', '', '');
  expect(poolCreateResp.statusCode).toBe(200);
  console.log('pool created', poolId);
  const resDel = await api.deletePool(poolId);
  expect(resDel.statusCode).toBe(200);
});