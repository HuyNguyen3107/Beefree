import React from "react";
import styles from "./beefreesdk.module.scss";
import Link from "next/link";
import Image from "next/image";
import beefreeSDK from "../../../../../public/beefreeSDK.svg";

function BeefreeSDK() {
  return (
    <section className={styles.beefree_sdk}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Image src={beefreeSDK} alt="beefree" />
          </div>
          <div className="col-8">
            <span>Developer or SaaS?</span>
            <p>
              Embed Beefree's white-label email builder into your app for
              seamless email creation and more.
            </p>
            <Link href={"#"}>Discover Beefree SDK</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeefreeSDK;
