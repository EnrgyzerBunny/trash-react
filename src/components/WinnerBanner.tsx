import React, { useState } from "react";
import { Transition } from '@headlessui/react'

function WinnerBanner(props: any) {
    const [isShowing, setIsShowing] = useState(true);

    return (
        <Transition
            show={isShowing}
            leave="transition ease-in-out duration-300 transform opacity"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-full opacity-0"
            className="col-start-3 col-end-7"
        >
            <div className="will-change-transform flex flex-col relative my-5 mx-5 px-5 py-5 rounded-lg shadow-lg bg-amber-300 dark:bg-amber-400 font-bold text-xl text-amber-50 dark:text-amber-100">
                <span className="flex-auto drop-shadow-lg">Season {props.season} champion:</span>
                <span className=" flex flex-auto text-center text-4xl text-amber-600 my-5 drop-shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="animate-pulse h-10 w-10 flex-auto stroke-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    {props.team}
                    <svg xmlns="http://www.w3.org/2000/svg" className="animate-pulse h-10 w-10 flex-auto stroke-amber-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>
                <button className="absolute h-6 w-6 right-3 top-3 hover:scale-110" onClick={() => setIsShowing(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </Transition>
    );

}

export default WinnerBanner;