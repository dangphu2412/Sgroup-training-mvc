document.getElementById('logout').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/auth/logout';
    const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
       }
    fetch(url, deleteMethod) 
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err)) 

})