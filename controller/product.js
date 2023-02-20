const Product = require('../model/products')





const getallproducts = async(req , res)=>{
    const {name , company , featured , sort , field} = req.query
    const queryobject = {}

    // filtering out product from the database with it name using a query selector($regex)
    if(name){
        queryobject.name = {$regex:name , $options:'i'}
    }

    // filtering out product from the database with the company's name using a query selector($regex)
    if(company){
        queryobject.company = {$regex:company , $options:'i'}
    }

    // filtering out product from the database if it featured is either true || false using a query selector($regex)
    if(featured){
        queryobject.featured = featured === 'true'?true:false
    }

    let result = Product.find(queryobject)

    // selecting exact product either with product name , company name from the database using the select method
    if(field){
        const fieldlist = field.split(',').join(' ')
        result = result.select(fieldlist)
    }
    //  sorting out product with it name or price in ascending or descending order
    if(sort){
        const sortlist = sort.split(',').join(' ')
        result = result.sort(sortlist)
    }

    // requesting for a page of  the list of products in the database
    // products can also be skipped if the product info are not needed
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)

    res.status(200).json({products , result:products.length })
}



module.exports = {getallproducts}
