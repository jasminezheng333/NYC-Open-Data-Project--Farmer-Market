function showMap(lat,lon){
  let location = [lat, lon];
  if(!mapObj){
      mapObj = L.map("map");
  } 
  let map = mapObj.setView(location, 18);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);
}

function displayMap(){
  showMap(lat,lon);
}