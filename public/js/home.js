document.getElementById('seacrchForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const searchValue = document.getElementById('searchElement').value;
    
    const response = await fetch(`http://localhost:3000/articles?q=${searchValue}&page=1&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    })

    if (!response.ok) {
        alert('Search failed')

    } else {
        alert('Search success')
        const { data } = await response.json()
        return;
    }
})