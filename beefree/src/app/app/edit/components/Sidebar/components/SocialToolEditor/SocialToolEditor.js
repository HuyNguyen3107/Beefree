"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import letterImg from "../../../../../../../assets/images/letter.png";
import { MdPhoneAndroid } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import { CiAlignLeft } from "react-icons/ci";
import { CiAlignRight } from "react-icons/ci";
import { CiAlignCenterH } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import EditOptions from "../EditOptions/EditOptions";

function SocialToolEditor() {
  const spacingList = ["5", "10", "15", "20"];
  return (
    <div className="social_tool h-screen">
      <EditOptions />
      <div className="bg-gray-50 h-[78%] overflow-auto">
        <div className="px-5 py-5 flex flex-col text-[14px] opacity-70 font-semibold gap-y-3">
          <span>Configure icon collection</span>
          <div>
            <div className="bg-white border rounded-sm px-3 py-3 flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <GiHamburgerMenu className="text-[24px]" />
                  <FaFacebook className="text-[24px]" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>More options</span>
                  <Switch defaultSelected color="secondary" />
                </div>
              </div>
              <div>
                <Input
                  key="secondary"
                  type="text"
                  color="secondary"
                  placeholder="Enter your URL"
                  label="URL"
                  defaultValue="https://www.youtube.com/watch?v=jrVhUjiB9Pk"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end">
                <Button color="danger" className="font-bold text-[12px]">
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <Button color="secondary" className="font-bold">
            <FaPlusCircle className="text-white" /> ADD NEW ICON
          </Button>
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
              {spacingList.map((space, index) => (
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

export default SocialToolEditor;
