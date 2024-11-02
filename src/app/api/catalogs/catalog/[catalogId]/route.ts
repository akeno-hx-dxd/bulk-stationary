import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/db/index";
import { deleteImagesFromCloudinary } from "@/lib/cloudinary";

export const GET = async (request: NextRequest, { params }: { params: { catalogId: string } }) => {
    try {
        const catalog = await Prisma.catalog.findUnique({
            where: { id: params.catalogId },
            include: {
                catalogProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        
        return NextResponse.json({ success: true, catalog }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to fetch catalogs" },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest, { params }: { params: { catalogId: string } }) => {
    try {
        const { catalogId } = params;
        const { name, productIds, imageUri} = await request.json();
        
        if (!catalogId) {
            return NextResponse.json(
                { success: false, error: "Catalog ID is required for updating" },
                { status: 400 }
            );
        }

        const existingCatalog = await Prisma.catalog.findUnique({
            where: { id: catalogId },
            include: { catalogProducts: { include: { product: true } } }
        });

        if (!existingCatalog) {
            return NextResponse.json(
                { success: false, error: "Catalog not found" },
                { status: 404 }
            );
        }

        const existingProductIds = existingCatalog.catalogProducts.map(cp => cp.product.id);

        // Determine which products to add and which to remove
        const addProductIds = productIds.filter((id: string) => !existingProductIds.includes(id));
        const removeProductIds = existingProductIds.filter(id => !productIds.includes(id));

        const updateData: any = {};
        if (name) updateData.name = name;
        if (imageUri){
            await deleteImagesFromCloudinary([existingCatalog.image_uri]);
            updateData.image_uri = imageUri;
        } 

        // Create relationships for new products
        if (addProductIds.length > 0) {
            updateData.catalogProducts = {
                create: addProductIds.map((productId: string) => ({
                    product: { connect: { id: productId } },
                })),
            };
        }

        // Remove relationships for products that are no longer included
        if (removeProductIds.length > 0) {
            updateData.catalogProducts = {
                ...updateData.catalogProducts,
                deleteMany: removeProductIds.map((productId: string) => ({
                    productId,
                    catalogId,
                })),
            };
        }

        const updatedCatalog = await Prisma.catalog.update({
            where: { id: catalogId },
            data: updateData,
            include: {
                catalogProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, catalog: updatedCatalog }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to update catalog" },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest, { params }: { params: { catalogId: string } }) => {
    try {
        const { catalogId } = params;
        if (!catalogId) {
            return NextResponse.json(
                { success: false, error: "Catalog ID is required for deletion" },
                { status: 400 }
            );
        }

        // First, delete all associated groupProducts to remove relationships
        await Prisma.catalogProduct.deleteMany({
            where: { catalogId: catalogId },
        });

        // Delete Image URIs from Cloudinary
        const catalog = await Prisma.catalog.findUnique({
            where: { id: catalogId }
        })
        if(catalog?.image_uri){
            await deleteImagesFromCloudinary([catalog.image_uri]);
        }
        // Now delete the group itself
        await Prisma.catalog.delete({
            where: { id: catalogId },
        });

        return NextResponse.json({ success: true, message: "Catalog deleted successfully" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to Catalog" },
            { status: 500 }
        );
    }
};

