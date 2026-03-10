import { NextResponse } from "next/server";


const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://armatrix-team-page.onrender.com";


export async function GET() {
  const targetUrl = `${backendBaseUrl.replace(/\/$/, "")}/team`;

  try {
    const response = await fetch(targetUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Backend team service returned an error." },
        { status: response.status },
      );
    }

    const teamMembers = await response.json();
    return NextResponse.json(teamMembers);
  } catch {
    return NextResponse.json(
      { message: "Unable to reach backend team service." },
      { status: 502 },
    );
  }
}