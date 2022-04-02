
function IsAuth() {
    return (
        sessionStorage.getItem('discord-token') !== null
    );
};

function GetUser(callback: any) {
    if (sessionStorage.getItem('discord-token') !== null && sessionStorage.getItem('discord-user') === null) {
        let token = JSON.parse(sessionStorage.getItem('discord-token')!);
        let head = new Headers();
        head.append('Authorization', 'Bearer ' + token.access_token);

        const init = {
            method: 'GET',
            headers: head,
        };

        fetch("https://discord.com/api/v8/users/@me", init)
            .then(res => res.json())
            .then(
                (result) => {
                    sessionStorage.setItem('discord-user', JSON.stringify(result))
                    callback(result);
                },
                (error) => {
                    callback(null);
                }
            );
    }
    else if (sessionStorage.getItem('discord-user') !== null)
    {
        callback(JSON.parse(sessionStorage.getItem('discord-user')!));
    }
    else
    {
        callback(null);
    }
}

function Signout(callback: VoidFunction) {
    sessionStorage.removeItem('discord-user');
    sessionStorage.removeItem('discord-token');
    callback();
}

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

export { IsAuth, GetUser, Signout };
