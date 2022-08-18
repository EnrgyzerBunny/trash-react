import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import WinnerBanner from '../components/WinnerBanner';
import ContentPanel from '../components/ContentPanel';
import TeamsTable from '../components/TeamsTable';
import FeaturedPlayer from '../components/FeaturedPlayer';

function Homepage() {
    const [classTrans, setClassTrans] = useState("col-start-3 col-end-7 flex flex-col");
    const [styleTrans, setStyleTrans]: any = useState({});

    const dismissCallback = (height: number) => {
        setClassTrans("col-start-3 col-end-7 flex flex-col transition ease-in-out duration-700");
        const newStyle = {
            "--tw-translate-y": "-" + height + "px",
            "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
        };
        setStyleTrans(newStyle);
    };

    const reset = () => {
        setClassTrans("col-start-3 col-end-7 flex flex-col");
        setStyleTrans({});
    };

    return (
        <PageWrapper>
            <WinnerBanner season="4" team="Bennie and the Slants" onDismiss={dismissCallback} onFinish={reset} />
            <div style={styleTrans} className={classTrans}>
                <FeaturedPlayer/>
                <ContentPanel>
                    <TeamsTable />
                </ContentPanel>
            </div>
        </PageWrapper>
    );
}

export default Homepage;