import { APIEvent } from "@solidjs/start/server";
import z from "zod";
import { generateRandomId } from "~/utils/generateId";
import { supabase } from "~/utils/supabase";

const schemaDevices = z.object({
    customer_id: z.string().min(1, "Customer ID is required"),
    brand: z.string().min(1, "Brand is required"),
    type: z.string().min(1, "Type is required"),
    serial_number: z.string().min(1, "Serial Number is required"),
    completeness: z.string().min(1, "Completeness is required"),
    problem: z.string().min(1, "Problem is required")
})

export async function GET () {
    try {
        const { data, error } = await supabase
        .from("devices")
        .select("id, customer_id, brand, type, serial_number, completeness, problem");
        return Response.json({
            message: "Successfully get data",
            data
        },  {status: 200})

    } catch (e) {
        return Response.json({
            message: e
        }, { status: 500})
    }
}
export async function POST (event: APIEvent) {
    try {
        const body = await event.request.json();
        const validation = schemaDevices.safeParse(body);
        if (!validation.success) {
            return Response.json({
                message: validation.error.message
            }, {status: 400});
        }
        const { data, error } = await supabase
        .from("devices")
        .insert({
            id: generateRandomId("D"),
            customer_id: validation.data.customer_id,
            brand: validation.data.brand,
            type: validation.data.type,
            serial_number: validation.data.serial_number,
            completeness: validation.data.completeness,
            problem: validation.data.problem
        })
        .select("id, customer_id, brand, type, serial_number, completeness, problem")
        .single();
        if (error) {
            return Response.json({
                message: error.message
            }, {status: 400});
        }
        return Response.json({
            message: "Successfully insert data",
            data
        },  {status: 200})
    } catch (e) {
        console.log(e)
        return Response.json({
            message: "Internal server error"
        }, { status: 500})
    }
}
