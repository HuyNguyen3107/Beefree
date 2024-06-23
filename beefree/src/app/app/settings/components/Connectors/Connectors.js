"use client";

import React from "react";
import Acumbamail from "../../../../../assets/images/logo/acumbamail_logo.jpg";
import ActiveCampaign from "../../../../../assets/images/logo/ActiveCampaign_logo.png";
import Amazon from "../../../../../assets/images/logo/amazon.webp";
import Braze from "../../../../../assets/images/logo/Braze_logo.png";
import Brevo from "../../../../../assets/images/logo/Brevo-logo.png";
import CampaignMonitor from "../../../../../assets/images/logo/Campaign_Monitor_logo.jpg";
import Gmail from "../../../../../assets/images/logo/mail_logo.png";
import HubSpot from "../../../../../assets/images/logo/HubSpot_logo.jpg";
import Klaviyo from "../../../../../assets/images/logo/Klaviyo_logo.png";
import Mailchimp from "../../../../../assets/images/logo/Mailchimp_logo.png";
import MailUp from "../../../../../assets/images/logo/MailUp_logo.png";
import Outlook from "../../../../../assets/images/logo/Outlook_logo.png";
import Pardot from "../../../../../assets/images/logo/Salesforce_logo.png";
import SendGrid from "../../../../../assets/images/logo/SendGrid_logo.png";
import Veeva from "../../../../../assets/images/logo/Veeva_logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";

function Connectors() {
  // class tailwind css for layout with 3 items in a row and have many rows and all items have the same width and height width box-shadow
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Acumbamail} alt="Acumbamail" />
          <span>Acumbamail</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={ActiveCampaign} alt="ActiveCampaign" />
          <span>ActiveCampaign</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Amazon} alt="Amazon" />
          <span>Amazon SES</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Braze} alt="Braze" />
          <span>Braze</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Brevo} alt="Brevo" />
          <span>Brevo</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={CampaignMonitor} alt="CampaignMonitor" />
          <span>Campaign Monitor</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Gmail} alt="Gmail" />
          <span>Gmail</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={HubSpot} alt="HubSpot" />
          <span>HubSpot</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Klaviyo} alt="Klaviyo" />
          <span>Klaviyo</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Mailchimp} alt="Mailchimp" />
          <span>Mailchimp</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={MailUp} alt="MailUp" />
          <span>MailUp</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Outlook} alt="Outlook" />
          <span>Outlook</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Pardot} alt="Pardot" />
          <span>Pardot</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={SendGrid} alt="SendGrid" />
          <span>SendGrid</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between">
        <div className="flex items-center gap-x-2 font-semibold">
          <Image width={40} src={Veeva} alt="Veeva" />
          <span>Veeva</span>
        </div>
        <Button color="secondary">Connect</Button>
      </div>
    </div>
  );
}

export default Connectors;
