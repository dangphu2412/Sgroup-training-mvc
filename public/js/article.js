document.getElementById('upload').addEventListener('change', async function(e) {
    const previewImg = document.getElementById('previewImg');
    previewImg.src = URL.createObjectURL(this.files[0]);
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
        alert(src);
        return;
    }
})