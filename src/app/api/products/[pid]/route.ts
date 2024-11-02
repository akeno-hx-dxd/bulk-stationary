import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../../db/index";
import { deleteImagesFromCloudinary, compareAndDeleteImages } from '@/lib/cloudinary'; 

export const GET = async (request: NextRequest, { params }: { params: { pid: string } }) => {
    try {
        const { pid } = params;
        if (!pid) {
            return NextResponse.json({ success: false, error: "No Product id provided" }, { status: 400 });
        }
        const product = await Prisma.product.findUnique({
            where: { id: pid },
            include: {
                groupProducts: {
                    include: {
                        group: true
                    }
                },
                catalogProducts: {
                    include: {
                        catalog: true
                    }
                }
            }
        });
        if (!product) {
            return NextResponse.json({ success: false, error: "Invalid Product id" }, { status: 400 });
        }
        return NextResponse.json({ success: true, product: product });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }   
};

export const POST = async (request: NextRequest, { params }: { params: { pid: string } }) => {
    try {
        const { pid } = params;
        const { name, image_uris, descriptions, pricing, unit, brand, groupIds, catalogIds } = await request.json();

        if (!pid || !name || !image_uris || !descriptions || !pricing || !unit || !brand) {
            return NextResponse.json({ success: false, error: "Incomplete data provided" }, { status: 400 });
        }

        // Fetch the existing product to compare image URIs
        const existingProduct = await Prisma.product.findUnique({ where: { id: pid } });
        if (!existingProduct) {
            return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
        }

        // Delete old images from Cloudinary if URIs are changing
        await compareAndDeleteImages(existingProduct.image_uris, image_uris);

        // Use a transaction to update product details and manage associations with groups and catalogs
        const updatedProduct = await Prisma.$transaction(async (prisma) => {
            // Update product details
            const product = await prisma.product.update({
                where: { id: pid },
                data: {
                    name,
                    image_uris,
                    descriptions,
                    pricing,
                    unit,
                    brand,
                },
            });

            // Update group associations
            await prisma.groupProduct?.deleteMany({ where: { productId: pid } });
            await Promise.all(groupIds?.map((groupId: string) => {
                return prisma.groupProduct.create({
                    data: { productId: pid, groupId }
                });
            }));

            // Update catalog associations
            await prisma.catalogProduct?.deleteMany({ where: { productId: pid } });
            await Promise.all(catalogIds?.map((catalogId: string) => {
                return prisma.catalogProduct.create({
                    data: { productId: pid, catalogId }
                });
            }));

            return product;
        });

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

        // Fetch the product to delete its associated images and relationships
        const product = await Prisma.product.findUnique({
            where: { id: pid },
            include: {
                catalogProducts: true,
                groupProducts: true,
            }
        });
        if (!product) {
            return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
        }

        // Delete the associated images from Cloudinary
        await deleteImagesFromCloudinary(product.image_uris);

        // Remove the product from any catalogs and groups
        await Prisma.catalogProduct.deleteMany({
            where: { productId: pid },
        });

        await Prisma.groupProduct.deleteMany({
            where: { productId: pid },
        });

        // Finally, delete the product from the database
        const deletedProduct = await Prisma.product.delete({
            where: { id: pid },
        });

        return NextResponse.json({ success: true, product: deletedProduct });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};
