import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ContentPanel from '../components/ContentPanel';
import TeamsTable from '../components/TeamsTable';

import GroupStageBracket from '../assets/Brackets/DotaTrash-22 - Group Stage-10-17.jpg'

function GroupsPage() {


    return (
        <PageWrapper>
            
            <div className="col-start-3 col-end-7 flex flex-col">
                <ContentPanel>
                    {/*<img className='bg-stone-600 shadow-lg' alt="Group Stage Bracket" src={GroupStageBracket}></img>*/}
                    <iframe className="shadow-lg" src="https://challonge.com/l4pned5s/module" width="100%" height="1000" frameBorder={0} scrolling="auto" allowTransparency={true}></iframe>
                </ContentPanel>
                {/*<ContentPanel>*/}
                {/*    <TeamsTable />*/}
                {/*</ContentPanel>*/}

            </div>
        </PageWrapper>
    );
}

export default GroupsPage;