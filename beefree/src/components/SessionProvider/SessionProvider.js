"use client";

import { setSession } from "./session";

export default function SessionProvider({ children, sessionData }) {
  // setSession(sessionData);
  return <>{children}</>;
}
