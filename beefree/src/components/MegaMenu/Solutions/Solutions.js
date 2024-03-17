import React from "react";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import styles from "./solutions.module.scss";

function Solutions() {
  return (
    <div className={styles.mega_menu}>
      <div>
        <Link href={"#"}>Agencies</Link>
        <Link href={"#"}>
          Developers <FaArrowUpRightFromSquare />
        </Link>
        <Link href={"#"}>Higher Education</Link>
        <Link href={"#"}>Nonprofits</Link>
        <Link href={"#"}>Designers</Link>
      </div>
    </div>
  );
}

export default Solutions;
