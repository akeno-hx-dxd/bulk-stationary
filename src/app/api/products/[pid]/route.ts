import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../../db/index";

export const GET = async (request: NextRequest,{ params }: { params: { pid: string}}) => {
    try{
        const { pid } = params;
        if(!pid){
            return NextResponse.json({ success: false, error: "No Product id provided"}, { status: 400 })
        }
        const product = await Prisma.product.findUnique({where: {id: pid}})
        if(!product){
            return NextResponse.json({ success: false, error: "Invalid Product id"}, { status: 400 })
        }
        return NextResponse.json({ success: true, product: product });
    }
    catch(err: any){
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }   
}
export const POST = async (request: NextRequest,{ params }: { params: { pid: string}}) => {
    try{
        const { pid } = params;
        const { name, uri, exTag, description, quantity, price, unit} = await request.json();
        if(!pid || !name || !uri || !exTag || !description || !quantity || !price || !unit){
            return NextResponse.json({ success: false, error: "Incomplete data Provided"}, { status: 400 })
        }
        const product = await Prisma.product.update({
            where: {id: pid},
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
            return NextResponse.json({ success: false, error: "Failed to update product"}, { status: 400 })
        }
        return NextResponse.json({ success: true, product: product})
    }
    catch(err: any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}
    
export const DELETE = async (request: NextRequest, { params }: { params: { pid: string}}) => {
    try{
        const { pid } = params;
        if(!pid){
            return NextResponse.json({ success: false, error: "No Product id provided"}, { status: 400 })
        }
        const product = await Prisma.product.delete({
            where: {id: pid}
        })
        if(!product){
            return NextResponse.json({ success: false, error: "Invalid Product id"}, { status: 400 })
        }
        return NextResponse.json({ success: true, product: product})
    }
    catch(err: any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}