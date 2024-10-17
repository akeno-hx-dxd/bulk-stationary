import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../../db/index";
import { isAuthenticated } from "@/app/middleware/auth";

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
    const isAuthResponse = isAuthenticated(request);
    if(isAuthResponse){
        return isAuthResponse
    }
    try{
        const { pid } = params;
        const { name, uri, label, description, quantity, price} = await request.json();
        if(!pid || !name || !uri || !label || !description || !quantity || !price){
            return NextResponse.json({ success: false, error: "Incomplete data Provided"}, { status: 400 })
        }
        const product = await Prisma.product.update({
            where: {id: pid},
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
            return NextResponse.json({ success: false, error: "Failed to update product"}, { status: 400 })
        }
        return NextResponse.json({ success: true, product: product})
    }
    catch(err: any){
        return NextResponse.json({ success: false, error: err.message}, { status: 500 })
    }
}
    
export const DELETE = async (request: NextRequest, { params }: { params: { pid: string}}) => {
    const isAuthResponse = isAuthenticated(request);
    if(isAuthResponse){
        return isAuthResponse
    }
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