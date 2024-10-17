import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";

export const POST = async (request: NextRequest) => {
  try {
    const { key } = await request.json();
    if (!key || key !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: "Invalid auth key" },
        { status: 403 } 
      );
    }

    return NextResponse.json(
      { success: true, token: process.env.ADMIN_KEY }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while processing your request." },
      { status: 500 } 
    );
  }
};
