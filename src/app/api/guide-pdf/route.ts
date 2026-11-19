import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    let filePath = path.join(
      process.cwd(),
      "public",
      "Identifine_Affiliate_System_Guide.pdf"
    );
    if (!fs.existsSync(filePath)) {
      filePath = path.join(
        process.cwd(),
        "public",
        "Xtreme_Cardz_Affiliate_System_Guide.pdf"
      );
    }
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Identifine_Affiliate_System_Guide.pdf"',
        "Content-Length": String(fileBuffer.length),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "PDF file not found" },
      { status: 404 }
    );
  }
}
