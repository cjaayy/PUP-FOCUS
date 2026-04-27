import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/sign-in?error=missing_code", request.url),
    );
  }

  return NextResponse.redirect(new URL("/", request.url));
}
