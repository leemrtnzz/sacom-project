import { z } from "zod";
import { APIEvent } from "@solidjs/start/server";
import { generateRandomId, invoiceNumber } from "~/utils/generateId";
import { supabase } from "~/utils/supabase";
const schemaOrderService = z.object({
    invoice: z.string().min(1, "Invoice is required"),
    device_id: z.string().min(1, "Device ID is required"),
    status: z.string().min(1, "Status is required").optional()
})

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("service_orders")
            .select("id, invoice, device_id, status");
        if (error) {
            return Response.json({
                message: error.message
            }, {status : 400})
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

export async function POST(event: APIEvent) {
    try {
        const body = await event.request.json();
        const validation = schemaOrderService.safeParse(body);
        if (!validation.success) {
            return Response.json({
                message: validation.error.message
            }, {status: 400});
        }
        const { data, error } = await supabase
        .from("service_orders")
        .insert({
            id: generateRandomId("OS"),
            invoice: invoiceNumber("INV-SRV"),
            device_id: validation.data.device_id,
            status: "in_progress",
        })
        .select("id, invoice, device_id, status")
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
        return Response.json({
            message: "Internal server error"
        }, { status: 500})
    }
}