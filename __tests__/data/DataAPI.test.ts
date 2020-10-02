import { DistrConfigServiceApiHMAC } from '../../src/API';
import { PoolDataServiceApiHMAC } from '../../src/API';
import { DistrconfigPoolType } from '../../src/openapi';

beforeAll(async (done) => {
  const cloudKey = process.env.ZEST_KEY || '';
  const cloudSecret = process.env.ZEST_SECRET || '';

  distrAPI = new DistrConfigServiceApiHMAC(baseUrl, cloudKey, cloudSecret);
  dataAPI = new PoolDataServiceApiHMAC(baseUrl, cloudKey, cloudSecret);


  const poolCreateResp = await distrAPI.createPool({
    id: poolId,
    poolType: DistrconfigPoolType.GLOBAL,
    pkExtractExpression: '$.pk',
    tagExtractExpression: '$.locality',
  });
  expect(poolCreateResp.status).toBe(200);
  done()
});

afterAll(async (done) => {
  const resDel = await distrAPI.deletePool(poolId);
  expect(resDel.status).toBe(200);
  done();
});

const poolId = 'test_pool_data_1';
const baseUrl = 'https://dev.zestlabs.cloud';
var distrAPI: DistrConfigServiceApiHMAC
var dataAPI: PoolDataServiceApiHMAC

test('Create/Update few records', async () => {
  const createResp = await dataAPI.bulkCreate(poolId,
    [{ pk: 'customer1', locality: 'loc1' } as any,
    { pk: 'customer2', locality: 'loc1' } as any,
    { pk: 'customer3', locality: 'loc2' } as any]);
  expect(createResp.status).toBe(200);

  const readCust1 = await dataAPI.get(poolId, 'customer1');
  expect(readCust1.status).toBe(200);
  // console.log('Got customer', readCust1.body);
  const cust1 = readCust1.data as any;
  expect(cust1.locality).toBe('loc1')

  const updateResp = await dataAPI.bulkUpdate(poolId,
    [{ pk: 'customer1', locality: 'loc2' } as any,
    { pk: 'customer2', locality: 'loc2' } as any,
    { pk: 'customer3', locality: 'loc1' } as any]);
  expect(updateResp.status).toBe(200);

  const listResp = await dataAPI.list(poolId, 10, 0);
  expect(updateResp.status).toBe(200);
  // const list = listResp.data;
  // if (list.rows)
  //   expect(list.rows.length).toBe(3);
  // else
  //   fail(new Error(JSON.stringify(list)))
});