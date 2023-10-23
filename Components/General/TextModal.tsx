"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";

import Image from "next/image";

interface props {
    buttonText: string;
    buttonStyle?: string;
    title: string;
    bodytext: string;
}

const TextModal: FC<props> = ({ title, bodytext, buttonText, buttonStyle }) => {
    let [isOpen, setIsOpen] = useState(false);


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button
                type="button"
                className={typeof buttonStyle !== "undefined" ? buttonStyle : "btn"}
                onClick={openModal}
            >
                {buttonText}
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={closeModal} className="dialog-container">

                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        />

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="dialog-content">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="p-3 border border-gray-200 rounded-10">
                                            <Image
                                                src="/assets/icons/description.svg"
                                                alt="Description Icon"
                                                width={28}
                                                height={28}
                                            />
                                        </div>

                                        <Image
                                            src="/assets/icons/close.svg"
                                            alt="close"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer"
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <h4 className="dialog-head_text">
                                        {title}
                                    </h4>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {bodytext}
                                    </p>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default TextModal;