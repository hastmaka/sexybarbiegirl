export async function fetchAPI(tempUrl, endpoint, method, data, token) {
    let body = method === 'POST' ? JSON.stringify(data) : {},
        url;
        url = new URL(tempUrl + endpoint)
        // url.search = new URLSearchParams(JSON.stringify(data)).toString()
    // debugger
    try {
        const res = await fetch(`${url}`, (method === 'GET') ? {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                authToken: token,
                data: JSON.stringify(data)
            }
        } : {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                authToken: token
            },
            body
        })
        return await res.json();
    } catch (e) {
        debugger
    }
}

/**
 * stripe_customer doc.id = user doc.id for convenience use
 */