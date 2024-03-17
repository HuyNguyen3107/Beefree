import React from "react";
import styles from "./navigation.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import WhyBeefree from "../MegaMenu/WhyBeefree/WhyBeefree";
import Link from "next/link";
import Templates from "../MegaMenu/Templates/Templates";
import Integrations from "../MegaMenu/Integrations/Integrations";
import Solutions from "../MegaMenu/Solutions/Solutions";
import Resources from "../MegaMenu/Resources/Resources";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          Why Beefree <FaChevronDown /> <WhyBeefree />
        </li>
        <li className={styles.nav_item}>
          Templates <FaChevronDown /> <Templates />
        </li>
        <li className={styles.nav_item}>
          Integrations <FaChevronDown /> <Integrations />
        </li>
        <li className={styles.nav_item}>
          Solutions <FaChevronDown /> <Solutions />
        </li>
        <li className={styles.nav_item}>
          Resources <FaChevronDown /> <Resources />
        </li>
        <li className={styles.nav_item}>
          <Link href={"#"}>Dev</Link>
        </li>
        <li className={styles.nav_item}>
          <Link href={"#"}>Pricing</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
