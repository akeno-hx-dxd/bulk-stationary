import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../db/index"; // adjust the path based on your file structure

// GET request to retrieve all catalogs with included products
export const GET = async () => {
    try {
        const catalogs = await Prisma.catalog.findMany({
            include: {
                catalogProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!catalogs || catalogs.length === 0) {
            return NextResponse.json({ success: false, error: "No Catalogs found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, catalogs: catalogs }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};

// POST request to create a new catalog with products
export const POST = async (request: NextRequest) => {
    try {
        const { name, imageUri, productIds } = await request.json();

        if (!name || !imageUri || !productIds) {
            return NextResponse.json({ success: false, error: "Incomplete data" }, { status: 400 });
        }

        const catalog = await Prisma.catalog.create({
            data: {
                name,
                image_uri: imageUri,
                catalogProducts: {
                    create: productIds.map((productId: string) => ({
                        product: { connect: { id: productId } }
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, catalog: catalog }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};

// PATCH request to update an existing catalog
export const PATCH = async (request: NextRequest) => {
    try {
        const { catalogId, name, imageUri, productIds } = await request.json();

        if (!catalogId || (!name && !imageUri && !productIds)) {
            return NextResponse.json({ success: false, error: "Incomplete data" }, { status: 400 });
        }

        const updatedCatalog = await Prisma.catalog.update({
            where: { id: catalogId },
            data: {
                ...(name && { name }),
                ...(imageUri && { image_uri: imageUri }),
                ...(productIds && {
                    catalogProducts: {
                        set: [], // Remove existing products
                        create: productIds.map((productId: string) => ({
                            product: { connect: { id: productId } }
                        }))
                    }
                })
            }
        });

        return NextResponse.json({ success: true, catalog: updatedCatalog }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};
