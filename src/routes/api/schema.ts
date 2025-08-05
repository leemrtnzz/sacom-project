import { z } from "zod";

export const schemaCategories = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(1, "Price is required"),
    category_id: z.string().min(1, "Categories is required"),
})
export const schemaSearch = z.object({
    search: z.string().min(1, "Search is required")
})
