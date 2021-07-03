document.getElementById('logout').addEventListener('click', async function(event) {
    localStorage.removeItem('user')
    location.href = '/auth/login'
})