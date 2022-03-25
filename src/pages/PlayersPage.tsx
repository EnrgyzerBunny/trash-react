import React from "react";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";

function PlayersPage() {
    return (
        <PageWrapper>
            <div className="col-start-3 col-end-7 flex flex-col">
                <ContentPanel>
                    Players
                </ContentPanel>
            </div>
        </PageWrapper>
    );
}

export default PlayersPage;