import React from "react";
import styles from "./whybeefree.module.scss";
import Link from "next/link";
import { IoIosListBox } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { MdFolder } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { BsLaptopFill } from "react-icons/bs";

function WhyBeefree() {
  return (
    <div className={styles.mega_menu}>
      <div className={styles.reasons}>
        <div>
          <span>Why Beefree</span>
          <div>
            <div>
              <Link href={"#"}>
                <span>1</span> <span>Get inspired</span>
              </Link>
              <Link href={"#"}>
                <span>2</span> <span>Set up your brand</span>
              </Link>
              <Link href={"#"}>
                <span>3</span> <span>Create an email</span>
              </Link>
            </div>
            <div>
              <Link href={"#"}>
                <span>4</span> <span>Collaborate with your team</span>
              </Link>
              <Link href={"#"}>
                <span>5</span>{" "}
                <span>
                  Integrate with your <br /> sending platform
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Link href={"#"}>
            <IoNewspaper /> Features
          </Link>
          <Link href={"#"}>
            <FaCirclePlus /> Integrations
          </Link>
          <Link href={"#"}>
            <IoIosListBox /> Pricing & plans
          </Link>
          <Link href={"#"}>
            <MdFolder />{" "}
            <span>
              <span>
                Beefree SDK <FaArrowUpRightFromSquare />
              </span>
              <span>White label solutions for SaaS</span>
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.templates}>
        <p>CHOOSE FROM 1500+ TEMPLATES</p>
        <div>
          <Link href={"#"}>
            <span>
              <MdEmail />
            </span>
            <span>
              <span>
                Email templates <FaAngleRight />
              </span>
              <span>Professional templates for any occasions</span>
            </span>
          </Link>
          <Link href={"#"}>
            <span>
              <BsLaptopFill />
            </span>
            <span>
              <span>
                Page templates <FaAngleRight />
              </span>
              <span>High-quality templates for your next campaign</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WhyBeefree;
