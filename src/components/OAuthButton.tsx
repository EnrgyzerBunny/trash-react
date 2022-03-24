import React, { useState } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';



function OAuthButton() {
    const [error, setError] = useState(null);

    const onSuccess = (access_token: any) => {sessionStorage.setItem('discord-token',JSON.stringify(access_token));};

    return (
        <div>
            <OAuth2Login
                authorizationUrl="https://discord.com/api/oauth2/authorize"
                responseType="token"
                clientId="484107814541721609"
                redirectUri="http://localhost:3000/oauth-callback"
                scope="identify"
                onSuccess={onSuccess}
                onFailure={setError} />
        </div>
    );
};

export default OAuthButton;
