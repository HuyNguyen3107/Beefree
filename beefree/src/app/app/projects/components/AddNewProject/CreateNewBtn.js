"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { notifyInfo } from "@/utils/toast";
import { FaFolderPlus } from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";
import CreateNewEmail from "../CreateNewEmail/CreateNewEmail";
import CreateNewPage from "../CreateNewPage/CreateNewPage";

import { getSessionClient } from "@/utils/session";

function CreateNewBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // useEffect(() => {
  //   getSessionClient().then((data) => {
  //     console.log("client", data.data.firstName, data.data.lastName);
  //   });
  // }, []);

  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        <FaPlus /> Create New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New
              </ModalHeader>
              <ModalBody>
                <>
                  <CreateNewEmail />
                  <CreateNewPage />
                  <div
                    className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
                    onClick={() => {
                      notifyInfo("This feature is not available yet.");
                    }}
                  >
                    <div>
                      <FaFolderPlus className="text-3xl text-violet-600" />
                    </div>
                    <div>
                      <span className="text-xl font-bold">
                        Create a new folder
                      </span>
                      <p className="text-sm opacity-75">
                        Organize and store your emails and pages. Move or copy
                        your folders, and the designs stored within.
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
                    onClick={() => {
                      notifyInfo("This feature is not available yet.");
                    }}
                  >
                    <div>
                      <FaFileArrowUp className="text-3xl text-violet-600" />
                    </div>
                    <div>
                      <span className="text-xl font-bold">
                        Import from another account
                      </span>
                      <p className="text-sm opacity-75">
                        Import a design from another account using the import
                        link shared with you and edit it as you wish.
                      </p>
                    </div>
                  </div>
                </>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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

export default CreateNewBtn;
