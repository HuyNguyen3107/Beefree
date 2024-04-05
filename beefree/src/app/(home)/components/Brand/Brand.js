import React from "react";
import styles from "./brand.module.scss";
import Image from "next/image";
import brands from "../../../../assets/images/brand.png";

function Brand() {
  return (
    <section className={styles.brand}>
      <h2>An email builder used by top brands & universities</h2>
      <div>
        <Image src={brands} alt="brands" />
      </div>
    </section>
  );
}

export default Brand;
