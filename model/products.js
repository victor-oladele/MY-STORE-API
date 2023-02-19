
const mongoose = require('mongoose')


const productschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'product name must be provide']

    },
    price:{
        type:String,
        required:[true , 'price must be stated']
    },
    featured:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea' , 'liddy' , 'caressa' , 'marcos'],
            message: '${VALUE} is not supported'
        }
    }
    
})

module.exports = mongoose.model('PRODUCTS2' , productschema)











