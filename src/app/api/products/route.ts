import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../db/index";

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
    try{
        const { name, uri, exTag, description, quantity, price, unit} = await request.json();
        if(!name || !uri || !exTag || !description || !quantity || !price || !unit){
            throw new Error("Incomplete data");
        }
        const product = await Prisma.product.create({
            data: {
                name: name,
                uri: uri,
                exTag: exTag,
                description: description,
                quantity: quantity,
                price: price,
                unit: unit
            }
        })
        if(!product){
            return NextResponse.json({ success: false, error: "Failed to create product"}, { status: 400 })
        }
        else
        {
            const products = await Prisma.product.findMany();
            return NextResponse.json({ success: true, products: products })
        }   
    }
    catch(err : any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}


