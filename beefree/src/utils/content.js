import { CiText } from "react-icons/ci";
import { FaParagraph } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { BsFillUsbFill } from "react-icons/bs";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { FaArrowsAltH } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoCodeSlash } from "react-icons/io5";
import { TfiVideoClapper } from "react-icons/tfi";
import { FaRegStar } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { GiFilmStrip } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const contents = [
  {
    id: "title",
    icon: <CiText />,
    content: `<h1 style="font-size: 36px;
    font-weight: 700;
    color: blueviolet;
    text-align: left;
    width: 100%;
    padding: 0.5rem;">
      I'm a new block title
    </h1>`,
    contentCode: (
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          color: "blueviolet",
          textAlign: "left",
          width: "100%",
          padding: "0.5rem",
        }}
      >
        I'm a new block title
      </h1>
    ),
    editable: true,
    isShow: false,
  },
  {
    id: "paragraph",
    icon: <FaParagraph />,
    content: `<p style="font-size: 16px;
    font-weight: 400;
    text-align: left;
    width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;">
      I'm a new paragraph block.
    </p>`,
    contentCode: (
      <p
        style={{
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
          width: "100%",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        I'm a new paragraph block.
      </p>
    ),
    editable: true,
    isShow: false,
  },
  {
    id: "list",
    icon: <FaList />,
    content: `<ul style="font-size: 16px;
    font-weight: 400;
    text-align: left;
    list-style-type: disc;
    width: 100%;
    padding: 0.5rem;">
      <li>This is an unordered list</li>
    </ul>`,
    contentCode: (
      <ul
        style={{
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
          listStyleType: "disc",
          width: "100%",
          padding: "0.5rem",
        }}
      >
        <li>This is an unordered list</li>
      </ul>
    ),
    editable: true,
    isShow: false,
  },
  {
    id: "image",
    icon: <CiImageOn />,
    content: `<input type="file" style="padding: 0.5rem;"/>`,
    contentCode: (
      <input
        type="file"
        style={{
          padding: "0.5rem",
        }}
      />
    ),
    editable: false,
  },
  {
    id: "button",
    icon: <BsFillUsbFill />,
    content: `<button style="font-size: 16px;
    font-weight: 400;
    background-color: blueviolet;
    text-align: left;
    padding: 0.5rem 1rem;
    color: #fff;
    border-radius: 0.375rem;">
      Button
    </button>`,
    contentCode: (
      <button
        style={{
          fontSize: "16px",
          fontWeight: "400",
          backgroundColor: "blueviolet",
          textAlign: "left",
          padding: "0.5rem 1rem",
          color: "#fff",
          borderRadius: "0.375rem",
        }}
      >
        Button
      </button>
    ),
    editable: false,
  },
  {
    id: "divider",
    icon: <LuAlignVerticalSpaceAround />,
    content: `<div style="padding: 1rem;">
      <hr style="background-color: "#9CA3AF";
      width: 100%;
      height: 1px;"/>
    </div>`,
    contentCode: (
      <div
        style={{
          padding: "1rem",
        }}
      >
        <hr
          style={{
            backgroundColor: "#9CA3AF",
            width: "100%",
            height: "1px",
          }}
        />
      </div>
    ),
    editable: false,
  },
  {
    id: "spacer",
    icon: <FaArrowsAltH />,
    content: `<div style="height: 60px;
    width: 100%;"></div>`,
    contentCode: (
      <div
        style={{
          height: "60px",
          width: "100%",
        }}
      ></div>
    ),
    editable: false,
  },
  {
    id: "social",
    icon: <CiCirclePlus />,
    content: `<div style="width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 1.25rem;
    font-size: 20px;
    padding: 0.5rem;">
      <FaFacebook />
      <FaTwitter />
      <FaLinkedin />
      <FaInstagram />
    </div>`,
    contentCode: (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          columnGap: "1.25rem",
          fontSize: "20px",
          padding: "0.5rem",
        }}
      >
        <FaFacebook />
        <FaTwitter />
        <FaLinkedin />
        <FaInstagram />
      </div>
    ),
    editable: false,
  },
  {
    id: "html",
    icon: <IoCodeSlash />,
    content: `<div style="width: 100%;
    font-size: 16px;
    text-align: center;
    padding: 0.5rem;">
      I'm a new HTML block.
    </div>`,
    contentCode: (
      <div
        style={{
          width: "100%",
          fontSize: "16px",
          textAlign: "center",
          padding: "0.5rem",
        }}
      >
        I'm a new HTML block.
      </div>
    ),
    editable: false,
  },
  {
    id: "video",
    icon: <TfiVideoClapper />,
    content: `<input type="file" style="padding: 0.5rem;"/>`,
    contentCode: (
      <input
        type="file"
        style={{
          padding: "0.5rem",
        }}
      />
    ),
    editable: false,
  },
  {
    id: "icons",
    icon: <FaRegStar />,
    content: `<div style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
    color: #9CA3AF;
    font-weight: 600;
    background-color: rgb(212 212 216);;
    width: 100%;
    padding: 0.25rem;">
      <FaRegStar className="text-[36px]" />
      Icons
    </div>`,
    contentCode: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "0.5rem",
          color: "#9CA3AF",
          fontWeight: "600",
          backgroundColor: "rgb(212 212 216);",
          width: "100%",
          padding: "0.25rem",
        }}
      >
        <FaRegStar className="text-[36px]" />
        Icons
      </div>
    ),
    editable: false,
  },
  {
    id: "menu",
    icon: <IoMenu />,
    content: `<div style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
    color: #9CA3AF;
    font-weight: 600;
    background-color: rgb(212 212 216);;
    width: 100%;
    padding: 0.25rem;">
      <IoMenu className="text-[36px]" />
      Icons
    </div>`,
    contentCode: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "0.5rem",
          color: "#9CA3AF",
          fontWeight: "600",
          backgroundColor: "rgb(212 212 216);",
          width: "100%",
          padding: "0.25rem",
        }}
      >
        <IoMenu className="text-[36px]" />
        Icons
      </div>
    ),
    editable: false,
  },
  {
    id: "sticker",
    icon: <RiEmojiStickerLine />,
    content: `<input type="file" style="padding: 0.5rem;" />`,
    contentCode: (
      <input
        type="file"
        style={{
          padding: "0.5rem",
        }}
      />
    ),
    editable: false,
  },
  {
    id: "gif",
    icon: <GiFilmStrip />,
    content: `<input type="file" style="padding: 0.5rem;" />`,
    contentCode: (
      <input
        type="file"
        style={{
          padding: "0.5rem",
        }}
      />
    ),
    editable: false,
  },
];
