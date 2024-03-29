import React from "react";

function Chip(props: any) {

    if (props.removable) {
        return (
            <div className="flex flex-wrap justify-center space-x-2">
                <span
                    className="px-4 py-2 rounded-full dark:text-gray-500 border border-gray-300 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                    {props.children}
                    <button onClick={props.onRemove} className="bg-transparent hover focus:outline-none">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                            className="w-3 ml-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path fill="currentColor"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                            </path>
                        </svg>
                    </button>
                </span>
            </div>
        );
    }
    else {
        return (
            <div className={`flex flex-wrap space-x-2 ${(props.align === "end")? ('justify-end') : ''}`}>
                <span
                    className={`hover px-4 py-2 rounded-full border border-stone-500 dark:border-stone-300 dark:text-stone-50 text-stone-500 font-semibold ${'text-' + ((props.textSize != null)? props.textSize : 'base')} flex align-center w-max cursor-pointer active:bg-gray-300 hover:bg-stone-400 transition duration-300 ease`}>
                    {props.children}
                </span>
            </div>
        );
    }
}


export default Chip;