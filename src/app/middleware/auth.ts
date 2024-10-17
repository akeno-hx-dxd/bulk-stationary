import { NextResponse, NextRequest } from "next/server";
import "dotenv/config";
export function isAuthenticated(request: NextRequest) {
    const key = request.cookies.get("auth-key")?.value;
    if(!key || key !== process.env.ADMIN_KEY){
        return NextResponse.json({ success: false, error: "Unauthorized"}, { status: 401 });
    }
    return undefined;
}