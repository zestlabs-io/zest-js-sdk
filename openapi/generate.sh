#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PDIR=${DIR}/..

# Copy swagger definitions
if [ "$1" != "nocopy" ]; then
  cp ${PDIR}/../appscape/api/swagger/v1/appscape.swagger.json ${DIR}/.
  cp ${PDIR}/../auth-service/api/swagger/v1/service.swagger.json ${DIR}/auth.swagger.json
  cp ${PDIR}/../data-distribution/functions/api/swagger/v1/functions.swagger.json ${DIR}/.
  cp ${PDIR}/../data-distribution/distr-config/api/swagger/v1/distr-config.swagger.json ${DIR}/.
  cp ${PDIR}/../data-distribution/data/api/swagger/v1/data.swagger.json ${DIR}/.
fi

# Swagger combine
# npm install -g swagger-combine
# swagger-combine config.json -o fullSchema.json
npm install swagger-merger -g
swagger-merger -i ${DIR}/fullRef.json -o ${DIR}/fullSchema.json


# Generate

rm -rf ${PDIR}/src/openapi
mkdir -p ${PDIR}/src/openapi

rm -rf ${PDIR}/gen
mkdir -p ${PDIR}/gen

docker run --rm \
   -v "${PDIR}/openapi/:/local/api:ro" \
  -v "${PDIR}/gen:/local/gen" \
  openapitools/openapi-generator-cli generate \
  -i /local/api/fullSchema.json \
  -g typescript-axios \
  --remove-operation-id-prefix \
  -o /local/gen
cp -R ${PDIR}/gen/* ${PDIR}/src/openapi
rm -rf ${PDIR}/gen

#openapi-generator-cli generate --remove-operation-id-prefix -i ${DIR}/fullSchema.json -g typescript-axios -o ${PDIR}/src/openapi
