import React from "react";
import Navigation from "./Navigation";

function PageWrapper(props: any) {

    return (
        <>
            <div className="flex flex-col min-w-fit min-h-screen bg-fixed bg-gradient-to-b from-stone-100 to-stone-500 dark:from-stone-500 dark:to-stone-700">
                <header className="sticky top-0 z-50">
                    <Navigation />
                </header>
                <main className="relative xl:grid xl:grid-cols-8">
                    {props.children}
                </main>
                <div className="flex-auto min-h-4"></div>
                <footer className="flex-none max-h-12 border-t-2 border-stone-200 dark:border-stone-600">footer</footer>
            </div>
        </>
    );
}

export default PageWrapper;