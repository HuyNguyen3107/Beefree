import { Inter } from "next/font/google";
import { Providers } from "@/components/Provider/Providers";
const inter = Inter({ subsets: ["latin"] });
import "../app.css";

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
          {/* <div className="app grid grid-cols-8">
            <div className="side-bar shadow-lg h-full">
              <SideBar />
            </div>
            <div className="app-main col-span-7">
              <Header />
              <main className="main">{children}</main>
              <Footer />
            </div>
          </div> */}
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
