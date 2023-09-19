import { NextRequest, NextResponse } from "next/server";

const link = `${process.env.EXTERNAL_API_FSFSSFSSFSFSFS}/api/zingMP3`;

interface GetProps {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: GetProps) {
  const { id } = params;
  const url = `${link}/infoSong/${id}`;
  const res = await fetch(url);
  return NextResponse.json(await res.json());
}
