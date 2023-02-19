const express = require('express')
const app = express()
const connectdb = require('./db/connect')
const errorhandler = require('./middleware/errorhandler')
const notfound = require('./middleware/not-found')
const productsroute = require('./routes/product')
require('dotenv').config()


const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.static('./views'))


app.use('/api/v1/products' , productsroute)


app.use(errorhandler)
app.use(notfound)

const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port , ()=>{
            console.log(`server running on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()

