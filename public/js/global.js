document.getElementById('logout').addEventListener('click', async function(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/auth/logout';
    const deleteMethod = {
        method: 'GET', // Method itself
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }
    try {
        await (await fetch(url, deleteMethod)).json();
    } catch (error) {
        alert(error);
    }
    location.href = '/auth/login'
})