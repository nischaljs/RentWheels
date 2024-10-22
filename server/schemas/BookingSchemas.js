const { z } = require('zod');

// Define the base schema without the cross-field validation
const bookingSchema = z.object({
  renterId: z.number().int().positive('Renter ID must be a positive integer'),
  vehicleId: z.number().int().positive('Vehicle ID must be a positive integer'),
  startDate: z.date().min(new Date(), 'Start date must be a future date'),
  endDate: z.date(),
  totalPrice: z.number().positive('Total price must be a positive number'),
  driverRequired: z.boolean().optional().default(false),
  paymentId: z.number().int().optional(),
}).refine(data => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'], // This will attach the error to the endDate field
});

module.exports = {
  bookingSchema,
};
