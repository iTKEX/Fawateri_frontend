export default async function sendRequest(url, method = 'GET', payload) {
    const options = { method, headers: {} };

    if (payload) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(payload);
    }

    const token = localStorage.getItem('token');
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    try {
        const resp = await fetch(`http://localhost:8000${url}`, options);
        if (!resp.ok) {
            if (resp.status === 401) localStorage.removeItem('token');
            const txt = await resp.text().catch(() => '');
            throw new Error(txt || `HTTP ${resp.status}`);
        }
        return resp.status === 204 ? null : resp.json();
    } catch (error) {
        console.log(error, "error in send-request");
        throw error;
    }
}
