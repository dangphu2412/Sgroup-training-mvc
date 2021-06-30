console.log("Loading js login file")

document.querySelector('#login').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/auth/login?case=DEFAULT', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        alert('Error');
    } else {
        const {data} = await response.json();

        localStorage.setItem('user', data);

        alert('Login success')
        location.href = '/';
        return;
    }
})