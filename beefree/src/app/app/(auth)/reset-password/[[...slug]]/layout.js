import { Inter } from "next/font/google";
import { Providers } from "@/components/Provider/Providers";
const inter = Inter({ subsets: ["latin"] });
import "../../../../app/app.css";
import logo from "../../../../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ToastBox } from "@/utils/toast";

export const metadata = {
  title: "Reset Password - Beefree | No-code email & page design suite",
  description:
    "Speed up email creation with Beefree's drag-and-drop, no-code HTML email builder and editor. Compatible with your favorite sending platform. Sign up for free!",
};

export default function ResetPasswordLayout({ children }) {
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
          <ToastBox />
        </Providers>
      </body>
    </html>
  );
}
