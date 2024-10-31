const setUplodType = (type) =>{
    return async (req, res, next) => {
        console.log("type passed to middleware:", type + " req.:", req);
        req.type = type;
        next();
    }
}

module.exports = setUplodType;