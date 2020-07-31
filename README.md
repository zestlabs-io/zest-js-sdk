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
import { AuthAPI } from '../../src/auth/AuthAPI';
// Fetch the key and secret from env
const cloudKey = process.env.ZEST_KEY || '';
const cloudSecret = process.env.ZEST_SECRET || '';
// This is the base url for ZEST Cloud
const baseUrl = 'https://dev.zestlabs.cloud';

// Create the API you need with baseURL, key and secret
const api = new AuthAPI(baseUrl, cloudKey, cloudSecret);
// Call the API
const userCreateResponse = await api.createUser('Test', 'User', 'contact@zestlabs.io');
```

### Creating data pool and putting some customer data

```ts
import { DistrAPI } from '../../src/distr/DistrAPI';
import { DataAPI } from '../../src/data/DataAPI';

// Fetch the key and secret from env
const cloudKey = process.env.ZEST_KEY || '';
const cloudSecret = process.env.ZEST_SECRET || '';
// This is the base url for ZEST Cloud
const baseUrl = 'https://dev.zestlabs.cloud';

const distrApi = new DistrAPI(baseUrl, cloudKey, cloudSecret);
// Create global type of my_pool
const poolCreateResp = await distrApi.createPool('my_pool', 'GLOBAL', '$.pk', '$.locality', '', '');

const dataApi = new DataAPI(baseUrl, cloudKey, cloudSecret);
// Create some data in my_pool
const createResp = await dataApi.create('my_pool',
  [{ pk: 'customer1', locality: 'loc1' },
  { pk: 'customer2', locality: 'loc1' },
  { pk: 'customer3', locality: 'loc2' }]);

```

For more details on SDK - see tests:
 * [AuthAPI tests](./__tests__/auth/AuthAPI.test.ts)
 * [DistrAPI tests](./__tests__/distr/DistrAPI.test.ts)
 * [DataAPI tests](./__tests__/data/DataAPI.test.ts)

## License

MIT