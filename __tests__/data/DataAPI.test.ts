import { DistrAPI } from '../../src/distr/DistrAPI';
import { DataAPI } from '../../src/data/DataAPI';

beforeAll(() => {
  return initializePools();
});

afterAll(() => {
  return clearPools();
});

const poolId = 'test_pool_data_1';
const baseUrl = 'https://dev.zestlabs.cloud';
var distrAPI: DistrAPI
var dataAPI: DataAPI

const initializePools = async () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';

  distrAPI = new DistrAPI(baseUrl, cloudKey, cloudSecret);
  dataAPI = new DataAPI(baseUrl, cloudKey, cloudSecret);


  const api = new DistrAPI(baseUrl, cloudKey, cloudSecret);
  const poolCreateResp = await api.createPool(poolId, 'GLOBAL', '$.pk', '$.locality', '', '');
  expect(poolCreateResp.statusCode).toBe(200);
}

const clearPools = async () => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';

  const resDel = await distrAPI.deletePool(poolId);
  expect(resDel.statusCode).toBe(200);
}


test('Create/Update few records', async () => {
  const createResp = await dataAPI.create(poolId,
    [{ pk: 'customer1', locality: 'loc1' },
    { pk: 'customer2', locality: 'loc1' },
    { pk: 'customer3', locality: 'loc2' }]);
  expect(createResp.statusCode).toBe(200);

  const updateResp = await dataAPI.update(poolId,
    [{ pk: 'customer1', locality: 'loc2' },
    { pk: 'customer2', locality: 'loc2' },
    { pk: 'customer3', locality: 'loc1' }]);
  expect(updateResp.statusCode).toBe(200);
});