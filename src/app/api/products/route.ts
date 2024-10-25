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
    try {
        const { name, uri, exTag, descriptions, quantities, prices, unit } = await request.json();
        
        // Check for incomplete data
        if (!name || !uri || !exTag || !descriptions || !quantities || !prices || !unit) {
            throw new Error("Incomplete data");
        }

        //parse the data into specific formats
        const parsedQuantities = quantities.map((quant: string) => parseInt(quant));
        const parsedPrices = prices.map((price: string) => parseFloat(price));
        // Create the product
        const product = await Prisma.product.create({
            data: {
                name,
                uri,
                exTag,
                descriptions, // Use descriptions array
                quantities: parsedQuantities,    // Use quantities array
                prices: parsedPrices,        // Use prices array
                unit
            }
        });

        if (!product) {
            return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 400 });
        } else {
            const products = await Prisma.product.findMany();
            return NextResponse.json({ success: true, products: products }, { status: 200 });
        }
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}