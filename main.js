
document.querySelector('#update button').addEventListener('click', _ => {
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

//document.querySelector('#geolocation button').addEventListener('click', _ => {
//
//      navigator.geolocation.getCurrentPosition((position) => {
//          fetch('/points', {
//                method: 'POST',
//                headers: { 'Content-Type': 'application/json' },
//                body: JSON.stringify({
//                    name: document.getElementById("geolocation name").value,
//                    latitude: position.coords.latitude,
//                    longitude: position.coords.longitude
//                })
//            })
//            .then(res => {
//                if (res.ok) return res.json()
//
//            })
//            .catch(console.error)
//          location.reload();
//
//
//        });
//    
//
//})
function working(pos){
    var crd = pos.coords;
    var stringname = document.getElementById("geo name").value;
    fetch('/points', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: stringname,
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    })
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
    console.log(response)
    })
}

document.querySelector('#currupdate').addEventListener('click', _ => {
    navigator.geolocation.getCurrentPosition(working);
})

