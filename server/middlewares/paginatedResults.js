const prisma = require("../prismaClient");

const paginatedResults = (model, filterFunction) => {
    return async (req, res, next) => {
        console.log("Welcome to paginated results");

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const offset = (page - 1) * limit;

        console.log(`Page: ${page}, Limit: ${limit}, Offset: ${offset}`);

        try {
            if (!prisma[model]) {
                return res.status(400).json({ success: false, message: 'Invalid model provided' });
            }

            const filter = filterFunction(req); // Call the filter function with req
            console.log("Filter applied:", filter); // Debugging line

            const results = await prisma[model].findMany({
                skip: offset,
                take: limit,
                where: filter,
            });
            console.log(results);
            

            const total = await prisma[model].count({
                where: filter
            });

            req.paginatedResults = { results, page, limit, total };
            next();
        } catch (error) {
            console.error("Error fetching paginated results:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = paginatedResults;