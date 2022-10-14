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
                <footer className="relative xl:grid xl:grid-cols-8 flex-none max-h-12  p-2 px-10">
                    <div className="flex col-start-3 col-end-7">
                        <div className="font-medium text-stone-500 dark:text-stone-300 flex-auto">&copy;2022 PastPrimeGames</div>
                        <div className="flex-none px-2">
                            <a href="https://github.com/EnrgyzerBunny/trash-react/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D">
                                <svg className="h-18 w-18 text-stone-500 dark:text-stone-300  fill-stone-500 dark:fill-stone-300" height={18} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                                </svg>

                            </a>
                        </div>
                        <div className="flex-none">
                            <a href="https://github.com/EnrgyzerBunny/trash-react">
                                <svg className="h-18 text-stone-500 dark:text-stone-300  fill-stone-500 dark:fill-stone-300" height={18} aria-hidden="true" viewBox="0 0 300 300"><path d="M150,4C67.3,4,0.3,71,0.3,153.7c0,66.1,42.9,122.2,102.4,142c7.5,1.4,10.2-3.2,10.2-7.2c0-3.6-0.1-13-0.2-25.5 c-41.6,9-50.4-20.1-50.4-20.1c-6.8-17.3-16.6-21.9-16.6-21.9c-13.6-9.3,1-9.1,1-9.1c15,1.1,22.9,15.4,22.9,15.4 c13.4,22.9,35,16.3,43.6,12.4c1.4-9.7,5.2-16.3,9.5-20c-33.2-3.8-68.2-16.6-68.2-74c0-16.3,5.8-29.7,15.4-40.2 c-1.5-3.8-6.7-19,1.5-39.6c0,0,12.6-4,41.2,15.3c11.9-3.3,24.7-5,37.5-5c12.7,0.1,25.5,1.7,37.5,5c28.6-19.4,41.1-15.3,41.1-15.3 c8.2,20.6,3,35.8,1.5,39.6c9.6,10.5,15.4,23.8,15.4,40.2c0,57.5-35,70.2-68.4,73.9c5.4,4.6,10.2,13.8,10.2,27.7 c0,20-0.2,36.2-0.2,41.1c0,4,2.7,8.7,10.3,7.2c59.4-19.8,102.3-75.9,102.3-142C299.7,71,232.7,4,150,4z"></path></svg>
                            </a>
                        </div>
                    </div>

                </footer>
            </div>
        </>
    );
}

export default PageWrapper;