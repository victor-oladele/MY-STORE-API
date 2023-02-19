const Product = require('../model/products')




const getallproducts = async(req , res)=>{
    const {name , company , featured , sort , field} = req.query
    const queryobject = {}

    if(name){
        queryobject.name = {$regex:name , $options:'i'}
    }

    if(company){
        queryobject.company = {$regex:company , $options:'i'}
    }

    if(featured){
        queryobject.featured = featured === 'true'?true:false
    }

    let result = Product.find(queryobject)

    if(field){
        const fieldlist = field.split(',').join(' ')
        result = result.select(fieldlist)
    }

    if(sort){
        const sortlist = sort.split(',').join(' ')
        result = result.sort(sortlist)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)

    res.status(200).json({products , result:products.length })
}



module.exports = {getallproducts}
