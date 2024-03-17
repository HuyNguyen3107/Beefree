import React from "react";
import styles from "./authbutton.module.scss";
import Link from "next/link";

function AuthButton() {
  return (
    <div className={styles.auth}>
      <Link href={"#"}>Login</Link>
      <Link href={"#"}>Get started - It's free</Link>
    </div>
  );
}

export default AuthButton;
