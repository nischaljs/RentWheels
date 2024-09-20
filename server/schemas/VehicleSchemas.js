const z = require('zod');

const vehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  seater: z.number().int().positive("Seater must be a positive integer"),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  pricePerDay: z.number().positive("Price per day must be a positive number"),
  available: z.boolean().optional().default(true),
  driverAvailable: z.boolean().optional().default(false),
});

// For creation, we want to ensure all fields are present
const createVehicleSchema = vehicleSchema.strict();

// For updates, we make all fields optional
const updateVehicleSchema = vehicleSchema.partial().strict();

module.exports = {
  createVehicleSchema,
  updateVehicleSchema
};