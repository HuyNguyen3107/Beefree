"use client";
import React from "react";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { MdHome } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { changeUploadFileStatus } = builderSlice.actions;
import { TbCaretUpDownFilled } from "react-icons/tb";
import avatar from "../../../../../assets/images/myAvatar.jpg";

function FileMange() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changeUploadFileStatus(false));
  };
  return (
    <div className="file_mange">
      <div className="flex flex-col px-8 py-4 gap-y-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <h2 className="font-bold text-[18px] opacity-75">File Manager</h2>
            <div className="bg-violet-500 text-white text-[14px] font-semibold rounded-md">
              <label
                htmlFor="upload"
                className="cursor-pointer px-10 py-1 block"
              >
                Upload
              </label>
              <input type="file" id="upload" hidden />
            </div>
            <div className="bg-gray-400 text-white px-10 py-1 text-[14px] font-semibold rounded-md cursor-pointer">
              Import
            </div>
            <div className="bg-gray-400 text-white px-10 py-1 text-[14px] font-semibold rounded-md cursor-pointer">
              Search free photos
            </div>
          </div>
          <div onClick={handleClick}>
            <TiDelete className="text-[30px] cursor-pointer" />
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center text-gray-400">
          <div className="text-[20px] bg-gray-200 h-fit w-fit px-3 py-3 rounded-full shadow-md">
            <MdHome />
          </div>
          <div className="flex gap-x-4 items-center">
            <div className="flex gap-x-3 text-[20px] items-center">
              <BsFillGrid3X3GapFill />
              <TiThMenu />
            </div>
            <span>|</span>
            <form action="">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in folder"
                  className="bg-gray-100 pl-2 pr-6 py-1 rounded-sm outline-none"
                />
                <FaSearch className="absolute top-1/2 right-0 -translate-y-2/4 right-1" />
              </div>
              <button hidden></button>
            </form>
            <FaFolderPlus className="text-[24px]" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="w-4/5 m-auto flex justify-between items-center">
          <div className="flex items-center gap-x-6">
            <input type="checkbox" />
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>NAME</span>
            </div>
          </div>
          <div className="flex items-center gap-x-28">
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>DATE</span>
            </div>
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>SIZE</span>
            </div>
            <div className="flex items-center text-gray-400 font-bold text-[14px] opacity-80 cursor-pointer">
              <TbCaretUpDownFilled />
              <span>TYPE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 m-auto pt-10 flex flex-wrap">
        <div className="px-4 py-4 shadow-md rounded-lg flex w-1/3 gap-x-4">
          <div className="relative">
            <Image src={avatar} alt="avatar" width={150} height={150} />
            <div className="absolute bg-white w-fit h-fit px-1 py-1 top-0 left-0 rounded-br-md">
              <input type="checkbox" />
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col ">
              <span className="text-[14px] text-gray-500">3/9/2024</span>
              <span className="font-bold opacity-85">myAvatar.jpg</span>
              <div className="flex gap-x-2 text-[14px] text-gray-500">
                <span>168.4 KB</span>
                <span>|</span>
                <span>jpg</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <hr />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 text-[18px] text-gray-700 cursor-pointer">
                  <LuArrowUpRightSquare />
                  <FaTrashAlt />
                </div>
                <button className="bg-violet-500 text-white px-4 py-1 font-semibold text-[14px] rounded-sm">
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileMange;
