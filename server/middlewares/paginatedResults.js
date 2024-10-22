const prisma = require('../prismaClient');

const paginatedResults =  (model,filter ={}) => {

    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        try{const results = await prisma[model].findMany({
            skip: offset,
            take: limit,
            where:filter,
        });
        const total = await prisma[model].count({
            where:filter
        });
        req.paginatedResults = { results, page, limit, total };
        next();}
        catch(error){
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = paginatedResults;