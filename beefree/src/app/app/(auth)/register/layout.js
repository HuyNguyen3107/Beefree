import { Inter } from "next/font/google";
import { Providers } from "@/components/Provider/Providers";
const inter = Inter({ subsets: ["latin"] });
import "../../../app/app.css";
import logo from "../../../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Register - Beefree | No-code email & page design suite",
  description:
    "Speed up email creation with Beefree's drag-and-drop, no-code HTML email builder and editor. Compatible with your favorite sending platform. Sign up for free!",
};

export default function RegisterLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Link href="/">
            <Image
              src={logo}
              alt="BeeFree logo"
              className="absolute top-5 left-5"
            />
          </Link>
          {children}
          <div className="fixed top-0 right-0 bottom-0 bg-violet-600 text-white w-[35%] flex items-center justify-center text-center px-8 flex-col">
            <h2 className="text-[26px] font-bold mb-3">
              Go from inspiration to campaign creation, fast and easy!
            </h2>
            <p>
              Speed up email production with Beefree's drag-and-drop builder and
              free email and landing page templates.
            </p>
          </div>
        </Providers>
      </body>
    </html>
  );
}
