"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FC, FormEvent, Fragment, useState } from "react";

import Image from "next/image";
import { addUserEmailToProductList } from "@/lib/actions/user";
import toast from "react-hot-toast";

interface props {
    productId: string
}

const EmailModal: FC<props> = ({ productId }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const emailResult = await addUserEmailToProductList(productId, email);

        if (emailResult) toast.success(`Check ${email} inbox`);
        else toast.success("You are already tracking this product.");

        setIsLoading(false);
        setEmail("");
        closeModal();
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button type="button" className="btn" onClick={openModal}>
                <div className="flex items-center justify-center gap-3">

                    <Image
                        src="/assets/icons/email-2.svg"
                        alt="close"
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={closeModal}
                    />
                    Track
                </div>

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
                                        <div className="p-3 rounded-10">
                                            <Image
                                                src="/assets/icons/email.svg"
                                                alt="logo"
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
                                        Stay updated with product pricing alerts right in your inbox!
                                    </h4>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Never miss a bargain again with our timely alerts!
                                    </p>
                                </div>

                                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-white">
                                        Email address
                                    </label>
                                    <div className="relative mb-6">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                        </div>

                                        <input
                                            type="email"
                                            className="dialog-input_container"
                                            placeholder="johndoe@whatever.com"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={email === "" || isLoading}
                                    >
                                        {
                                            isLoading
                                                ? <p className="animate-bounce">Adding Your Address ...</p>
                                                : "Track"
                                        }
                                    </button>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EmailModal;