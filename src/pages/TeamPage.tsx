import React, { useState, Fragment } from "react";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";
import { Switch, Dialog, Transition } from '@headlessui/react'

function TeamPage() {
    const [enabled, setEnabled] = useState(false);
    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setEnabled(false);
        setIsOpen(false);
    };

    return (
        <PageWrapper>
            <div className="col-start-3 col-end-7 flex flex-col">
                <ContentPanel>
                    <div className="">Manage Team</div>
                    <div className="flex">
                        <div className="flex-auto"></div>
                        <div className="flex-none font-normal px-4">This switch pops an error</div>
                        <Switch
                            checked={enabled}
                            onChange={() => { setEnabled(!enabled); (!enabled) && setIsOpen(!enabled); }}
                            className={`${enabled ? 'bg-lime-700 opacity-100' : 'bg-stone-700 opacity-40'
                                } relative inline-flex items-center h-6 rounded-full w-11 transition ease-in-out duration-500 my-1`}
                        >
                            <span className="sr-only">Activate Player</span>
                            <span
                                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block w-4 h-4 transform bg-stone-100 rounded-full transition ease-in-out duration-500`}
                            />
                        </Switch>
                    </div>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto"
                            onClose={closeModal}
                        >
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

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Error
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                You can't flip this switch
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </ContentPanel>
            </div>
        </PageWrapper>
    );
}

export default TeamPage;