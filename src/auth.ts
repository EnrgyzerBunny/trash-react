
function IsAuth() {
    return (
        localStorage.getItem('discord-token') !== null
    );
};

function GetUser(callback: any) {
    if (localStorage.getItem('discord-token') !== null && localStorage.getItem('discord-user') === null) {
        let token = JSON.parse(localStorage.getItem('discord-token')!);
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
                    localStorage.setItem('discord-user', JSON.stringify(result))
                    callback(result);
                },
                (error) => {
                    callback(null);
                }
            );
    }
    else if (localStorage.getItem('discord-user') !== null)
    {
        callback(JSON.parse(localStorage.getItem('discord-user')!));
    }
    else
    {
        callback(null);
    }
}

function Signout(callback: VoidFunction) {
    localStorage.removeItem('discord-user');
    localStorage.removeItem('discord-token');
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
