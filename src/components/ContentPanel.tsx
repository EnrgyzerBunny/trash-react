import React from "react";

function ContentPanel(props: any) {
    
    return (
        <div className="flex flex-col relative my-2 mx-5 px-5 py-5 rounded-lg shadow-lg bg-stone-300 dark:bg-stone-500 font-medium text-lg text-stone-500 dark:text-stone-100">
            {props.children}
        </div>
    );
};

export default ContentPanel;