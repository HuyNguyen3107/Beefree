"use client";

import Link from "next/link";
import React from "react";
import SubDomain from "./components/SubDomain";

function GeneralSettings() {
    return (
        <div className="flex flex-col gap-y-3">
            <span className="text-[22px] font-semibold">Domain</span>
            <div>
                <span className="text-[14px] font-semibold">Custom subdomain</span>
                <p className="text-[14px] opacity-70">
                    Customize the subdomain of your workspace for all of your previews and
                    published designs. The previous subdomain will be deleted in 180 days.{" "}
                    <Link href={"#"} className="opacity-100 underline text-violet-700">
                        Learn more
                    </Link>
                </p>
            </div>
            <div className="flex items-center gap-x-1">
                <span>https://</span>
                <SubDomain/>
                <span>.huynm.top</span>
            </div>
        </div>
    );
}

export default GeneralSettings;
