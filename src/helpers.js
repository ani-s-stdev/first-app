function get(url) {
    return fetch(url)
        .then(response => response.json())
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
}

export {get, post};
