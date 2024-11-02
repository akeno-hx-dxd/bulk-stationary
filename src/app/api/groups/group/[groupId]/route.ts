import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/db/index";

export const GET = async (request: NextRequest, { params }: { params: { groupId: string } }) => {
    try {
        const group = await Prisma.group.findUnique({
            where: { id: params.groupId },
            include: {
                groupProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        
        return NextResponse.json({ success: true, group }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to fetch groups" },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest, { params }: { params: { groupId: string } }) => {
    try {
        const { groupId } = params;
        const { name, productIds } = await request.json();

        if (!groupId) {
            return NextResponse.json(
                { success: false, error: "Group ID is required for updating" },
                { status: 400 }
            );
        }

        const existingGroup = await Prisma.group.findUnique({
            where: { id: groupId },
            include: { groupProducts: { include: { product: true } } }
        });

        if (!existingGroup) {
            return NextResponse.json(
                { success: false, error: "Group not found" },
                { status: 404 }
            );
        }

        const existingProductIds = existingGroup.groupProducts.map(gp => gp.product.id);

        // Determine which products to add and which to remove
        const addProductIds = productIds.filter((id: string) => !existingProductIds.includes(id));
        const removeProductIds = existingProductIds.filter(id => !productIds.includes(id));

        const updateData: any = {};
        if (name) updateData.name = name;

        // Create relationships for new products
        if (addProductIds.length > 0) {
            updateData.groupProducts = {
                create: addProductIds.map((productId: string) => ({
                    product: { connect: { id: productId } },
                })),
            };
        }

        // Remove relationships for products that are no longer included
        if (removeProductIds.length > 0) {
            updateData.groupProducts = {
                ...updateData.groupProducts,
                deleteMany: removeProductIds.map((productId: string) => ({
                    productId,
                    groupId,
                })),
            };
        }

        const updatedGroup = await Prisma.group.update({
            where: { id: groupId },
            data: updateData,
            include: {
                groupProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, group: updatedGroup }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to update group" },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest, { params }: { params: { groupId: string } }) => {
    try {
        const { groupId } = params;
        if (!groupId) {
            return NextResponse.json(
                { success: false, error: "Group ID is required for deletion" },
                { status: 400 }
            );
        }

        // First, delete all associated groupProducts to remove relationships
        await Prisma.groupProduct.deleteMany({
            where: { groupId: groupId },
        });

        // Now delete the group itself
        await Prisma.group.delete({
            where: { id: groupId },
        });

        return NextResponse.json({ success: true, message: "Group deleted successfully" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to delete group" },
            { status: 500 }
        );
    }
};

