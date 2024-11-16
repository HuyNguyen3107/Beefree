import React from "react";
import CreateNewBtn from "./components/AddNewProject/CreateNewBtn";
import ProjectList from "./components/ProjectList/ProjectList";
import {cookies, headers} from "next/headers";
import {getSessionServer} from "@/utils/session";
import {ToastBox} from "@/utils/toast";
import OrderProject from "@/app/app/projects/components/OrderProject/OrderProject";
import Search from "@/app/app/projects/components/Search/Search";

async function Projects() {
    const session = await getSessionServer(headers().get("cookie"));
    const fullName = session?.data?.firstName + " " + session?.data?.lastName;
    const token = cookies().get("token");

    return (
        <section className="projects px-8 py-8">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Projects</h2>
                <CreateNewBtn/>
            </div>
            <form action="" className="flex justify-between mt-4">
                <OrderProject/>
                <Search/>
            </form>
            <ProjectList token={token} fullName={fullName}/>
            <ToastBox/>
        </section>
    );
}

export default Projects;
