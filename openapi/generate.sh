rm -rf ../src/openapi
mkdir -p ../src/openapi

# Copy swagger definitions
cp ../../auth-service/api/swagger/v1/service.swagger.json ./.
cp ../../data-distribution/functions/api/swagger/v1/functions.swagger.json ./.
cp ../../data-distribution/distr-config/api/swagger/v1/distr-config.swagger.json ./. 
cp ../../data-distribution/data/api/swagger/v1/data.swagger.json ./.

# Swagger combine
# npm install -g swagger-combine
# swagger-combine config.json -o fullSchema.json
npm install swagger-merger -g
swagger-merger -i fullRef.json -o fullSchema.json


# Generate
openapi-generator generate --remove-operation-id-prefix -i fullSchema.json -g typescript-axios -o ../src/openapi