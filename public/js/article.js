document.getElementById('upload').addEventListener('change', async function(e) {
    const previewImg = document.getElementById('previewImg');
    const form = new FormData();
    form.append('file', this.files[0])
    console.log(e);

    const response = await fetch('http://localhost:3000/media', {
        method: 'POST',
        body: form
    })

    if (!response.ok) {
        alert('Upload failed')
    } else {
        const {src} = await response.json();
        previewImg.src = src;
        return;
    }
})

document.getElementById('newFormCreation').addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const user = localStorage.getItem('user');

    if (!user) {
        alert('Your current login is out of date')
    }

    const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
            'authorization': 'Bearer ' + JSON.parse(user).accessToken,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content
        })
    })

    if (!response.ok) {
        alert('Create failed')
    } else {
        alert('Create success')
        return;
    }
})