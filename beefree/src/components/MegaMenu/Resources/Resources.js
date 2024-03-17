import React from "react";
import styles from "./resources.module.scss";
import Link from "next/link";
import Image from "next/image";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { ImFilePicture } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";
import { SiAffinitydesigner } from "react-icons/si";
import { SiSpringsecurity } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import storiesSvg from "../../../../public/stories.svg";

function Resources() {
  return (
    <div className={styles.mega_menu}>
      <div className={styles.resources}>
        <span>RESOURCES</span>
        <div>
          <ul>
            <li>
              <Link href={"#"}>
                <HiMiniQuestionMarkCircle />
                <span>
                  Help center <FaArrowUpRightFromSquare />
                </span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <FaPlusCircle />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <IoChatboxEllipses />
                <span>
                  Community <FaArrowUpRightFromSquare />
                </span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <MdVideoLibrary />
                <span>Beefree Academy</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <FaMicrophone />
                <span>Customer stories</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href={"#"}>
                <IoLogoYoutube />
                <span>Webinars</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <ImFilePicture />
                <span>Free templates</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <FaPencilAlt />
                <span>Design services</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <SiAffinitydesigner />
                <span>Become a template designer</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <SiSpringsecurity />
                <span>Security and compliance</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href={"#"}>
                <FaStar />
                <span>Become an Ambassador</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <RiFileList3Fill />
                <span>Talk to sales</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <IoIosWarning />
                <span>Report a security issue</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <IoMail />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.stories}>
        <div>
          <Image width={150} height={150} src={storiesSvg} alt="stories" />
          <div>
            <span>Customer stories</span>
            <p>
              Learn how Beefree accelerates email creation for better
              performance.
            </p>
            <span>
              Discover more <FaAngleRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
