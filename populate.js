require('dotenv').config()
const connectdb = require('./db/connect')
const productmodel = require('./model/products')
const jsonproducts = require('./products.json')










const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        await productmodel.create(jsonproducts)
        console.log('successful')
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

start()