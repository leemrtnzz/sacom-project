import { APIEvent } from "@solidjs/start/server";
import { schemaCategories } from "~/routes/api/schema";
import { generateRandomId } from "~/utils/generateId";
import { supabase } from "~/utils/supabase";

async function isCategoryExist(name: string): Promise<string> {
    const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("name", name)
    .single();
    if (error) {
        throw error;
    }
    return data?.id;
}

export async function GET () {
    try {
        const { data, error } = await supabase
        .from("products")
        .select("id, name, price, categories(name)");
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
        const isCategory = await isCategoryExist(validation.data.category_id);
        if (!isCategory) {
            return Response.json({
                message: "Categories not found"
            }, {status: 400});
        }
        const { data, error } = await supabase
        .from("products")
        .insert({
            id: generateRandomId("P"),
            name: validation.data.name,
            price: validation.data.price,
            category_id: isCategory,
        })
        .select("id, name, price, categories(name)")
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
