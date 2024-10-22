const prisma = require("../prismaClient");


//service to post a review by an verified user
exports.postReview = async (data, userId) => {
    return await prisma.review.create({
        data: {
            userId:userId,
            vehicleId: data.vehicleId,
            rating: data.rating,
            comment: data.comment
        },
        select: {
            comment: true,
            rating: true
        }
    })
}

// service to get all reviews for a specific vehicle
exports.getVehicleReviews = async (vehicleId) => {
    return await prisma.review.findMany({
        where: {
            vehicleId: vehicleId
        },
        select: {
            userId: true,
            vehicleId: true,
            comment: true,
            rating: true,
            createdAt: true, 
            user: {
                select: {
                    fullName: true, // show user’s name for the review
                }
            }
        }
    });
};

// service to update a review by a verified user
exports.updateReview = async (reviewId, data) => {
    return await prisma.review.update({
        where: {
            id: reviewId
        },
        data: {
            comment: data.comment,
            rating: data.rating
        },
        select: {
            comment: true,
            rating: true
        }
    });
};


// service to get the average rating for a vehicle
exports.getAverageRating = async (vehicleId) => {
    const result = await prisma.review.aggregate({
        _avg: {
            rating: true
        },
        where: {
            vehicleId: vehicleId
        }
    });

    return result._avg.rating || 0; 
};


// service to get all reviews by a user
exports.getUserReviews = async (userId) => {
    return await prisma.review.findMany({
        where: {
            userId: userId
        },
        select: {
            vehicleId: true,
            comment: true,
            rating: true,
            createdAt: true,
            vehicle: {
                select: {
                    name: true 
                }
            }
        }
    });
};



exports.deleteReview = async (reviewId, userId) => {
    return await prisma.review.findUnique({
        where: { id: reviewId }
    });
};


