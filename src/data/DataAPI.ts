import { API } from '../API';
import got from 'got';

export class DataAPI extends API {

  create = async (poolId: string, objs: Object[] | Object): Promise<any> => {

    const payload = JSON.stringify(Array.isArray(objs) ? objs : [objs]);

    const url = `${this._baseURL}/api/data/_r/${poolId}`;
    const resp = await got.post(url, this.getOpts(url, payload));
    return resp;
  }

  update = async (poolId: string, objs: Object[] | Object): Promise<any> => {
    const payload = JSON.stringify(Array.isArray(objs) ? objs : [objs]);

    const url = `${this._baseURL}/api/data/_r/${poolId}`;
    const resp = await got.put(url, this.getOpts(url, payload));
    return resp;
  }

  delete = async (poolId: string, docIds: String[] | String): Promise<any> => {
    const ids = Array.isArray(docIds) ? docIds.map((val) => { return { '_id': val }; }) : [{ '_id': docIds }];
    const payload = JSON.stringify(ids);

    const url = `${this._baseURL}/api/data/_r/${poolId}`;
    const resp = await got.delete(url, this.getOpts(url, payload));
    return resp;
  }

  get = async (poolId: string, id: string): Promise<any> => {
    const payload = '';

    const url = `${this._baseURL}/api/data/_r/${poolId}/${id}`;
    const resp = await got.get(url, this.getOpts(url, payload));
    return resp;
  }

  list = async (poolId: string, limit: number = 10, skip: number = 0): Promise<any> => {
    const url = `${this._baseURL}/api/data/_r/${poolId}?limit=${limit}&skip=${skip}`;
    const resp = await got.get(url, this.getOpts(url, ''));
    return resp;
  }
}