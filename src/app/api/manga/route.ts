import { NextResponse } from "next/server";

const link = `${process.env.EXTERNAL_API_CRAWL}/api/manga`;

export async function GET() {
  const url = `${link}/list?type=blogtruyen&sort=desc&order=lastest`;
  const res = await fetch(url);
  return NextResponse.json(await res.json());
}
