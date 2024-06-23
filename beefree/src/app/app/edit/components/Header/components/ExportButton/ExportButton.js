"use client";

import React, { useState } from "react";
import { CiExport } from "react-icons/ci";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaFolder } from "react-icons/fa";
import { FaFileCode } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { notifyInfo } from "@/utils/toast";
import CopyHTML from "../CopyHTML/CopyHTML";

function ExportButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Button
        color="secondary"
        className="font-bold"
        onPress={onOpen}
        onClick={() => {
          setSelected(null);
        }}
      >
        <CiExport className="text-lg font-bold" /> Export
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selected === null
                  ? "Select an export option"
                  : "Copy the HTML"}
              </ModalHeader>
              <ModalBody>
                {selected === null ? (
                  <>
                    <div
                      className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
                      onClick={() => {
                        notifyInfo("This feature is not available yet.");
                      }}
                    >
                      <div>
                        <FaFolder className="text-3xl text-violet-600" />
                      </div>
                      <div>
                        <span className="text-xl font-bold">Get HTML file</span>
                        <p className="text-sm opacity-75">
                          Download a zip file that includes both HTML and
                          images.
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-x-2 cursor-pointer border-1 px-2 py-2"
                      onClick={() => {
                        setSelected("copyHTML");
                      }}
                    >
                      <div>
                        <FaFileCode className="text-3xl text-violet-600" />
                      </div>
                      <div>
                        <span className="text-xl font-bold">Copy the HTML</span>
                        <p className="text-sm opacity-75">
                          Get the code and leave the images online.
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
                        <IoMail className="text-3xl text-violet-600" />
                      </div>
                      <div>
                        <span className="text-xl font-bold">
                          Push to your sending system
                        </span>
                        <p className="text-sm opacity-75">
                          Export to Mailchimp, Brevo, ActiveCampaign, HubSpot,
                          etc.
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
                        <FaFileImage className="text-3xl text-violet-600" />
                      </div>
                      <div>
                        <span className="text-xl font-bold">
                          Download a PDF
                        </span>
                        <p className="text-sm opacity-75">
                          Get a printable version of your design.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <CopyHTML />
                )}
              </ModalBody>
              <ModalFooter>
                {selected === null ? (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => setSelected(null)}
                  >
                    Back
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExportButton;
