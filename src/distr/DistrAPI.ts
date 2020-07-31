import { API } from '../API';
import CryptoJS from 'crypto-js';
import got from 'got';

import getSignHeaders, { DefaultValidity } from '../../src/sign/getSignHeaders';

export class DistrAPI extends API {

  createPool = async (name: string, poolType: string, pkExtractExpression: string,
    tagExtractExpression: string, schema: string, onUploadFunction: string): Promise<any> => {
    const pool = {
      id: name,
      poolType: poolType,
      pkExtractExpression: pkExtractExpression,
      tagExtractExpression: tagExtractExpression,
      schema: schema,
      onUploadFunction: onUploadFunction
    }
    const payload = JSON.stringify(pool);

    const url = `${this._baseURL}/api/distribution/v1/pool`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  deletePool = async (id: string): Promise<any> => {
    const url = `${this._baseURL}/api/distribution/v1/pool/${id}`;
    const resp = await got.delete(url, this.getOpts(url));
    return resp;
  }
}