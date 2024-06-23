import { Inter } from "next/font/google";
import { Providers } from "@/components/Provider/Providers";
const inter = Inter({ subsets: ["latin"] });
import "../app.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Profile - Beefree | No-code email & page design suite",
  description:
    "Speed up email creation with Beefree's drag-and-drop, no-code HTML email builder and editor. Compatible with your favorite sending platform. Sign up for free!",
};

export default function ProfileLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="app">
            <div className="app-main h-screen overflow-hidden">
              <div className="h-[100%] relative">
                <Header />
                <main className="main">{children}</main>
                <div className="absolute bottom-0 right-0 left-0">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
