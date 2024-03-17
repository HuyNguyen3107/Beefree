import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import "../../assets/css/grid.css";
import logo from "../../../public/logo.svg";
import Navigation from "../Navigation/Navigation";
import AuthButton from "../AuthButton/AuthButton";

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className={styles.navigation}>
              <div className={styles.logo}>
                <Image width={123} height={42} src={logo} alt="Logo Beefree" />
              </div>
              <Navigation />
            </div>
          </div>
          <div className="col-3">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
