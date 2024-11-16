import {Inter} from "next/font/google";
import {Providers} from "@/components/Provider/Providers";
import "../app.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Projects - Beefree | No-code email & page design suite",
    description:
        "Speed up email creation with Beefree's drag-and-drop, no-code HTML email builder and editor. Compatible with your favorite sending platform. Sign up for free!",
};

export default function ProjectsLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <div className="app grid grid-cols-8">
                <div className="side-bar shadow-lg h-full">
                    <SideBar/>
                </div>
                <div className="app-main col-span-7 h-screen overflow-hidden">
                    <div className="h-[100%] relative">
                        <Header/>
                        <div className="h-[86%] overflow-y-auto">
                            <main className="main">{children}</main>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </Providers>
        </body>
        </html>
    );
}
