import React from "react";
import styles from "./authbutton.module.scss";
import Link from "next/link";

function AuthButton() {
  return (
    <div className={styles.auth}>
      <Link href={"/app/login"}>Login</Link>
      <Link href={"/app/register"}>Get started - Its free</Link>
    </div>
  );
}

export default AuthButton;
