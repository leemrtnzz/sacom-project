import { APIEvent } from "@solidjs/start/server";
import z from "zod";
import { generateRandomId } from "~/utils/generateId";
import { supabase } from "~/utils/supabase";

const schemaCategories = z.object({
    name: z.string().min(1, "Name is required")
})

export async function GET () {
    try {
        const { data, error } = await supabase
        .from("categories")
        .select("id, name");
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
        const validation = schemaCategories.safeParse(body);
        if (!validation.success) {
            return Response.json({
                message: validation.error.message
            }, {status: 400});
        }
        const { data, error } = await supabase
        .from("categories")
        .insert({
            id: generateRandomId("C"),
            name: validation.data.name
        })
        .select("id, name")
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
