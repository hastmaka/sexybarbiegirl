export async function fetchAPI(tempUrl, endpoint, method, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    let body,
        url;
        url = new URL(tempUrl + endpoint)
        // url.search = new URLSearchParams(JSON.stringify(data)).toString()
    // debugger
    const res = await fetch(`${url}`, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            authToken: user.token,
            uid: user.uid,
            data: JSON.stringify(data)
        },
    })

    return await res.json();
}