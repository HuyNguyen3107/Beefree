import React from "react";
import styles from "./templates.module.scss";
import Image from "next/image";
import Link from "next/link";
import emailTemplate from "../../../assets/images/email_templates.webp";
import pageTemplate from "../../../assets/images/page_templates.png";
import { MdEmail } from "react-icons/md";
import { BsLaptopFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";

function Templates() {
  return (
    <div className={styles.mega_menu}>
      <div>
        <div>
          <div>
            <Image
              width={250}
              height={100}
              src={emailTemplate}
              alt="email_templates"
            />
            <span>
              <MdEmail />
            </span>
          </div>
          <div>
            <span>
              Email <br />
              Templates
            </span>
            <p>Professional templates for any occasions</p>
            <FaAngleRight />
          </div>
        </div>
        <div>
          <div>
            <Image
              width={250}
              height={100}
              src={pageTemplate}
              alt="page_templates"
            />
            <span>
              <BsLaptopFill />
            </span>
          </div>
          <div>
            <span>
              Page <br />
              Templates
            </span>
            <p>High-quality templates for your next campaign</p>
            <FaAngleRight />
          </div>
        </div>
      </div>
      <div>
        <FaFolder />
        <div>
          <span>TEMPLATE KITS</span>
          <p>A series of templates for your vertical or favorite occasion.</p>
        </div>
      </div>
      <div>
        <div>
          <span>Verticals</span>
          <div>
            <ul>
              <li>
                <Link href={"#"}>E-commerce</Link>
              </li>
              <li>
                <Link href={"#"}>Education</Link>
              </li>
              <li>
                <Link href={"#"}>Fashion</Link>
              </li>
              <li>
                <Link href={"#"}>Hair Salon</Link>
              </li>
              <li>
                <Link href={"#"}>Health & Wellness</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={"#"}>Higher Education</Link>
              </li>
              <li>
                <Link href={"#"}>Music & Entertainment</Link>
              </li>
              <li>
                <Link href={"#"}>Photography</Link>
              </li>
              <li>
                <Link href={"#"}>Real Estate</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span>Events/Type</span>
          <div>
            <ul>
              <li>
                <Link href={"#"}>E-book Promotion</Link>
              </li>
              <li>
                <Link href={"#"}>Event</Link>
              </li>
              <li>
                <Link href={"#"}>Product Launch</Link>
              </li>
              <li>
                <Link href={"#"}>Survey Campaign</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={"#"}>Transactional</Link>
              </li>
              <li>
                <Link href={"#"}>Welcome Series</Link>
              </li>
              <li>
                <Link href={"#"}>Webinar</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span>Functions</span>
          <div>
            <ul>
              <li>
                <Link href={"#"}>Human Resources</Link>
              </li>
              <li>
                <Link href={"#"}>Internal Comms</Link>
              </li>
              <li>
                <Link href={"#"}>Recruitment</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;
