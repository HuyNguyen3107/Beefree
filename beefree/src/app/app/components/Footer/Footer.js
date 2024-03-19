import React from "react";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer">
      <div className="px-4 py-4 shadow-md flex items-center justify-between">
        <p className="text-sm">
          © 2016-2024 BEE Content Design, Inc - All rights reserved
        </p>
        <div className="flex text-lg gap-x-3 text-indigo-600">
          <CiFacebook />
          <CiLinkedin />
          <FaXTwitter />
          <FaInstagram />
          <FiYoutube />
          <LuLeaf />
        </div>
        <div className="text-sm">
          <Link href={"#"}>Beefree Terms of Service</Link> |{" "}
          <Link href={"#"}>Privacy Policy</Link> |{" "}
          <Link href={"#"}>Status page</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
