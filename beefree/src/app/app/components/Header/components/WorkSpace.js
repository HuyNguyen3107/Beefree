"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

function WorkSpace() {
  let pathname = usePathname();
  pathname = pathname.slice(pathname.lastIndexOf("/") + 1);
  return (
    <div className="flex justify-start items-center gap-x-3">
      {pathname === "profile" ? (
        <>
          <Link href="/app/projects">
            <Button color="secondary" variant="bordered">
              Go to Projects
            </Button>
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-x-3">
          <div className="px-3 py-1 rounded-sm bg-violet-500 text-white font-semibold text-[20px]">
            Y
          </div>
          <span className="font-semibold text-[18px]">Your Workspace</span>
        </div>
      )}
    </div>
  );
}

export default WorkSpace;
