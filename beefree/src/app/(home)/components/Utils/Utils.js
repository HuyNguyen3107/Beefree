import React from "react";
import styles from "./utils.module.scss";
import Link from "next/link";
import Image from "next/image";
import beefreeInterface from "../../../../assets/images/beefreeInterface.webp";

function Utils() {
  return (
    <section className={styles.utils}>
      <div className="container">
        <div className="row">
          <h2>
            Beefree is a fast, collaborative email & <br /> landing page design
            suite
          </h2>
          <p>
            Beefree helps you dramatically cut down on email and landing page
            production time while retaining full design freedom and enforcing
            branding guidelines. Move from idea to ready-to-go, responsive
            emails & pages in hours, not days.
          </p>
          <Link href={"#"}>Pricing & plans</Link>
          <Image src={beefreeInterface} alt="'beefree" />
        </div>
      </div>
    </section>
  );
}

export default Utils;
