import { APIEvent } from "@solidjs/start/server"
import { schemaSearch } from "~/routes/api/schema";
import { supabase } from "~/utils/supabase";

export async function POST (event: APIEvent) {
    try {
        const body = await event.request.json();
        const validation = schemaSearch.safeParse(body);
        if (!validation.success) {
            return Response.json({
                message: validation.error.message
            }, {status: 400});
        }
        const { data, error } = await supabase
        .from("products")
        .select("id, name, price, categories(name)")
        .ilike("name", `%${validation.data.search}%`);
        if (error) {
            return Response.json({
                message: error.message
            }, {status: 400});
        }
        return Response.json({
            message: "Successfully insert data",
            data,
            count: data.length,
            search: validation.data.search
        },  {status: 200})
    } catch (e) {
        console.log(e)
        return Response.json({
            message: "Internal server error"
        }, { status: 500})
    }
}