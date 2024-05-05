import { type NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";

export async function GET(req: NextRequest) {
  return new ImageResponse(
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      gap: "0.5rem",
      backgroundImage: "linear-gradient(to bottom right, #0ea5e9, #34d399)",
      width: "100vw",
      height: "100vh",
    }}>
      <header style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{
          fill: "white",
          width: "2.5rem",
          height: "2rem",
        }}>
          <path fill="white" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
        </svg>
        <h1 style={{ fontFamily: "Geist Mono", fontSize: "2rem", margin: 0 }}>Ryder Horne Design</h1>
      </header>
      <p style={{ fontFamily: "Geist Sans", fontSize: "1rem", margin: 0 }}>An agency which makes brilliant web design ideas easy to accomplish.</p>
    </main>,
    {
      fonts: [
        {
          name: "Geist Sans",
          data: readFileSync(process.cwd() + "/node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf"),
        },
        {
          name: "Geist Mono",
          data: readFileSync(process.cwd() + "/node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf"),
        },
      ],
    },
  );
};