const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = 5010

app.use(express.json())
app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`API Gateway is running on PORT ${PORT}`)
})