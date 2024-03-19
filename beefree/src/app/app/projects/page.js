import React from "react";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsFillLaptopFill } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { MdOutlineQuestionMark } from "react-icons/md";
import Image from "next/image";
import myAvatar from "../../../assets/images/myAvatar.jpg";

function Projects() {
  return (
    <section className="projects px-8 py-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button color="secondary">
          <FaPlus /> Create New
        </Button>
      </div>
      <form action="" className="flex justify-between mt-4">
        <div className="border flex items-center px-2 py-2 rounded-sm">
          <label htmlFor="order" className="font-semibold">
            Order By:
          </label>
          <select name="order" id="order">
            <option value="0">Created</option>
            <option value="1">Last updated</option>
            <option value="2">Name</option>
          </select>
        </div>
        <div className="flex gap-x-3">
          <div className="border flex items-center px-2 py-2 rounded-sm">
            <label htmlFor="type" className="font-semibold">
              Type:
            </label>
            <select name="type" id="type">
              <option value="0">All</option>
              <option value="1">Email</option>
              <option value="2">Page</option>
            </select>
          </div>
          <div className="flex items-center border flex items-center rounded-sm">
            <input
              type="text"
              placeholder="Search in Your Workspace"
              className="px-2 py-2"
            />
            <div className="bg-indigo-300 h-full px-2 py-2 flex items-center justify-center text-indigo-600">
              <CiSearch className="font-bold text-lg" />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 flex gap-x-3 items-center">
        <span className="font-semibold">Designs</span>
        <span className="bg-gray-200 inline-block px-2 py-1 rounded-xl">
          1/10
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4">
        <div className="col-span-1 relative">
          <div className="bg-gray-100 px-3 py-3 rounded-tl-xl rounded-tr-xl">
            <Image src={myAvatar} alt="projects image" />
            <div className="absolute top-4 right-4 flex items-center gap-x-3 bg-sky-950 px-1 py-1 text-indigo-600 rounded-lg">
              <BsFillLaptopFill />
              Page
            </div>
          </div>
          <div className="shadow-md px-2 py-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold">New Page</span>
              <BiMessageDetail />
            </div>
            <div className="flex items-center justify-between mt-4">
              <span>Nguyen Manh Huy</span>
              <span>6 days ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-violet-700 w-fit fixed bottom-10 right-10 px-4 py-4 rounded-full">
        <span className="absolute -top-4 -left-4 bg-red-500 text-white w-fit px-2 py-1 rounded-full h-fit">
          2
        </span>
        <MdOutlineQuestionMark className="text-white font-extrabold text-xl" />
      </div>
    </section>
  );
}

export default Projects;
