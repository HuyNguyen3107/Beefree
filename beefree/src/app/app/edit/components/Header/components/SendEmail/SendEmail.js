"use client";
import React from 'react';
import {VscSend} from "react-icons/vsc";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {isEmailValid} from "@/utils/regex";
import {useSelector} from "react-redux";
import {convertDataToHTML} from "@/core/convert";
import {client} from "@/utils/client";
import {notifyError, notifySuccess} from "@/utils/toast";

function SendEmail({accessToken}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [email, setEmail] = React.useState("");
    const data = useSelector((state) => state.builder.data);
    const [loading, setLoading] = React.useState(false);
    return (
        <>
            <VscSend onClick={onOpen}/>
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
                            <ModalHeader className="flex flex-col gap-1">Enter your Email</ModalHeader>
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
                                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" isDisabled={loading}
                                    onPress={async () => {
                                        if (!email) {
                                            notifyError("Please enter your email");
                                            onClose();
                                            return;
                                        }
                                        if (isEmailValid(email)) {
                                            setLoading(true);
                                            const html = convertDataToHTML(data);
                                            client.setToken(accessToken);
                                            const {response} = await client.post("/send", {
                                                to: email,
                                                subject: "Email from Beefree",
                                                message: html,
                                            })
                                            setLoading(false);
                                            if (response.status === 200) {
                                                notifySuccess("Email sent successfully");
                                            } else {
                                                notifyError("Can't send email");
                                            }
                                        } else {
                                            notifyError("Invalid email");
                                        }
                                        onClose();
                                    }}
                                >
                                    {loading ? "Sending..." : "Send"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default SendEmail;