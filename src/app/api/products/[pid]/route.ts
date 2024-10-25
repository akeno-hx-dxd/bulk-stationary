import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../../db/index";
import { deleteImagesFromCloudinary, compareAndDeleteImages} from '@/lib/cloudinary'; 

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


export const POST = async (request: NextRequest, { params }: { params: { pid: string } }) => {
  try {
    const { pid } = params;
    const { name, uri, exTag, descriptions, quantities, prices, unit } = await request.json();

    if (!pid || !name || !uri || !exTag || !descriptions || !quantities || !prices || !unit) {
      return NextResponse.json({ success: false, error: "Incomplete data provided" }, { status: 400 });
    }

    // Fetch the existing product to compare the URIs
    const existingProduct = await Prisma.product.findUnique({ where: { id: pid } });
    if (!existingProduct) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }
    const parsedQuantities = quantities.map((quant: string) => parseInt(quant));
    const parsedPrices = prices.map((price: string) => parseFloat(price));  
    // If the URI is changing, delete the old image from Cloudinary
    await compareAndDeleteImages(existingProduct.uri, uri);

    // Update the product
    const updatedProduct = await Prisma.product.update({
      where: { id: pid },
      data: {
        name,
        uri,
        exTag,
        descriptions,
        quantities: parsedQuantities,
        prices: parsedPrices,
        unit,
      },
    });

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { pid: string } }) => {
  try {
    const { pid } = params;

    if (!pid) {
      return NextResponse.json({ success: false, error: "No product ID provided" }, { status: 400 });
    }

    // Fetch the product to delete its associated image
    const product = await Prisma.product.findUnique({ where: { id: pid } });
    if (!product) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    // Delete the associated image from Cloudinary
    await deleteImagesFromCloudinary(product.uri);

    // Delete the product from the database
    const deletedProduct = await Prisma.product.delete({
      where: { id: pid },
    });

    return NextResponse.json({ success: true, product: deletedProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};
