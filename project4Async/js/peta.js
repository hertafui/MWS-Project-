
var mymap = L.map('mapid').setView([-1.262726, 116.898055], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 25,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoiaWxoYW1zaiIsImEiOiJjam1sdGc0YW0wYnZiM3BueWd4NWg3bmQzIn0.tqL4pisO6LAAwp0FhJwgKw'
}).addTo(mymap);


function findLocation(x, y) {
 for(var i = 0; i<places.length; i++) {
     if(places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
        return i;
    }
 }
 return -1;
}


function showLocation(e) {
    let ix = findLocation(e.latlng.lat, e.latlng.lng);
    if(ix >= 0) {
        img.src = places[ix].gambar
        par.textContent = places[ix].review
    }
}


let gmb = document.getElementById("gambar");
let rev = document.getElementById("review");
let img = document.createElement("img");
let par = document.createElement("p");

gmb.appendChild(img);
rev.appendChild(par);


async function f(URL) {
    try {
        const resp = await(fetch(URL));
        const resp2 = await resp.json();
        localStorage.setItem("places", JSON.stringify(resp2.places))
    } catch (error) {
        console.log(err);
    }
}
const URL = "data/peta.json";
f(URL);

let places = JSON.parse(localStorage.getItem("places"));
for (var p of places) {
    var marker = L.marker(p.lokasi).addTo(mymap)
    .bindPopup(p.sponsor);
    marker.on("click", showLocation)
}
