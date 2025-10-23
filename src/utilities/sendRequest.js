export default async function sendRequset(url, method = 'GET', payload) {
    const options = { method };

    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    try {
        const respone = await fetch(`http://localhost:8000${url}`, options);
        if (respone.ok) return respone.json();
    } catch (error) {
        console.log(error, "error in send-request");
        return error;
    }
}