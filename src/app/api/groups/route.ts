import { NextRequest, NextResponse } from "next/server";
import Prisma from "../../../db/index";

// Get all groups with products included
export const GET = async () => {
    try {
        const groups = await Prisma.group.findMany({
            include: {
                groupProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        
        return NextResponse.json({ success: true, groups }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to fetch groups" },
            { status: 500 }
        );
    }
};

// Create a new group
export const POST = async (request: NextRequest) => {
    try {
        const { name, productIds } = await request.json();

        if (!name) {
            return NextResponse.json(
                { success: false, error: "Group name is required" },
                { status: 400 }
            );
        }

        // Validate productIds array if provided
        if (productIds && !Array.isArray(productIds)) {
            return NextResponse.json(
                { success: false, error: "Product IDs must be an array" },
                { status: 400 }
            );
        }

        const group = await Prisma.group.create({
            data: {
                name,
                groupProducts: {
                    create: productIds?.map((productId: string) => ({
                        product: { connect: { id: productId } },
                    })),
                },
            },
            include: {
                groupProducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, group }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message || "Failed to create group" },
            { status: 500 }
        );
    }
};

// Update an existing group
export const PATCH = async (request: NextRequest) => {
    try {
        const { groupId, name, addProductIds, removeProductIds } = await request.json();

        if (!groupId) {
            return NextResponse.json(
                { success: false, error: "Group ID is required for updating" },
                { status: 400 }
            );
        }

        const updateData: any = {};
        if (name) updateData.name = name;

        if (addProductIds) {
            updateData.groupProducts = {
                create: addProductIds.map((productId: string) => ({
                    product: { connect: { id: productId } },
                })),
            };
        }

        if (removeProductIds) {
            updateData.groupProducts = {
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
