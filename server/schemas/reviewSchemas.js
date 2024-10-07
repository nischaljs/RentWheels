const {z} = require("zod");

//Base schema for the user to review a vehicle
const reviewSchema = z.object({
    vehicleId: z.number().int().positive('Vehicle ID must be a positive integer'),
    comment:z.string().trim(),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be no more than 5"),
});

module.exports = {
    ReviewSchema
}