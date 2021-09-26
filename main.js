//querySelector for update to call server.js update function

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
//querySelector for update to call server.js delete function
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
//utilizing a function to help get the geolocation coordinates of the user's position and sending it to the database.
function working(pos){
    //getting the coordinates
    var crd = pos.coords;
    var stringname = document.getElementById("geo name").value;
    fetch('/points', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: stringname,
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
    })
}
document.querySelector('#reload').addEventListener('click', _ =>{
    location.reload();
                                                  
})
document.querySelector("#geoloc").addEventListener('click', _ =>{
    navigator.geolocation.getCurrentPosition(working);
})
//
//document.querySelector('#geoloc').addEventListener('click', _ => {
//      navigator.geolocation.getCurrentPosition((position) => {
//          fetch('/points', {
//                method: 'POST',
//                headers: { 'Content-Type': 'application/json' },
//                body: JSON.stringify({
//                    name: document.getElementById("geoName").value,
//                    latitude: position.coords.latitude,
//                    longitude: position.coords.longitude
//                })
//            })
//            .then(res => {
//                if (res.ok) return res.json()
//            })
//            .catch(console.error)
//          location.reload();
//        });
//    
//})

/*
document.querySelector('#point delete').addEventListener('click', _ => {
    document.getElementById('point delete').innerHTML = "adsfasdf"
})
*/
var modalt = document.getElementById("pointinfo");
var btnt = document.getElementById("barbutton2");
var modal = document.getElementById("cp");
var btn = document.getElementById("barbutton1");
var modalth = document.getElementById("lines");
var btnth = document.getElementById("barbutton3");
btn.onclick = function() {
  modal.style.display = "block";

    if (modalt.style.display == "block") {
    modalt.style.display = "none";
  }
    if (modalth.style.display == "block") {
    modalth.style.display = "none";
  }
}


btnt.onclick = function() {
  modalt.style.display = "block";
    if (modal.style.display == "block") {
    modal.style.display = "none";
  }

    if (modalth.style.display == "block") {
    modalth.style.display = "none";
  }
}

btnth.onclick = function() {
  modalth.style.display = "block";
    if (modal.style.display == "block") {
    modal.style.display = "none";
  }
    if (modalt.style.display == "block") {
    modalt.style.display = "none";
  }

    
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
    if (event.target == modalt) {
    modalt.style.display = "none";
  }
    if (event.target == modalth) {
    modalth.style.display = "none";
  }
    
}
