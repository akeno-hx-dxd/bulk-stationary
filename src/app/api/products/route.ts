import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../db/index";
import { isAuthenticated } from "@/app/middleware/auth";

export const GET = async () => {
    try{
        const products = await Prisma.product.findMany();
        if(!products){
            return NextResponse.json({ success: false, error: "No products found"}, { status: 404 })
        }
        return NextResponse.json({ success: true, products: products })
    }catch(err : any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    const isAuthResponse = isAuthenticated(request);
    if(isAuthResponse){
        return isAuthResponse
    }
    try{
        const { name, uri, label, description, quantity, price} = await request.json();
        if(!name || !uri || !label || !description || !quantity || !price){
            throw new Error("Incomplete data");
        }
        const product = await Prisma.product.create({
            data: {
                name: name,
                uri: uri,
                label: label,
                description: description,
                quantity: quantity,
                price: price
            }
        })
        if(!product){
            return NextResponse.json({ success: false, error: "Failed to create product"}, { status: 400 })
        }
        return NextResponse.json({ success: true, product: product})
    }
    catch(err : any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}


