"use client";

import React from "react";
import { BsFillLaptopFill } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { projectSlice } from "@/redux/slice/projectSlice";
import { timeSince } from "@/utils/time";
import ProjectContent from "./components/ProjectContent";
const { addNewProject } = projectSlice.actions;

function ProjectList() {
  const projects = useSelector((state) => state.project.projects);
  return (
    <>
      <div className="mt-4 flex gap-x-3 items-center">
        <span className="font-semibold">Designs</span>
        <span className="bg-gray-200 inline-block px-2 py-1 rounded-xl">
          {projects?.length}/10
        </span>
      </div>
      {projects?.length ? (
        projects?.map((project, index) => {
          return (
            <div className="mt-4 grid grid-cols-4" key={index}>
              <div className="col-span-1 relative">
                <div className="bg-gray-100 px-3 py-3 rounded-tl-xl rounded-tr-xl h-[100px]">
                  <ProjectContent data={project?.data} />
                  <div className="absolute top-4 right-4 flex items-center gap-x-3 bg-sky-950 px-1 py-1 text-indigo-600 rounded-lg">
                    <BsFillLaptopFill />
                    {project?.type}
                  </div>
                </div>
                <div className="shadow-md px-2 py-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{project?.name}</span>
                    <BiMessageDetail />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span>Nguyen Manh Huy</span>
                    <span>{timeSince(project?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-[20px] font-semibold text-violet-600 mt-4">
          No projects available
        </p>
      )}
    </>
  );
}

export default ProjectList;
