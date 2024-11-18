import { RequestError } from "../error/RequestError.js";

export async function makeRequest(url, method, body = undefined, headers = undefined) {
    const payload = body ? JSON.stringify(body) : undefined;
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers
        },
        body: payload
    }
    console.log("Request options: ", options);
    const request = await fetch(url, {...options});

    if (!request.ok) {
        const error = await request.json();
        throw new RequestError(request.status, {
            message: error.message,
            errors: error.errors
        });
    }
    const json = await request.json();
    return  json;

}

export async function makeRequestWithoutJsonReturn(url, method, body = undefined, headers = undefined) {
    const payload = body ? JSON.stringify(body) : undefined;
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers
        },
        body: payload
    }
    const request = await fetch(url, options);

    if (!request.ok) {
        throw new RequestError(request.status, request.body);
    }
    return request;
}