import { API } from '../API';
import got from 'got';

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

  createApp = async (name: string): Promise<any> => {
    const app = {
      id: name,
      bundleUrl: '',
      active: true
    }
    const payload = JSON.stringify(app);

    const url = `${this._baseURL}/api/distribution/v1/app`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  deleteApp = async (name: string): Promise<any> => {
    const url = `${this._baseURL}/api/distribution/v1/app/${name}`;
    const resp = await got.delete(url, this.getOpts(url));
    return resp;
  }

  assignAppPools = async (appId: string, poolIds: string[]): Promise<any> => {
    const assign = {
      appId: appId,
      poolIds: poolIds
    }
    const payload = JSON.stringify(assign);

    const url = `${this._baseURL}/api/distribution/v1/assign-app-pools`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  unassignAppPools = async (appId: string, poolIds: string[]): Promise<any> => {
    const assign = {
      appId: appId,
      poolIds: poolIds
    }
    const payload = JSON.stringify(assign);

    const url = `${this._baseURL}/api/distribution/v1/unassign-app-pools`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  createMobileUser = async (userId: string): Promise<any> => {
    const user = {
      id: userId
    }
    const payload = JSON.stringify(user);

    const url = `${this._baseURL}/api/distribution/v1/user`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  deleteMobileUser = async (userId: string): Promise<any> => {
    const url = `${this._baseURL}/api/distribution/v1/user/${userId}`;
    const resp = await got.delete(url, this.getOpts(url));
    return resp;
  }

  assignAppUsers = async (appId: string, userIds: string[]): Promise<any> => {
    const payload = JSON.stringify({
      appId: appId,
      userIds: userIds
    });

    const url = `${this._baseURL}/api/distribution/v1/assign-app-users`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  unassignAppUsers = async (appId: string, userIds: string[]): Promise<any> => {
    const payload = JSON.stringify({
      appId: appId,
      userIds: userIds
    });

    const url = `${this._baseURL}/api/distribution/v1/unassign-app-users`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  assignTagToUser = async (poolId: string, userId: string, value: string): Promise<any> => {
    const payload = JSON.stringify({
      poolId: poolId,
      userId: userId,
      value: value
    });

    const url = `${this._baseURL}/api/distribution/v1/assign-tag-to-user`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  unassignTagFromUser = async (poolId: string, userId: string, value: string): Promise<any> => {
    const payload = JSON.stringify({
      poolId: poolId,
      userId: userId,
      value: value
    });

    const url = `${this._baseURL}/api/distribution/v1/unassign-tag-from-user`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return resp;
  }

  getUsers = async (): Promise<DistributionUser[]> => {
    const url = `${this._baseURL}/api/distribution/v1/users`;
    const resp = await got.get(url, this.getOpts(url));
    var users: DistributionUser[]
    return JSON.parse(resp.body).users;
  }
}

interface DistributionUser {
  id: string
  activeAppId?: string
  tagAssignments?: UserTagAssignment[]
}

interface UserTagAssignment {
  poolId: string
  value: string
}