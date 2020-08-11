import { API } from '../API';
import got from 'got';

export interface UserCreateResponse {
  userID: string
}

export interface CreateAceessKeyResponse {
  accessKeyID: string
  accessSecret: string
}

export class AuthAPI extends API {

  createUser = async (firstName: string, lastName: string, email: string): Promise<UserCreateResponse> => {
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName
    }
    const payload = JSON.stringify( user );

    const url = `${this._baseURL}/api/auth/v1/user`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return JSON.parse(resp.body) as UserCreateResponse;
  }

  deleteUser = async (userID: string): Promise<any> => {
    const url = `${this._baseURL}/api/auth/v1/user/${userID}`;
    const resp = await got.delete(url, this.getOpts(url));
    return resp;
  }

  createAccessKey = async (userID: string): Promise<CreateAceessKeyResponse> => {
    const req = {
      userID: userID
    }
    const payload = JSON.stringify(req);

    const url = `${this._baseURL}/api/auth/v1/accesskey`;
    const resp = await got.post(url, this.getOpts(url, payload));

    return JSON.parse(resp.body) as CreateAceessKeyResponse;
  }
}