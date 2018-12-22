/*
 * Class - GenerateStub
 */
'use strict'
const winston = require('../config/winston')
const fs = require('fs')
const directoryExists = require('directory-exists')
const fileExists = require('file-exists')
const openAPI = require('./openAPIParser')
const srcPath = fs.realpathSync('src')

class GenerateStub {
    static async retrieveStructure() {
        try {
            let stubStructure = {}

            await openAPI.validate()

            let apiSpec = await openAPI.parseAPISpec()
            let paths = apiSpec.paths
            for(let element in paths) {
                let methods = paths[element]
                for(let element in methods) {
                    let method = methods[element]
                    if('x-controller' in method) {
                        let controller = method['x-controller']
                        if('x-service' in method) {
                            let service = method['x-service']
                            if('operationId' in method) {
                                let operation = method['operationId']
                                if(controller in stubStructure) {
                                    let serviceArr = stubStructure[controller].services.filter((val) => {
                                        return!(val === service)
                                    })
                                    serviceArr.push(service)
                                    stubStructure[controller].services = serviceArr

                                    let operationArr = stubStructure[controller].operations.filter((val) => {
                                        return!(val === operation)
                                    })
                                    operationArr.push(operation)
                                    stubStructure[controller].operations = operationArr

                                    if('x-validationOperationId' in method) {
                                        let validationOperation = method['x-validationOperationId']
                                        let validationOperationArr = stubStructure[controller].validationOperations.filter((val) => {
                                            return!(val === validationOperation)
                                        })
                                        validationOperationArr.push(validationOperation)
                                        stubStructure[controller].validationOperations = validationOperationArr
                                    }
                                } else {
                                    stubStructure[controller] = { services: [], operations: [], validationOperations: [] }
                                    stubStructure[controller].services.push(service)
                                    if('x-validationOperationId' in method) {
                                        let validationOperation = method['x-validationOperationId']
                                        stubStructure[controller].validationOperations.push(validationOperation)
                                    }
                                    stubStructure[controller].operations.push(operation)
                                }
                            }
                        }
                    }
                }
            }
            return stubStructure
        } catch (e) {
            throw e
        }
    }
    static createFolder(folderName) {
        let controllerPath = `${srcPath}/${folderName}`
        if (!directoryExists.sync(controllerPath)) {
            fs.mkdirSync(controllerPath)
        }
    }

    static createStub(controllerStructure) {
        let dirPath = `${srcPath}/controllers`
        if (directoryExists.sync(dirPath)) {
            for(let controller in controllerStructure) {
                let controllerFilePath = `${srcPath}/controllers/${controller}.js`
                if(!fileExists.sync(controllerFilePath)
          && controller !== 'healthController') {
                    let services = controllerStructure[controller].services
                    services.forEach((service) => {
                        let serviceFilePath = `${srcPath}/services/${service}.js`
                        if(!fileExists.sync(serviceFilePath)) {
                            GenerateStub.writeServiceClass(service)
                        }
                    })
                    let operations = controllerStructure[controller].operations
                    let validationOperations = controllerStructure[controller].validationOperations
                    GenerateStub.writeControllerClass(controller,
                        services,
                        operations,
                        validationOperations)
                }
            }
        }
    }

    static writeControllerClass(controller,
        services,
        operations,
        validationOperations) {
        let filePath = `${srcPath}/controllers/${controller}.js`
        let className = controller.charAt(0).toUpperCase() + controller.slice(1)
        let buffer = ''
        // Generate dependency statements (require)
        services.forEach((service) => {
            if(!fileExists.sync(filePath)) {
                buffer += `/*\n* Class - ${className}\n*/\n`
                buffer += 'const winston = require(\'../config/winston\')\n'
            }
            buffer += `const ${service} = require('../services/${service}')\n`
            fs.appendFileSync(filePath, buffer)
        })
        //
        buffer = `\nclass ${className} {\n`
        // Generate validation operation statements
        if(validationOperations && validationOperations.length > 0) {
            validationOperations.forEach((name) => {
                buffer += `\n/*\n${name}\n*/\n`
          +`static async ${name}(ctx, next) {\n`
          +`winston.info('${controller}.${name} called...')\n`
          +'next(\'route\')\n}'
            })
            buffer += '\n\n'
        }
        // Generate operation statements
        if(operations && operations.length > 0) {
            operations.forEach((name) => {
                buffer += `\n/*\n${name}\n*/\n`
          +`static async ${name}(ctx, next) {`
          +`winston.info('${controller}.${name} called...')\n`
          +'/* Call service class to get the job done and return the result.\n'
          +'"OK" is just a sample.*/\n'
          +'ctx.status = 200\n'
          +'ctx.body = \'OK\'\n'
          +'}\n'
            })
        }
        buffer += '}'
      +'\n\n'
      +`module.exports = ${className}`

        fs.appendFileSync(filePath, buffer)
    }

    static writeServiceClass(service) {
        let filePath = `${srcPath}/services/${service}.js`
        let className = service.charAt(0).toUpperCase() + service.slice(1)
        let buffer = ''
        if(!fileExists.sync(filePath)) {
            buffer += `/*\n* Class - ${className}\n*/\n`
            buffer += 'const winston = require(\'../config/winston\')\n'
        }
        buffer += `\nclass ${className} {\n`
      +'/* Write all your service/business logic here. */\n'
      +'}'
      +'\n\n'
      +`module.exports = ${className}`

        fs.appendFileSync(filePath, buffer)
    }

    static async generate() {
        GenerateStub.createFolder('controllers')
        GenerateStub.createFolder('services')
        try {
            let stubStructure = await GenerateStub.retrieveStructure()
            GenerateStub.createStub(stubStructure)
        } catch (e) {
            winston.info(`Failed to generate stub: ${e}`)
        }
    }
}

GenerateStub.generate()

module.exports = GenerateStub
