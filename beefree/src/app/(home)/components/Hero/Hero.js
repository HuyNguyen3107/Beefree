import React from "react";
import styles from "./hero.module.scss";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import beefreeInterface from "../../../../assets/images/beefreeInterface.webp";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className="row">
          <div>
            <h1>The go-to HTML email builder for Higher Education</h1>
            <p>
              Transform campus communication with Beefree intuitive
              drag-and-drop editor. Our platform streamlines email creation with
              advanced features, ensuring secure, FERPA-compliant campaigns.
            </p>
            <div>
              <Link href={"#"}>Get started for free</Link>
              <Link href={"#"}>Start collaborating with Team!</Link>
            </div>
            <div>
              <Image src={beefreeInterface} alt="beefree interface" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
