"use client";

import React from "react";
import {BsLaptopFill} from "react-icons/bs";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {projectSlice} from "@/redux/slice/projectSlice";
import Image from "next/image";
import {notifyWarning} from "@/utils/toast";
import bankAccountImage from "../../../../../assets/images/bank-account.jpg";

const {addNewProject} = projectSlice.actions;

function CreateNewPage() {
    const dispatch = useDispatch();
    let pathname = usePathname();
    const router = useRouter();
    const projectList = useSelector((state) => state.project.projects);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const handleAddPage = () => {
        if (projectList.length === 10) {
            notifyWarning("Update your account to create more projects.");
            onOpen();
            return;
        }
        const id = uuidv4();
        const type = "page";
        pathname = pathname.slice(0, pathname.lastIndexOf("/"));
        router.push(`${pathname}/edit/page/${id}`);
        localStorage.setItem("mode", "create");
        dispatch(addNewProject({id, type}));
    };
    return (
        <>
            <div
                className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
                onClick={() => {
                    handleAddPage();
                }}
            >
                <div>
                    <BsLaptopFill className="text-3xl text-violet-600"/>
                </div>
                <div>
                    <span className="text-xl font-bold">Create a new page</span>
                    <p className="text-sm opacity-75">
                        Design a beautiful page, host it on Beefree, or use it on your
                        website. Start with a template or from a blank canvas.
                    </p>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <h3 className="text-2xl text-white">
                                    Update your account to pro
                                </h3>
                                <p>
                                    Upgrade your account to pro to discover more features and create more projects.
                                </p>
                                <p className="italic">
                                    With only $9.99 per month, you can create unlimited projects and access to all
                                    features you need.
                                </p>
                                <Image src={bankAccountImage} alt={'bank'}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateNewPage;
