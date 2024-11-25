"use client";

import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { projectSlice } from "@/redux/slice/projectSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { usePathname } from "next/navigation";
import { convertDataToHTML } from "@/core/convert";
import { getSessionClient } from "@/utils/session";
import { client } from "@/utils/client";
const { updateProject } = projectSlice.actions;

function SaveButton({ accessToken }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const data = useSelector((state) => state.builder.data);
  const projectInfo = useSelector((state) => state.builder.projectInfo);
  const [userId, setUserId] = React.useState(null);
  const [mode, setMode] = React.useState("edit");
  useEffect(() => {
    getSessionClient().then((data) => {
      setUserId(data?.data?.id);
    });
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    }
  }, []);
  return (
    <Button
      color="secondary"
      className="font-bold"
      onClick={async () => {
        if (data?.rows?.length === 0) {
          notifyError("Please add a block to save the project!");
          return;
        }

        if (!mode) {
          notifyError("Mode not set!");
          return;
        }
        const arrPath = pathname.split("/");
        const type = arrPath[arrPath.length - 2];
        const projectId = arrPath[arrPath.length - 1];
        let name = projectInfo.name;
        const dataHTML = convertDataToHTML(data);
        const dataJSON = JSON.stringify(data);
        if (typeof name !== "string") {
          name = name.name;
        }
        const project = {
          projectId,
          name,
          data: dataHTML,
          builderData: dataJSON,
          type,
          userId,
        };
        client.setToken(accessToken);
        try {
          if (mode === "create") {
            let response;
            if (type === "email") {
              const { response: emailRes, data } = await client.post(
                "/email",
                project
              );
              response = emailRes;
            } else if (type === "page") {
              const { response: pageRes, data } = await client.post(
                "/page",
                project
              );
              response = pageRes;
            } else {
              throw new Error("Invalid project type");
            }
            if (response.ok) {
              notifySuccess("Created!");
              setMode("edit");
              localStorage.removeItem("mode");
            } else {
              throw new Error("Failed to create project");
            }
          }
          if (mode === "edit") {
            let updateData = {
              name,
              data: dataHTML,
              builderData: dataJSON,
            };
            let response;
            if (type === "email") {
              const { response: emailRes, data } = await client.patch(
                `/email/${projectId}`,
                updateData
              );
              response = emailRes;
            } else if (type === "page") {
              const { response: pageRes, data } = await client.patch(
                `/page/${projectId}`,
                updateData
              );
              response = pageRes;
            } else {
              throw new Error("Invalid project type");
            }
            if (response.ok) {
              notifySuccess("Updated!");
            } else {
              throw new Error("Failed to update project");
            }
          }
        } catch (error) {
          notifyError(error.message);
        }
      }}
    >
      Save
    </Button>
  );
}

export default SaveButton;
