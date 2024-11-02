import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";

export const POST = async (request: NextRequest) => {
  try {
    const { key } = await request.json();
    // Validate the key
    if (!key || key !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: "Invalid auth key", key: key },
        { status: 403 }
      );
    }

    // Create the response
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set the token as a cookie
    response.cookies.set({
      name: "auth-key",
      value: process.env.ADMIN_KEY || "",
      path: "/",
      httpOnly: true, // HTTP-only for better security
      secure: process.env.NODE_ENV === "production", // Only set the cookie over HTTPS in production
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 39, // Cookie expires in 39 days
    });

    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};
