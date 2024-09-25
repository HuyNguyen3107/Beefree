import React from "react";
import Link from "next/link";

function InvalidToken() {
  // make ui that alert the user that the token is invalid and redirect to the home page with beautiful UI and design with tailwindcss make color with violet and white but not background color
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Invalid Token</h1>
        <p className="text-lg opacity-65">
          The token you are trying to use is invalid. Please try again.
        </p>
        <Link href="/" className="text-lg text-violet-500 underline">
          Go back to home
        </Link>
      </div>
    </>
  );
}

export default InvalidToken;
