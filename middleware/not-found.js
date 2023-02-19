const notfound = (req , res)=>{
    res.status(404).send('routes not found')
}

module.exports = notfound