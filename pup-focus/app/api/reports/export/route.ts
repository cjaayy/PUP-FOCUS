import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Report export endpoint scaffolded.",
    nextStep: "Implement CSV/PDF stream generation in reports module.",
  });
}
