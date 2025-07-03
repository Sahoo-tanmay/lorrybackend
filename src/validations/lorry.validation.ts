import { z } from "zod";

export const lorrySchema = {
    body: z.object({
        truckNo: z.string({required_error:"Truck number is required"}),
        ownerName: z.string({required_error:"Owner name is required"}),
        lorryModel: z.string().optional(),
        capacityInTons: z.number().positive({ message: "Capacity must be a positive number" }).optional(),
        registrationDate: z.coerce.date().optional(),
        phone: z.string({required_error: "Phone number is required"}).min(10, { message: "Phone must be at least 10 digits" }).max(10, { message: "Phone must be at most 10 digits" }),
        email: z.string().email({ message: "Invalid email address" }).optional(),
        isActive: z.boolean().default(true),
    })
}
