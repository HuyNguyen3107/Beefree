import { Inter } from "next/font/google";
import { Providers } from "@/components/Provider/Providers";
const inter = Inter({ subsets: ["latin"] });
import "../app.css";
import Header from "./components/Header/Header";
// import Sidebar from "./components/Sidebar/Sidebar";

export const metadata = {
  title: "Free Drag & Drop HTML Email Template Builder | Beefree",
  description:
    "Speed up email creation with Beefree's drag-and-drop, no-code HTML email builder and editor. Compatible with your favorite sending platform. Sign up for free!",
};

export default function EditLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="overflow-hidden max-h-screen">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
