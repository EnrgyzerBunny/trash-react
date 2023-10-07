import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import WinnerBanner from '../components/WinnerBanner';
import ContentPanel from '../components/ContentPanel';
import TeamsTable from '../components/TeamsTable';
import FeaturedPlayer from '../components/FeaturedPlayer';

//import GroupStageBracket from '../assets/Brackets/DotaTrash-22 - Group Stage-10-16.jpg'
import WaiverPriority from '../components/WaiverPriority';
//import MainEventBracket from '../assets/Brackets/DotaTrash-22 - Main Event-10-20.jpg'
import { Dialog } from '@headlessui/react';

function Homepage() {
    const [classTrans, setClassTrans] = useState("col-start-3 col-end-7 flex flex-col");
    const [styleTrans, setStyleTrans]: any = useState({});
    const [isLightboxOpen, setIsLightboxOpen]: any = useState(false);

    //const dismissCallback = (height: number) => {
    //    setClassTrans("col-start-3 col-end-7 flex flex-col transition ease-in-out duration-700");
    //    const newStyle = {
    //        "--tw-translate-y": "-" + height + "px",
    //        "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
    //    };
    //    setStyleTrans(newStyle);
    //};

    //const reset = () => {
    //    setClassTrans("col-start-3 col-end-7 flex flex-col");
    //    setStyleTrans({});
    //};


    return (
        <>
            <PageWrapper>
                {/*<WinnerBanner season="5" team="2018 Fantasy Baseball Champion" onDismiss={dismissCallback} onFinish={reset} />*/}

                <div style={styleTrans} className={classTrans}>
                    {/*<ContentPanel>
                    <img className='bg-stone-600 shadow-lg' alt="Group Stage Bracket" src={GroupStageBracket}></img>
                </ContentPanel>*/}
                    {/* <ContentPanel>*/}
                    {/*    Main Event*/}
                    {/* <button onClick={() => setIsLightboxOpen(true)}><img className='bg-stone-600 shadow-lg' alt="Group Stage Bracket" src={MainEventBracket}></img></button>*/}
                    {/*    <div className='font-thin text-xs'>Click to enlarge</div>*/}
                    {/*</ContentPanel>*/}
                    {/*<WaiverPriority />*/}
                    <FeaturedPlayer />
                    <ContentPanel>
                        <TeamsTable />
                    </ContentPanel>
                    <ContentPanel>
                        <iframe className="shadow-lg" src="https://challonge.com/l4pned5s/module" width="100%" height="1000" frameBorder={0} scrolling="auto" allowTransparency={true}></iframe>
                    </ContentPanel>

                </div>
            </PageWrapper>
            <Dialog open={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="max-w-screen rounded bg-white">
                        {/*<img className='bg-stone-600 shadow-lg' alt="Group Stage Bracket" src={MainEventBracket}></img>*/}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default Homepage;