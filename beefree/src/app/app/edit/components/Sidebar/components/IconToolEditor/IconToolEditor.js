"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";

function IconToolEditor() {
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
  const iconSizeList = ["16px", "32px", "64px", "128px"];
  const iconSpaceList = ["0", "5", "10", "15", "20"];
  return (
    <div className="icon_tool h-[82%]">
      <EditOptions />
      <div className="bg-gray-50 h-full overflow-auto">
        <div className="px-5 py-5 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <span>Configure icon collection</span>
          <Button color="secondary" className="font-bold">
            <FaPlusCircle className="text-white" /> ADD NEW ICON
          </Button>
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
            <span>Icon Padding</span>
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
        <div className="px-5 py-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Icon size
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select icon size"
              className="max-w-xs"
              color="secondary"
            >
              {iconSizeList.map((size, index) => (
                <SelectItem key={index} value={index}>
                  {size}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <div className="px-5 py-2 gap-x-2 flex justify-between items-center">
          <span className="text-[14px] opacity-70 font-semibold">
            Icon spacing
          </span>
          <div className="flex-1 flex justify-end">
            <Select
              label="Select icon spacing"
              className="max-w-xs"
              color="secondary"
            >
              {iconSpaceList.map((space, index) => (
                <SelectItem key={index} value={index}>
                  {space}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
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

export default IconToolEditor;
