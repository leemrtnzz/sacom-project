import { APIEvent } from "@solidjs/start/server";
import { supabase } from "~/utils/supabase";
import { z } from "zod";
import { generateRandomId } from "~/utils/generateId";

const CustomerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    company: z.string().min(1, "Company is required").optional(),
    phone: z.string().min(1, "Phone is required")
});

export async function GET (event: APIEvent) {
    try {
        const { data, error } = await supabase
            .from("customers")
            .select("id, name, company, phone");
        if (error) {
            throw error;
        }
        return Response.json({
            message: 'Successfully get data',
            data: data
        }, {status: 200});
    } catch (e) {
        return Response.json({
            message: e
        }, {status: 500})
    }
}
export async function POST (event: APIEvent) {
    try {
        const body = await event.request.json();
        const validation = CustomerSchema.safeParse(body);
        if (!validation.success) {
            return Response.json({
                message: validation.error.message
            }, {status: 400});
        }
        
        // Check apakah customer sudah ada - perbaikan di sini
        const { data: existingCustomer, error: checkError } = await supabase
            .from("customers")
            .select("phone")
            .eq("phone", validation.data.phone)
            .maybeSingle(); // Gunakan maybeSingle() bukan single()
        
        // Handle error dari query check
        if (checkError) {
            console.error("Error checking customer:", checkError);
            return Response.json({
                message: "Error checking customer data"
            }, {status: 500});
        }
        
        // Jika customer sudah ada
        if (existingCustomer) {
            return Response.json({
                message: "Customer already exists"
            }, {status: 400});
        }
        
        // Insert customer baru
        const { data: newCustomer, error: insertError } = await supabase
            .from("customers")
            .insert({
                id: generateRandomId("C"),
                name: validation.data.name,
                company: validation.data.company,
                phone: validation.data.phone
            })
            .select("id, name, company, phone") // Tambahkan select() untuk mendapatkan data yang diinsert
            .single();
        
        // Handle error dari insert
        if (insertError) {
            console.error("Error inserting customer:", insertError);
            return Response.json({
                message: "Failed to create customer"
            }, {status: 500});
        }
        
        return Response.json({
            message: "Customer created successfully",
            data: newCustomer
        }, {status: 201}); // Gunakan status 201 untuk created
        
    } catch (e) {
        console.error("Unexpected error:", e);
        return Response.json({
            message: "Internal server error"
        }, {status: 500});
    }
}