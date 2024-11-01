const setUplodType = (type) =>{
    return async (req, res, next) => {
    
        req.type = type;
        next();
    }
}

module.exports = setUplodType;