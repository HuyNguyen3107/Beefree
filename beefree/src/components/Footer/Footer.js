import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import achiveSoc from "../../assets/images/achive1.webp";
import achiveIso from "../../assets/images/achive2.webp";
import netZero from "../../assets/images/netzero.webp";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <div>
            <Link href={"#"}>
              <Image width={100} height={50} src={logo} alt="logo" />
            </Link>
            <ul>
              <li>
                <Link href={"#"}>About us</Link>
              </li>
              <li>
                <Link href={"#"}>Become an Ambassador</Link>
              </li>
              <li>
                <Link href={"#"}>Become a template designer</Link>
              </li>
              <li>
                <Link href={"#"}>Careers</Link>
              </li>
              <li>
                <Link href={"#"}>
                  Beefree merch <FaArrowUpRightFromSquare />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href={"#"}>
              <FaInstagram />
            </Link>
            <Link href={"#"}>
              <FaXTwitter />
            </Link>
            <Link href={"#"}>
              <FaLinkedin />
            </Link>
            <Link href={"#"}>
              <FaFacebook />
            </Link>
            <Link href={"#"}>
              <FaPinterest />
            </Link>
            <Link href={"#"}>
              <FaYoutube />
            </Link>
          </div>
          <div>
            <span>Get updates from Beefree</span>
            <p>Subscribe now to be in the know</p>
            <form action="">
              <input type="email" placeholder="Type your email" />
              <button>Subscribe</button>
            </form>
            <p>
              By subscribing you agree to our{" "}
              <Link href={"#"}>Privacy Policy</Link>.
            </p>
          </div>
          <div>
            <Image width={80} height={80} src={achiveSoc} alt="SOC" />
            <Image width={80} height={80} src={achiveIso} alt="ISO" />
          </div>
        </div>
        <div>
          <div>
            <ul>
              <span>Product</span>
              <li>
                <Link href={"#"}>Features</Link>
              </li>
              <li>
                <Link href={"#"}>Templates</Link>
              </li>
              <li>
                <Link href={"#"}>Integrations</Link>
              </li>
              <li>
                <Link href={"#"}>Pricing & plans</Link>
              </li>
            </ul>
            <ul>
              <span>Solutions</span>
              <li>
                <Link href={"#"}>Agencies</Link>
              </li>
              <li>
                <Link href={"#"}>
                  Developers <FaArrowUpRightFromSquare />
                </Link>
              </li>
              <li>
                <Link href={"#"}>Nonprofits</Link>
              </li>
              <li>
                <Link href={"#"}>Higher Education</Link>
              </li>
              <li>
                <Link href={"#"}>Designers</Link>
              </li>
            </ul>
            <ul>
              <span>Developers</span>
              <li>
                <Link href={"#"}>
                  Beefree SDK
                  <FaArrowUpRightFromSquare />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  Docs
                  <FaArrowUpRightFromSquare />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  Pricing <FaArrowUpRightFromSquare />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <span>Resources</span>
              <li>
                <Link href={"#"}>
                  Help center <FaArrowUpRightFromSquare />
                </Link>
              </li>
              <li>
                <Link href={"#"}>Beefree Academy</Link>
              </li>
              <li>
                <Link href={"#"}>Webinars</Link>
              </li>
              <li>
                <Link href={"#"}>Customer stories</Link>
              </li>
              <li>
                <Link href={"#"}>Blog</Link>
              </li>
              <li>
                <Link href={"#"}>Book a demo</Link>
              </li>
              <li>
                <Link href={"#"}>Talk to sales</Link>
              </li>
              <li>
                <Link href={"#"}>Templates</Link>
              </li>
              <li>
                <Link href={"#"}>Design services</Link>
              </li>
              <li>
                <Link href={"#"}>
                  Community
                  <FaArrowUpRightFromSquare />
                </Link>
              </li>
              <li>
                <Link href={"#"}>Report a security issue</Link>
              </li>
              <li>
                <Link href={"#"}>Contact us</Link>
              </li>
              <li>
                <Link href={"#"}>Security and Compliance</Link>
              </li>
              <li>
                <Link href={"#"}>Brand Kit</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <span>Integrations</span>
              <li>
                <Link href={"#"}>Acumbamail</Link>
              </li>
              <li>
                <Link href={"#"}>ActiveCampaign</Link>
              </li>
              <li>
                <Link href={"#"}>Amazon SES</Link>
              </li>
              <li>
                <Link href={"#"}>Braze</Link>
              </li>
              <li>
                <Link href={"#"}>Brevo (Formerly Sendinblue)</Link>
              </li>
              <li>
                <Link href={"#"}>Campaign Monitor</Link>
              </li>
              <li>
                <Link href={"#"}>Constant Contact</Link>
              </li>
              <li>
                <Link href={"#"}>Gmail</Link>
              </li>
              <li>
                <Link href={"#"}>HubSpot</Link>
              </li>
              <li>
                <Link href={"#"}>Klaviyo</Link>
              </li>
              <li>
                <Link href={"#"}>Mailchimp</Link>
              </li>
              <li>
                <Link href={"#"}>MailUp</Link>
              </li>
              <li>
                <Link href={"#"}>Outlook Web</Link>
              </li>
              <li>
                <Link href={"#"}>Salesforce Account Engagement Pardot</Link>
              </li>
              <li>
                <Link href={"#"}>Salesforce Marketing Cloud</Link>
              </li>
              <li>
                <Link href={"#"}>SendGrid</Link>
              </li>
              <li>
                <Link href={"#"}>Veeva Vault</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className={styles.policy}>
        <Link href={"#"}>Privacy policy</Link>
        <Link href={"#"}>Cookies Preferences</Link>
        <Link href={"#"}>GDPR & Cyber security</Link>
        <Link href={"#"}>Beefree app terms of service</Link>
        <Link href={"#"}>Website terms of use</Link>
        <Link href={"#"}>
          <span>©Bee Content Design, Inc.</span> San Francisco, CA
        </Link>
        <Link href={"#"}>Part of Growens</Link>
        <Link href={"#"}>
          <Image width={200} height={50} src={netZero} alt="net zero" />
        </Link>
      </div>
    </>
  );
}

export default Footer;
