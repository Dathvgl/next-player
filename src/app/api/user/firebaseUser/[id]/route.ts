import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const link = `${process.env.EXTERNAL_API_CRAWL}/api/user`;

interface GetProps {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: GetProps) {
  const { id } = params;
  const url = `${link}/firebaseUser/${id}`;

  const res = await fetch(url, {
    headers: { Authorization: headers().get("authorization") ?? "" },
  });

  return NextResponse.json(await res.json());
}
