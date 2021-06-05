document.getElementById('logout').addEventListener('submit', function(event) {
    event.preventDefault();

    window.fetch('/logout', {
        method: 'DELETE',
    }).then(res => {
        console.log(res);

        alert('Success')
    }).catch(err => {
        console.log(err);
    })

})