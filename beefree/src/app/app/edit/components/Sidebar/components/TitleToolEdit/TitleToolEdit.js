"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { BsChatSquare } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { IoCopySharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaMagic } from "react-icons/fa";
import { TfiAlignLeft } from "react-icons/tfi";
import { TfiAlignRight } from "react-icons/tfi";
import { TfiAlignCenter } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoMdMenu } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { MdFormatTextdirectionLToR } from "react-icons/md";
import { MdFormatTextdirectionRToL } from "react-icons/md";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";

function TitleToolEdit() {
  const headTagList = ["H1", "H2", "H3", "H4", "H5", "H6"];
  const fontFamilyList = [
    "Default",
    "Arial",
    "Courier New",
    "Georgia",
    "Lucida Sans Unicode",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Helvetica",
    "Impact",
    "Verdana",
  ];
  const fontWeightList = ["Bold", "Regular"];
  return (
    <div className="title_tool">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80">
          CONTENT PROPERTIES
        </div>
        <div className="flex items-center">
          <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
            <BsChatSquare />
          </div>
          <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
            <CiTrash />
          </div>
          <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
            <IoCopySharp />
          </div>
          <div className="px-4 py-2 border-l text-[18px] cursor-pointer">
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <div className="px-5 py-3">
          <Button color="secondary" className="font-bold text-[14px]">
            <FaMagic /> Write with AI
          </Button>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Title</span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select head tag"
              className="max-w-xs"
              color="secondary"
            >
              {headTagList.map((headTag, index) => (
                <SelectItem key={index} value={index}>
                  {headTag}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font family
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select font family"
              className="max-w-xs"
              color="secondary"
            >
              {fontFamilyList.map((font, index) => (
                <SelectItem key={index} value={index}>
                  {font}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font weight
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select font-weight"
              className="max-w-xs"
              color="secondary"
            >
              {fontWeightList.map((font, index) => (
                <SelectItem key={index} value={index}>
                  {font}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Text color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border">
              <input type="color" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Link color
          </span>
          <div className="flex-1 flex justify-end">
            <div className="bg-white px-2 py-1 rounded-md border">
              <input type="color" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">Align</span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <TfiAlignLeft />
            <TfiAlignRight />
            <TfiAlignCenter />
            <TfiAlignJustify />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Line height
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <IoMdMenu />
            <HiMenu />
            <AiOutlineMenu />
            <CiMenuBurger />
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Letter spacing
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div className="bg-white px-2 border text-[14px] cursor-pointer">
                -
              </div>
              <div className="bg-gray-200 border text-[15px] ">
                <input
                  type="text"
                  value={"0"}
                  className="w-[40px] text-center outline-none"
                />
              </div>
              <div className="bg-white px-2 border text-[14px] cursor-pointer">
                +
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Text direction
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[24px]">
            <MdFormatTextdirectionLToR />
            <MdFormatTextdirectionRToL />
          </div>
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BLOCK OPTIONS
        </div>
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Padding</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch defaultSelected color="secondary" />
            </div>
          </div>
          <div className="flex justify-between text-[14px] opacity-70 font-semibold">
            <div className="flex flex-col gap-y-2">
              <span>All sides</span>
              <div className="flex border rounded-sm">
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  -
                </div>
                <div className="bg-gray-200 border text-[15px] ">
                  <input
                    type="text"
                    value={"0"}
                    className="w-[40px] text-center outline-none"
                  />
                </div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div>
              <Image src={letterImg} alt="letter" width={100} height={100} />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 flex justify-between text-[14px] opacity-70 font-semibold items-center">
          <span>Hide on</span>
          <div className="flex items-center border text-[18px]">
            <div className="px-2 py-2 cursor-pointer border-r rounded-sm">
              <FaDesktop />
            </div>
            <div className="px-2 py-2 cursor-pointer">
              <MdPhoneAndroid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleToolEdit;
