import React from 'react';
import Navigation from '../components/Navigation';
import WinnerBanner from '../components/WinnerBanner';
import ContentPanel from '../components/ContentPanel';

function Homepage() {
    return (
        <div className="min-w-screen min-h-screen max-h-full bg-gradient-to-b from-stone-100 to-stone-500 dark:from-stone-500 dark:to-stone-700">
            <header className="sticky top-0 z-50">
            <Navigation />
            </header>
            <main className="relative xl:grid xl:grid-cols-8">
                <WinnerBanner season="4" team="Bennie and the Slants"/>
                <ContentPanel>
                    testing
                </ContentPanel>
            </main>
        </div>
    );
}

export default Homepage;