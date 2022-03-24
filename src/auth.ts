

const config = {
    clientId: '484107814541721609',
    clientSecret: '4lagBjhUf1_HP0YkOjUHBYChpRzjbmRh',
    redirectUrl: 'http://localhost:3000/protected',
    scopes: ['guilds', 'identify'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
        tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
        revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke'
    }
}

type DiscordToken = {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: string
};

const discordAuthProvider = {
    isAuthenticated: false,
    TokenInfo: null,
    signin(callback: VoidFunction) {
        console.log("Auth start");

        /*authorize(config).then((reply: any) => {
            this.TokenInfo = reply;
            console.log(JSON.stringify(this.TokenInfo));
            callback();
        });*/
    },
    signout(callback: VoidFunction) {
        this.isAuthenticated = false;
        this.TokenInfo = null;
        setTimeout(callback, 100);
    },
};

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export { discordAuthProvider, fakeAuthProvider };
