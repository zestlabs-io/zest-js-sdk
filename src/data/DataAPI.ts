import { API } from '../API';
import got from 'got';

export class DataAPI extends API {

  create = async (poolId: string, objs: Object[] | Object): Promise<any> => {

    const payload = JSON.stringify(Array.isArray(objs) ? objs : [objs]);

    const url = `${this._baseURL}/api/data/${poolId}`;
    const resp = await got.post(url, this.getOpts(url, payload));
    return resp;
  }

  update = async (poolId: string, objs: Object[] | Object): Promise<any> => {
    const payload = JSON.stringify(Array.isArray(objs) ? objs : [objs]);

    const url = `${this._baseURL}/api/data/${poolId}`;
    const resp = await got.put(url, this.getOpts(url, payload));
    return resp;
  }

  delete = async (poolId: string, docIds: String[] | String): Promise<any> => {
    const ids = Array.isArray(docIds) ? docIds.map((val) => { return { '_id': val }; }) : [{ '_id': docIds }];
    const payload = JSON.stringify(ids);

    const url = `${this._baseURL}/api/data/${poolId}`;
    const resp = await got.put(url, this.getOpts(url, payload));
    return resp;
  }

  get = async (poolId: string, id: string): Promise<any> => {
    const payload = '';

    const url = `${this._baseURL}/api/data/${poolId}/${id}`;
    const resp = await got.get(url, this.getOpts(url, payload));
    return resp;
  }
}