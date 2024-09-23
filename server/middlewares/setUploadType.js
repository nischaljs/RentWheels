const setUplodType = (type) =>{
    return async (req, res, next) => {
        req.body.type = type;
        next();
    }
}