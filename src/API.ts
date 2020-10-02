import CryptoJS, { mode } from 'crypto-js';
import { AuthServiceApi, DistrConfigServiceApi, FunctionsServiceApi, PoolDataServiceApi, Configuration } from './openapi/index';
import getSignHeaders, { DefaultValidity } from './sign/getSignHeaders';
import Axios, { AxiosInstance } from 'axios';

export class HMACSigner {

  protected _key: string;
  protected _secret: string;

  constructor(cloudKey: string, cloudSecret: string) {
    this._key = cloudKey;
    this._secret = cloudSecret;
  }

  public getOpts = (url: string, payload?: string) => {
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

export class AuthServiceApiHMAC extends AuthServiceApi {
  constructor(baseURL: string, cloudKey: string, cloudSecret: string, configuration?: Configuration) {
    const signer = new HMACSigner(cloudKey, cloudSecret);
    const axios = Axios.create({
      baseURL: baseURL,
    });

    axios.interceptors.request.use(function (config) {
      if (!config.url)
        return config;

      const resp = signer.getOpts(config.url, config.data ? config.data : '')
      if (resp.headers) {
        config.headers = resp.headers;
        config.headers['Content-Type'] = 'application/json';
      }
      config.data = config.data ? config.data : {}
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    super(configuration, baseURL, axios);
  }
}

export class DistrConfigServiceApiHMAC extends DistrConfigServiceApi {
  constructor(baseURL: string, cloudKey: string, cloudSecret: string, configuration?: Configuration) {
    const signer = new HMACSigner(cloudKey, cloudSecret);
    const axios = Axios.create({
      baseURL: baseURL,
    });

    axios.interceptors.request.use(function (config) {
      if (!config.url)
        return config;

      const resp = signer.getOpts(config.url, config.data ? config.data : '')
      if (resp.headers) {
        config.headers = resp.headers;
        config.headers['Content-Type'] = 'application/json';
      }
      config.data = config.data ? config.data : {}
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    super(configuration, baseURL, axios);
  }
}

export class FunctionsServiceApiHMAC extends FunctionsServiceApi {
  constructor(baseURL: string, cloudKey: string, cloudSecret: string, configuration?: Configuration) {
    const signer = new HMACSigner(cloudKey, cloudSecret);
    const axios = Axios.create({
      baseURL: baseURL,
    });

    axios.interceptors.request.use(function (config) {
      if (!config.url)
        return config;

      const resp = signer.getOpts(config.url, config.data ? config.data : '')
      if (resp.headers) {
        config.headers = resp.headers;
        config.headers['Content-Type'] = 'application/json';
      }
      config.data = config.data ? config.data : {}
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    super(configuration, baseURL, axios);
  }
}

export class PoolDataServiceApiHMAC extends PoolDataServiceApi {
  constructor(baseURL: string, cloudKey: string, cloudSecret: string, configuration?: Configuration) {
    const signer = new HMACSigner(cloudKey, cloudSecret);
    const axios = Axios.create({
      baseURL: baseURL,
    });

    axios.interceptors.request.use(function (config) {
      if (!config.url)
        return config;

      const resp = signer.getOpts(config.url, config.data ? config.data : '')
      if (resp.headers) {
        config.headers = resp.headers;
        config.headers['Content-Type'] = 'application/json';
      }
      config.data = config.data ? config.data : {}
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    super(configuration, baseURL, axios);
  }
}