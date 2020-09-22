import CryptoJS from 'crypto-js';
import getSignHeaders, { DefaultValidity } from '../src/sign/getSignHeaders';

export class API {

  protected _key: string;
  protected _secret: string;
  protected _baseURL: string;

  constructor(baseURL: string, cloudKey: string, cloudSecret: string) {
    this._baseURL = baseURL;
    this._key = cloudKey;
    this._secret = cloudSecret;
  }

  protected getOpts = (url: string, payload?: string) => {
    const fullUrl = `${url}`;
    const md5Checksum = CryptoJS.MD5(payload || '').toString();
    const validity = Math.round(((new Date()).getTime() + DefaultValidity) / 1000);
    const contentType = 'application/json';

    const zestHeaders = getSignHeaders(fullUrl, contentType, md5Checksum, validity, this._key, this._secret);
    if (payload !== undefined && payload != '')
      return { body: payload, headers: zestHeaders };
    else
      return { headers: zestHeaders };
  }


}