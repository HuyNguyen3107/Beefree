import React from "react";
import { CiSearch } from "react-icons/ci";
import CreateNewBtn from "./components/AddNewProject/CreateNewBtn";
import ProjectList from "./components/ProjectList/ProjectList";

function Projects() {
  return (
    <section className="projects px-8 py-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <CreateNewBtn />
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
      <ProjectList />
    </section>
  );
}

export default Projects;
