"use client";

import React, {useEffect, useState} from "react";
import {BsFillLaptopFill} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {projectSlice} from "@/redux/slice/projectSlice";
import {timeSince} from "@/utils/time";
import ProjectContent from "./components/ProjectContent";
import {client} from "@/utils/client";
import {builderSlice} from "@/redux/slice/builderSlice";
import {Card, CardBody} from "@nextui-org/react";
import {notifyWarning} from "@/utils/toast";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const {setProjectsData} = projectSlice.actions;

const {updateData, updateProjectInfo} = builderSlice.actions;

function ProjectList({token, fullName}) {
    const {accessToken} = JSON.parse(token.value);
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.project.projects);
    let search = useSelector((state) => state.search.search);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    let pathname = usePathname();
    let searchParams = useSearchParams();
    useEffect(() => {
        async function fetchProjects() {
            try {
                setIsLoading(true);
                if (!search) {
                    search = searchParams.toString();
                }
                let query = `?${search}`;
                localStorage.removeItem("mode");
                client.setToken(accessToken);
                const {response: emailResponse, data: emailData} = await client.get(
                    `/email${query}`
                );
                const {response: pageResponse, data: pageData} = await client.get(
                    `/page${query}`
                );

                let emailProjects = [];
                let pageProjects = [];

                if (emailResponse.ok) {
                    emailProjects = emailData?.data?.map((email) => {
                        return {
                            id: email.projectId,
                            name: email.name,
                            type: email.type,
                            data: JSON.parse(email.builderData),
                            createdAt: email.createdAt,
                        };
                    });
                }

                if (pageResponse.ok) {
                    pageProjects = pageData?.data?.map((page) => {
                        return {
                            id: page.projectId,
                            name: page.name,
                            type: page.type,
                            data: JSON.parse(page.builderData),
                            createdAt: page.createdAt,
                        };
                    });
                }

                const allProjects = [...emailProjects, ...pageProjects];

                if (allProjects.length) {
                    dispatch(setProjectsData(allProjects));
                }
                setIsLoading(false);

                if (emailResponse.status !== 200 && pageResponse.status !== 200) {
                    throw new Error(
                        "You don't have any projects"
                    );
                }
            } catch (error) {
                setIsLoading(false);
                notifyWarning(error.message);
            }
        }

        fetchProjects();
    }, [search]);
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="mt-4 flex gap-x-3 items-center overflow-auto">
                <span className="font-semibold">Designs</span>
                <span className="bg-gray-200 inline-block px-2 py-1 rounded-xl">
          {projects?.length}/10
        </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {projects?.length ? (
                    projects?.map((project, index) => {
                        return (
                            <div className="mt-4" key={index}>
                                <div className="col-span-1 relative">
                                    <div className="bg-gray-100  rounded-tl-xl rounded-tr-xl h-[250px]">
                                        <Card
                                            shadow="sm"
                                            key={index}
                                            isPressable
                                            onPress={() => {
                                                pathname = pathname.slice(0, pathname.lastIndexOf("/"));
                                                router.push(
                                                    `${pathname}/edit/${project?.type}/${project?.id}`
                                                );
                                            }}
                                            fullWidth={true}
                                            className="h-full"
                                        >
                                            <CardBody className="overflow-visible p-0">
                                                <ProjectContent data={project?.data}/>
                                            </CardBody>
                                        </Card>
                                        <div
                                            className="absolute top-4 right-4 flex items-center gap-x-3 bg-sky-950 px-1 py-1 text-indigo-600 rounded-lg"
                                        >
                                            <BsFillLaptopFill/>
                                            {project?.type}
                                        </div>
                                    </div>
                                    <div className="shadow-md px-2 py-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{project?.name}</span>
                                            <BiMessageDetail/>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <span>{fullName}</span>
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
            </div>
        </>
    );
}

export default ProjectList;
