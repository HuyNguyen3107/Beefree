import React from "react";
import styles from "./integrations.module.scss";
import Image from "next/image";
import Link from "next/link";
import Acumbamail from "../../../assets/images/logo/acumbamail_logo.jpg";
import ActiveCampaign from "../../../assets/images/logo/ActiveCampaign_logo.png";
import Amazon from "../../../assets/images/logo/amazon.webp";
import Braze from "../../../assets/images/logo/Braze_logo.png";
import Brevo from "../../../assets/images/logo/Brevo-Logo.png";
import CampaignMonitor from "../../../assets/images/logo/Campaign_Monitor_logo.jpg";
import Gmail from "../../../assets/images/logo/mail_logo.png";
import HubSpot from "../../../assets/images/logo/HubSpot_logo.jpg";
import Klaviyo from "../../../assets/images/logo/Klaviyo_logo.png";
import Mailchimp from "../../../assets/images/logo/Mailchimp_logo.png";
import MailUp from "../../../assets/images/logo/MailUp_logo.png";
import Outlook from "../../../assets/images/logo/Outlook_logo.png";
import Pardot from "../../../assets/images/logo/Salesforce_logo.png";
import SendGrid from "../../../assets/images/logo/SendGrid_logo.png";
import Veeva from "../../../assets/images/logo/Veeva_logo.png";
import exploreSvg from "../../../../public/explore.svg";
import {FaAngleRight} from "react-icons/fa6";

function Integrations() {
  return (
    <div className={styles.mega_menu}>
      <div className={styles.connectors}>
        <span>CONNECTORS</span>
        <div>
          <ul>
            <li>
              <div>
                <Image
                  width={30}
                  height={30}
                  src={Acumbamail}
                  alt="Acumbamail"
                />
              </div>
              <div>
                <span>Acumbamail</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image
                  width={30}
                  height={30}
                  src={ActiveCampaign}
                  alt="Acumbamail"
                />
              </div>
              <div>
                <span>ActiveCampaign</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Amazon} alt="Acumbamail" />
              </div>
              <div>
                <span>Amazon</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Braze} alt="Acumbamail" />
              </div>
              <div>
                <span>Braze</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Brevo} alt="Acumbamail" />
              </div>
              <div>
                <span>Brevo</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image
                  width={30}
                  height={30}
                  src={CampaignMonitor}
                  alt="Acumbamail"
                />
              </div>
              <div>
                <span>Campaign Monitor</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div>
                <Image width={30} height={30} src={Amazon} alt="Acumbamail" />
              </div>
              <div>
                <span>Constant Contact</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Gmail} alt="Acumbamail" />
              </div>
              <div>
                <span>Gmail</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={HubSpot} alt="Acumbamail" />
              </div>
              <div>
                <span>HubSpot</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Klaviyo} alt="Acumbamail" />
              </div>
              <div>
                <span>Klaviyo</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image
                  width={30}
                  height={30}
                  src={Mailchimp}
                  alt="Acumbamail"
                />
              </div>
              <div>
                <span>Mailchimp</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={MailUp} alt="Acumbamail" />
              </div>
              <div>
                <span>MailUp</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div>
                <Image width={30} height={30} src={Outlook} alt="Acumbamail" />
              </div>
              <div>
                <span>Outlook Web</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Pardot} alt="Acumbamail" />
              </div>
              <div>
                <span>
                  Salesforce Account Engagement <br /> Pardot
                </span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Pardot} alt="Acumbamail" />
              </div>
              <div>
                <span>Salesforce Marketing Cloud</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={SendGrid} alt="Acumbamail" />
              </div>
              <div>
                <span>SendGrid</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Image width={30} height={30} src={Veeva} alt="Acumbamail" />
              </div>
              <div>
                <span>Veeva Vault</span>
                <div>
                  <Link href={"#"}>Templates</Link>
                  <Link href={"#"}>More info</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.explore}>
        <div>
          <Image width={150} height={150} src={exploreSvg} alt="explore" />
          <span>Export to any platform</span>
          <p>
            Learn how to easily export your emails and pages to your favorite
            ESPs, CRMs, and MAPs.
          </p>
          <span>
            Integrations <FaAngleRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Integrations;
