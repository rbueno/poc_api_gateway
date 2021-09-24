const axios = require('axios')
const { Router } = require('express')
const gatewayRouter = Router()
const registry = require('./registry.json')

gatewayRouter.all('*', async (request, response) => {
    const apiEntity = request.params['0'].split('/')[1]

    if(!registry.services[apiEntity]) {
        response.send('endpoint inválido')
    }
    const options = {
        method: request.method.toLowerCase(),
        url: `${registry.services[apiEntity].baseURL}${request.url}`,
        headers: {
            Authorization: request.headers.authorization,
        },
        data: request.body
    }
    try {
        const result = await axios(options)
        response.status(result.status).json(result.data)
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({ error: error.message })
    }
})

module.exports = gatewayRouter
