import CryptoJS from 'crypto-js';

export const DefaultValidity = 5 * 60000;

export default function getSignHeaders(url: string, contentType: string, md5Checksum: string, validity: number, cloudKey: string, cloudSecret: string): any {
  const toSign = `${url}\n${contentType}\n${validity}\n${md5Checksum}`;
  var hash = CryptoJS.HmacSHA256(toSign, cloudSecret);
  var hashInHex = CryptoJS.enc.Hex.stringify(hash);
  const authorization = 'ZEST ' + cloudKey + ':' + hashInHex
  return {
    'Authorization': authorization,
    'X-ZEST-Validity': validity,
    'Content-Md5': md5Checksum,
    'Content-Type': contentType
  };
};