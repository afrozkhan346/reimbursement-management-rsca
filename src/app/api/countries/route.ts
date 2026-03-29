export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getCountryCurrencyOptions } from "@/lib/currency";

export async function GET() {
  try {
    const countries = await getCountryCurrencyOptions();
    return NextResponse.json({ countries });
  } catch (error) {
    console.error("GET /api/countries error:", error);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}
