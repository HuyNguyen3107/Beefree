import { cookies } from "next/headers";
import { getIronSession, sealData } from "iron-session";
import { NextResponse } from "next/server";
const { SESSION_PASSWORD, SESSION_NAME } = process.env;
export const ironOptions = {
  password: SESSION_PASSWORD,
  cookieName: SESSION_NAME,
};

export async function GET() {
  const session = await getIronSession(cookies(), ironOptions);
  return NextResponse.json(session);
}

export async function POST(request) {
  const data = await request.json();
  const session = await getIronSession(cookies(), ironOptions);

  for (const key in data) {
    session[key] = data[key];
  }
  const sealed = await sealData(
    {
      ...session,
    },
    ironOptions
  );
  cookies().set(SESSION_NAME, sealed);
  return NextResponse.json({ success: true, sealed });
}
