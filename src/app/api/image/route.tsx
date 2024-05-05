// take current logo, round it, and return it as a png
import { type NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export async function GET(req: NextRequest) {
  return new ImageResponse(<img src="http://localhost:3000/assets/logos/logo.png" style={{
    borderRadius: "50%",
  }} />, {
    width: 4096,
    height: 4096,
    headers: {
      "Content-Type": "image/png",
    },
  });
};