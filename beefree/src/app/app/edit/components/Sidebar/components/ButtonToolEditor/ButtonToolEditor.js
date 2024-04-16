"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { FaMagic } from "react-icons/fa";
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
import { Input } from "@nextui-org/react";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import EditOptions from "../EditOptions/EditOptions";

function ButtonToolEditor() {
  const styleBorderList = ["solid", "dotted", "dashed"];
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
  const imageLinkList = [
    "Open web page",
    "Send Email",
    "Make call",
    "Send SMS",
  ];
  return (
    <div className="title_tool h-[56%]">
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          ARTIFICIAL INTELLIGENCE
        </div>
        <div className="px-5 py-3">
          <Button color="secondary" className="font-bold text-[14px]">
            <FaMagic /> Write with AI
          </Button>
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          ACTION
        </div>
        <div className="px-5 py-3 text-[14px] opacity-70 font-semibold flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <span>Image link</span>
            <Select className="max-w-xs" color="secondary">
              {imageLinkList.map((linkType, index) => (
                <SelectItem key={index} value={index}>
                  {linkType}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-x-2 items-center">
            <span>URL</span>
            <Input
              key="secondary"
              type="text"
              color="secondary"
              placeholder="Enter your URL"
              defaultValue="https://www.youtube.com/watch?v=jrVhUjiB9Pk"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-x-2 font-normal text-violet-600">
            <Link href={"#"}>Special links</Link>
            <span>|</span>
            <Link href={"#"}>Link file</Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-1 px-5 py-3 text-[12px] font-bold opacity-80 bg-gray-200">
          BUTTON OPTIONS
        </div>
        <div className="px-5 py-3 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <div className="flex items-center justify-between">
            <span>Auto width</span>
            <Switch defaultSelected color="secondary" />
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
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Font size
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[22px]">
            <div className="flex border rounded-sm">
              <div className="bg-white px-2 border text-[14px] cursor-pointer">
                -
              </div>
              <div className="bg-gray-200 border text-[15px] ">
                <input
                  type="text"
                  defaultValue={"0"}
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
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Background color
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
            Text color
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
            <CiAlignLeft />
            <CiAlignCenterH />
            <CiAlignRight />
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
                  defaultValue={"0"}
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
            Border radius
          </span>
          <div className="flex-1 flex justify-end gap-x-3 text-[24px]">
            <MdFormatTextdirectionLToR />
            <MdFormatTextdirectionRToL />
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
                  defaultValue={"0"}
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
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Content Padding</span>
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
                    defaultValue={"0"}
                    className="w-[40px] text-center outline-none"
                  />
                </div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div>
              <Image src={letterImg} alt="letter" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 py-5 flex flex-col gap-y-4">
          <div className="flex items-center justify-between text-[14px] opacity-70 font-semibold">
            <span>Border</span>
            <div className="flex items-center gap-x-2">
              <span>More options</span>
              <Switch defaultSelected color="secondary" />
            </div>
          </div>
          <div className="flex justify-between text-[14px] opacity-70 font-semibold items-center gap-x-3">
            <div className="flex flex-col gap-y-2">
              <span>All sides</span>
            </div>
            <div className="flex-1 flex flex-col gap-y-2">
              <div className="flex-1 flex justify-end">
                <Select
                  label="Select border style"
                  className="max-w-xs"
                  color="secondary"
                >
                  {styleBorderList.map((style, index) => (
                    <SelectItem key={index} value={index}>
                      {style}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex rounded-sm justify-end">
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  -
                </div>
                <div className="bg-gray-200 border text-[15px] ">
                  <input
                    type="text"
                    defaultValue={"0"}
                    className="w-[40px] text-center border outline-none"
                  />
                </div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="bg-white px-2 py-1 rounded-md border">
                  <input type="color" />
                </div>
              </div>
            </div>
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
                    defaultValue={"0"}
                    className="w-[40px] text-center outline-none"
                  />
                </div>
                <div className="bg-white px-2 border text-[14px] cursor-pointer">
                  +
                </div>
              </div>
            </div>
            <div>
              <Image src={letterImg} alt="letter" />
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

export default ButtonToolEditor;
