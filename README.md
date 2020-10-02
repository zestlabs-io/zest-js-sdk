# Zest Cloud API JS/TS SDK

## Usage

```console
npm i @zestlabs-io/zest-js-sdk
```

set as environment variable your key and secret for Zest Cloud 

```console
export ZEST_KEY=HereComesYourKey ZEST_SECRET=HereCoresYourSecret
```

### Creating user

```ts
import { AuthServiceApiHMAC } from '@zestlabs-io/zest-js-sdk';
// Fetch the key and secret from env
const cloudKey = process.env.ZEST_KEY || '';
const cloudSecret = process.env.ZEST_SECRET || '';
// This is the base url for ZEST Cloud
const baseUrl = 'https://dev.zestlabs.cloud';

// Create the API you need with baseURL, key and secret
const api = new AuthServiceApiHMAC(baseUrl, cloudKey, cloudSecret);
// Call the API
const userCreateResponse = await api.createUser({ firstName: 'Test', lastName: 'User', email: 'test@zestlabs.io' });
```

### Creating data pool and putting some customer data

```ts
import { DistrconfigPoolType, PoolDataServiceApiHMAC } from '@zestlabs-io/zest-js-sdk';

// Fetch the key and secret from env
const cloudKey = process.env.ZEST_KEY || '';
const cloudSecret = process.env.ZEST_SECRET || '';
// This is the base url for ZEST Cloud
const baseUrl = 'https://dev.zestlabs.cloud';

const distrApi = new DistrConfigServiceApiHMAC(baseUrl, cloudKey, cloudSecret);
// Create global type of my_pool
const poolCreateResp = await distrApi.createPool({
    id: 'my_pool',
    poolType: DistrconfigPoolType.GLOBAL,
    pkExtractExpression: '$.pk',
    tagExtractExpression: '$.locality',
  });

const dataApi = new DataAPI(baseUrl, cloudKey, cloudSecret);
// Create some data in my_pool
const createResp = await dataApi.bulkCreate('my_pool',
    [{ pk: 'customer1', locality: 'loc1' } as any,
    { pk: 'customer2', locality: 'loc1' } as any,
    { pk: 'customer3', locality: 'loc2' } as any]);

```

For more details on SDK - see tests:
 * [AuthAPI tests](./__tests__/auth/AuthAPI.test.ts)
 * [DistrAPI tests](./__tests__/distr/DistrAPI.test.ts)
 * [DataAPI tests](./__tests__/data/DataAPI.test.ts)

## License

MIT