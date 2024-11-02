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

