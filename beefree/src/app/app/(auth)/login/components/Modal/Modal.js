"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { notifySuccess, notifyError } from "@/utils/toast";
import { handleResetPassword } from "./action";

function ModalForgotPassword({ onSetIsLoading: setIsLoading }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const formRef = React.useRef(null);
  return (
    <>
      <div
        onClick={onOpen}
        style={{
          cursor: "pointer",
        }}
      >
        Forgot your password?
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
              <ModalHeader className="flex flex-col gap-1">
                Enter your email
              </ModalHeader>
              <ModalBody>
                <Input
                  key={"secondary"}
                  type="email"
                  color={"secondary"}
                  label="Email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={() => {
                    formRef.current.requestSubmit();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
              <form
                action={async (form) => {
                  const response = await handleResetPassword(email);
                  if (!response.success) {
                    notifyError(response.error);
                    return;
                  }
                  notifySuccess("Password reset link sent to your email");
                  onClose();
                }}
                style={{ display: "none" }}
                ref={formRef}
              ></form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForgotPassword;
