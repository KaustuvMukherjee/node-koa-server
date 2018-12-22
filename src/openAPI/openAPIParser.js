/*
 * Class - OpenAPIParser
 */
'use strict'
const SwaggerParser = require('swagger-parser')
const fs = require('fs')
const apiDefinitionPath = fs.realpathSync('apiDefinition')
const openAPIPath = `${apiDefinitionPath}/openapi.json`

class OpenAPIParser {

    static async validate() {
        try {
            await OpenAPIParser.validateBaseSpec()

            // validate custom ('x-') mandatory elements
            let apiSpec = await OpenAPIParser.parseAPISpec()
            let paths = apiSpec.paths
            for(let element in paths) {
                let methods = paths[element]
                for(let element in methods) {
                    let method = methods[element]
                    if('x-controller' in method) {
                        let controller = method['x-controller']
                        if(controller.length > 0) {
                            if('x-service' in method) {
                                let service = method['x-service']
                                if(service.length > 0) {
                                    // valid
                                } else {
                                    throw 'Invalid x-service'
                                }
                            } else {
                                throw 'Invalid x-service'
                            }
                        } else {
                            throw 'Invalid x-controller'
                        }
                    } else {
                        throw 'Invalid x-controller'
                    }
                }
            }
        } catch (e) {
            throw (e)
        }
    }

    static async validateBaseSpec() {
        try {
            return await SwaggerParser.validate(openAPIPath)
        } catch (e) {
            throw (e)
        }
    }

    static async parseAPISpec() {
        try {
            return await SwaggerParser.parse(openAPIPath)
        } catch (e) {
            throw (e)
        }
    }
}

module.exports = OpenAPIParser
