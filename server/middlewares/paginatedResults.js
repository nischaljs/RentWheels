const prisma = require("../prismaClient");

const paginatedResults = (model, filterFunction) => {
    return async (req, res, next) => {

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const offset = (page - 1) * limit;


        try {
            if (!prisma[model]) {
                return res.status(400).json({ success: false, message: 'Invalid model provided' });
            }

            const filter = filterFunction(req); // Call the filter function with req


            const results = await prisma[model].findMany({
                skip: offset,
                take: limit,
                where: filter,
            });

            

            const total = await prisma[model].count({
                where: filter
            });

            req.paginatedResults = { results, page, limit, total };
            next();
        } catch (error) {

            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = paginatedResults;