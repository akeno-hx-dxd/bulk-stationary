import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../db/index";

// GET: Fetch all products with catalog and group details
export const GET = async () => {
    try {
        const products = await Prisma.product.findMany({
            include: {
                catalogProducts: {
                    include: {
                        catalog: true
                    }
                },
                groupProducts: {
                    include: {
                        group: true
                    }
                }
            }
        });

        if (!products || products.length === 0) {
            return NextResponse.json({ success: false, error: "No products found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};

// POST: Create a new product with pricing and relations
export const POST = async (request: NextRequest) => {
    try {
        const { name, image_uris, unit, descriptions, pricing, brand, catalogIds, groupIds } = await request.json();
        
        // Validate required fields
        if (!name || !unit || !descriptions || !pricing || !brand) {
            return NextResponse.json({ success: false, error: "Incomplete data" }, { status: 400 });
        }
        
        const product = await Prisma.product.create({
            data: {
                name,
                image_uris,
                unit,
                descriptions,
                pricing,
                brand,
                catalogProducts: {
                    create: catalogIds?.map((catalogId: string) => ({
                        catalog: { connect: { id: catalogId } }
                    }))
                },
                groupProducts: {
                    create: groupIds?.map((groupId: string) => ({
                        group: { connect: { id: groupId } }
                    }))
                }
            }
        });
        
        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};
