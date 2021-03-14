
document.querySelector('#update').addEventListener('click', _ => {
    fetch('/points', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById("new name").value,
            latitude: document.getElementById("new latitude").value,
            longitude: document.getElementById("new longitude").value
        })
    })
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
    console.log(response)
    })

})

document.querySelector('#delete button').addEventListener('click', _ => {
    fetch('/points', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById("delete name").value
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No point to delete') {
            document.querySelector('#message').textContent = 'No point to delete'
        }
        else {
        window.location.reload(true)
    	}
    })
    .catch(console.error)

})


document.querySelector('#point delete').addEventListener('click', _ => {
    document.getElementById('point delete').innerHTML = "adsfasdf"

})

