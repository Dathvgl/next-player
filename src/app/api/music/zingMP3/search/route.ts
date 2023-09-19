import { NextRequest, NextResponse } from "next/server";

const link = `${process.env.EXTERNAL_API_FSFSSFSSFSFSFS}/api/zingMP3`;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const url = `${link}/search/${query}`;
  const res = await fetch(url);
  return NextResponse.json(await res.json());
}
