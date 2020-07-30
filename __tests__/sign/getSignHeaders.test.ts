import getSignHeaders from '../../src/sign/getSignHeaders';

test('Sign request', () => {
  const cloudKey = 'HABAAAAARD7INC2JS513JDNEFQ5F';
  const cloudSecret = '-VtNhQMg8tym64xIp+tRKLTRCpUx5mc8u4yivQpkP*sm6HMz4Chj~*V8Qi48Zz91';

  const url = 'https://dev.zestlabs.cloud/api/auth/v1/user';
  const validity = 1596107527;
  const contentType = 'application/json';
  const md5Checksum = 'd41d8cd98f00b204e9800998ecf8427e'; //CryptoJS.MD5(opts.body).toString();

  expect(getSignHeaders(url, contentType, md5Checksum, validity, cloudKey, cloudSecret))
    .toStrictEqual({
      'Authorization': `ZEST ${cloudKey}:9c7523214a0d6d79ae0b444cf9b1aa258b04c473e8b37c3d885f039e50dbab78`,
      'X-ZEST-Validity': validity,
      'Content-Md5': md5Checksum,
      'Content-Type': contentType
    });
});