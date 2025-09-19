import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST (request){
    try {
        const {userId} = getAuth(request)
        const {address, items} = await request.json();

        if (!address || items.length ===0){
            return NextResponse.json ({success: false, message: "Invalid data"});
        }
        //calculation amount using items

        const amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice *item.quantity
        },0)

        
    } catch (error) {
        
    }
}