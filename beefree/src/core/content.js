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
    icon: <CiText className="opacity-50" />,
    content: `<h1 style="font-size: 36px; font-weight: 700; color: blueviolet; text-align: left; width: 100%; padding: 0.5rem;">
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
    icon: <FaParagraph className="opacity-50" />,
    content: `<div style="text-align: left;
    width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem; display: flex; flex-direction: column;">
    <p>
      I'm a new paragraph block.
    </p></div>`,
    contentCode: (
      <div
        style={{
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
          width: "100%",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        <p>I'm a new paragraph block.</p>
      </div>
    ),
    editable: true,
    isShow: false,
  },
  {
    id: "list",
    icon: <FaList className="opacity-50" />,
    content: `<ul style="font-size: 16px;
    font-weight: 400;
    text-align: left;
    list-style-type: disc;
    width: 100%;
    padding: 0.5rem; list-style-position: inside; display: flex; flex-direction: column;">
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
          listStylePosition: "inside",
          display: "flex",
          flexDirection: "column",
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
    icon: <CiImageOn className="opacity-50" />,
    content: `
    <div
    style="padding: 1rem; display: flex; flex-direction: column; align-items: center; row-gap: 10px; background-color: #f3f3f3; border: 1px dashed #000;"
  >
    <i
      className="pi pi-images"
      style="font-size: 40px; color: #93989A;"
    ></i>
    <span
      style="font-size: 14px; color: #93989A;"
    >
      Drop your file here
    </span>
    <button
      id="upload_image"
      style="background-color: #93989A; color: #fff; font-weight: 700; font-size: 15px; padding: 4px 8px; border-radius: 4px;"
    >
      Browse
    </button>
  </div>
    `,
    contentCode: (
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "10px",
          backgroundColor: "#f3f3f3",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-images"
          style={{
            fontSize: "40px",
            color: "#93989A",
          }}
        ></i>
        <span
          style={{
            fontSize: "14px",
            color: "#93989A",
          }}
        >
          Drop your file here
        </span>
        <button
          id="upload_image"
          style={{
            backgroundColor: "#93989A",
            color: "#fff",
            fontWeight: "700",
            fontSize: "15px",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Browse
        </button>
      </div>
    ),
    editable: false,
  },
  {
    id: "button",
    icon: <BsFillUsbFill className="opacity-50" />,
    content: `<button style="font-size: 16px;
    font-weight: 400;
    background-color: blueviolet;
    text-align: center;
    padding: 0.5rem 1rem;
    color: #fff;
    border-radius: 0.375rem; margin: 10px auto; display: block;">
      Button
    </button>`,
    contentCode: (
      <button
        style={{
          fontSize: "16px",
          fontWeight: "400",
          backgroundColor: "blueviolet",
          textAlign: "center",
          padding: "0.5rem 1rem",
          color: "#fff",
          borderRadius: "0.375rem",
          margin: "10px auto",
          display: "block",
        }}
      >
        Button
      </button>
    ),
    editable: false,
  },
  {
    id: "divider",
    icon: <LuAlignVerticalSpaceAround className="opacity-50" />,
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
    icon: <FaArrowsAltH className="opacity-50" />,
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
    icon: <CiCirclePlus className="opacity-50" />,
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
    icon: <IoCodeSlash className="opacity-50" />,
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
    icon: <TfiVideoClapper className="opacity-50" />,
    content: `
    <div
    style="padding: 1rem; display: flex; flex-direction: column; align-items: center; row-gap: 10px; background-color: #f3f3f3; border: 1px dashed #000;"
  >
    <i
      className="pi pi-video"
      style="font-size: 50px; color: #93989A;"
    ></i>
    <span
      style="font-size: 14px; color: #93989A; font-weight: 700;"
    >
      Video
    </span>
  </div>
    `,
    contentCode: (
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "10px",
          backgroundColor: "#f3f3f3",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-video"
          style={{
            fontSize: "50px",
            color: "#93989A",
          }}
        ></i>
        <span
          style={{
            fontSize: "14px",
            color: "#93989A",
            fontWeight: "700",
          }}
        >
          Video
        </span>
      </div>
    ),
    editable: false,
  },
  {
    id: "icons",
    icon: <FaRegStar className="opacity-50" />,
    content: `<div style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
    color: #9CA3AF;
    font-weight: 600;
    background-color: #f3f3f3;
    width: 100%;
    padding: 0.25rem; border: 1px dashed #000;">
      <i className="pi pi-star" style="font-size: 50px;"></i>
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
          backgroundColor: "#f3f3f3",
          width: "100%",
          padding: "0.25rem",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-star"
          style={{
            fontSize: "50px",
          }}
        ></i>
        Icons
      </div>
    ),
    editable: false,
  },
  {
    id: "menu",
    icon: <IoMenu className="opacity-50" />,
    content: `<div style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.5rem;
    color: #9CA3AF;
    font-weight: 600;
    background-color: #f3f3f3;
    width: 100%;
    padding: 0.25rem; border: 1px dashed #000;">
      <i className="pi pi-bars" style="font-size: 40px;"></i>
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
          backgroundColor: "#f3f3f3",
          width: "100%",
          padding: "0.25rem",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-bars"
          style={{
            fontSize: "40px",
          }}
        ></i>
        Menu
      </div>
    ),
    editable: false,
  },
  {
    id: "sticker",
    icon: <RiEmojiStickerLine className="opacity-50" />,
    content: `
    <div
    style="padding: 1rem; display: flex; flex-direction: column; align-items: center; row-gap: 10px; background-color: #f3f3f3; border: 1px dashed #000;"
  >
    <i
      className="pi pi-prime"
      style="font-size: 40px; color: #93989A;"
    ></i>
    <button
      id="upload_sticker"
      style="background-color: #93989A; color: #fff; font-weight: 700; font-size: 15px; padding: 4px 8px; border-radius: 4px;"
    >
      Browse Stickers
    </button>
  </div>
    `,
    contentCode: (
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "10px",
          backgroundColor: "#f3f3f3",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-prime"
          style={{
            fontSize: "40px",
            color: "#93989A",
          }}
        ></i>
        <button
          id="upload_sticker"
          style={{
            backgroundColor: "#93989A",
            color: "#fff",
            fontWeight: "700",
            fontSize: "15px",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Browse Stickers
        </button>
      </div>
    ),
    editable: false,
  },
  {
    id: "gif",
    icon: <GiFilmStrip className="opacity-50" />,
    content: `
    <div
    style="padding: 1rem; display: flex; flex-direction: column; align-items: center; row-gap: 10px; background-color: #f3f3f3; border: 1px dashed #000;"
  >
    <i
      className="pi pi-prime"
      style="font-size: 40px; color: #93989A;"
    ></i>
    <button
      id="upload_gif"
      style="background-color: #93989A; color: #fff; font-weight: 700; font-size: 15px; padding: 4px 8px; border-radius: 4px;"
    >
      Browse Stickers
    </button>
  </div>
    `,
    contentCode: (
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "10px",
          backgroundColor: "#f3f3f3",
          border: "1px dashed #000",
        }}
      >
        <i
          className="pi pi-file"
          style={{
            fontSize: "40px",
            color: "#93989A",
          }}
        ></i>
        <button
          id="upload_gif"
          style={{
            backgroundColor: "#93989A",
            color: "#fff",
            fontWeight: "700",
            fontSize: "15px",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Browse Stickers
        </button>
      </div>
    ),
    editable: false,
  },
];
