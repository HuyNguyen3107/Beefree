import React from "react";
import styles from "./benefit.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa6";
import benefitImg from "../../../../assets/images/benefit.webp";

function Benefit() {
  return (
    <section className={styles.benefit}>
      <div className="container">
        <h2>
          <span>Work together across departments</span>
          <br />
          without the back-and-forth
        </h2>
        <div className="row">
          <div className="col-6">
            <div>
              <span>1</span>
              <p>
                Access the world’s largest collection of free ready-to-send
                templates or start from scratch to create your own.
              </p>
            </div>
            <div>
              <span>2</span>
              <p>Set up your brand & manage assets all in one place</p>
            </div>
            <div>
              <span>3</span>
              <p>Design responsive emails with ease</p>
            </div>
            <div>
              <span>4</span>
              <p>Collaborate across departments, teams, and with clients</p>
            </div>
            <div>
              <span>5</span>
              <p>Integrate with your favorite ESPs and marketing platforms</p>
            </div>
          </div>
          <div className="col-6">
            <Image src={benefitImg} alt="benefit" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefit;
