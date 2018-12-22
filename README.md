# Micro-service framework in NodeJS

### Supports OpenAPI Specification V3
###### Path for your API definition:
```bash
/apiDefinition/openapi.json
```
### Auto generates stubs (controller & service classes) based on Open API Specification V3.
###### Step 1 - Define your own API:
```bash
/apiDefinition/openapi.json
```
###### Step 2 - Verify file content using Swagger UI ([Swagger Editor](https://editor.swagger.io/)):
###### Step 3 - Generate relevant controller and service classes:
```bash
npm run stub
```
###### Step 4 - Controller and service classes will be generated in:
```bash
/src/controllers
/src/services
```
### Provides sample GET, PUT, POST request based on OpenAPI Specification V3
###### As a ready example, try the '/sample' endpoint already defined in: 
```bash
/apiDefinition/openapi.json
```
###### Step 1 - Generate relevant controller and service classes for '/sample' endpoint:
```bash
npm run stub
```
###### Step 2 - Run the server locally:
```bash
npm run local-start
```
###### Step 3 - Verify GET '/sample' API:
```bash
http://localhost:3000/sample
```
### Provides out-of-the box health endpoint
###### Step 1 - Run the server locally:
```bash
npm run start
```
###### Step 2 - Verify application health:
```bash
http://localhost:3000/health
```
### Ready to deploy to Cloud Foundry
###### To deploy the app to Cloud Foundry:
```bash
cf push -f manifest.yml
```
