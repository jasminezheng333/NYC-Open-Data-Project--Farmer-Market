let data, info, leftPanel, mapObj;

async function init() {
  let response = await fetch("Farmers.json");
  data = await response.json();

  data = data.filter(market => market.year === "2025");
  
  console.log(data);
  displayMarkets(data);
}

function displayMarkets(markets){
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < markets.length; i++){
    let market = markets[i];

    build += `
      <div class="card market">
        <h3>${market.marketname}</h3>
        <p><b>Borough:</b> ${market.borough}</p>
        <p><b>Street:</b> ${market.streetaddress}</p>
        <p><b>Community District:</b> ${market.community_district}</p>
        <p><b>Year:</b> ${market.year}</p>
        <p><b>Days Open:</b> ${market.daysoperation}</p>
        <p><b>Hours:</b> ${market.hoursoperations}</p>
        <p><b>Accepts EBT:</b> ${market.accepts_ebt}</p>
        <p><b>Open Year Round:</b> ${market.open_year_round}</p>
        <button onclick="showMap(${market.latitude}, ${market.longitude})"> Show Map </button>
      </div>
    `;
  }

  output.innerHTML = build;
}


function filterByMarketName(){
  let name = document.getElementById("name").value;
  let filtered = [];
  for(let i = 0; i < data.length; i++){
    if(data[i].marketname == name){
      filtered.push(data[i]);
    }
  }
  displayMarkets(filtered);
}

function filterByBorough(){
  let borough = document.getElementById("borough").value;
  let filtered = [];
  for(let i = 0; i < data.length; i++){
    if(data[i].borough == borough){
      filtered.push(data[i]);
    }
  }
  displayMarkets(filtered);
}

function filterByAddress(){
  let address = document.getElementById("address").value;
  let filtered = [];
  for(let i = 0; i < data.length; i++){
    if(data[i].streetaddress == address){
      filtered.push(data[i]);
    }
  }
  displayMarkets(filtered);
}

function filterByDistrict(){
  let district = document.getElementById("district").value;
  let filtered = [];
  for(let i = 0; i < data.length; i++){
    if(data[i].community_district == district){
      filtered.push(data[i]);
    }
  }
  displayMarkets(filtered);
}

function groupCount(arr, key) {
  let counts = {};

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i][key];

    if (counts[value] == undefined) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }
  }

  return counts;
}

function marketsByBorough() {
  let chartType = document.getElementById("chartType").value;

  let counts = groupCount(data, "borough");

  let columns = [];

  for (let key in counts) {
    columns.push([key, counts[key]]);
  }

  c3.generate({
    bindto: "#chart",

    size: {
      height: 450
    },

    data: {
      columns: columns,
      type: chartType,
      colors: {
        Manhattan: "#5c5c5c",
        Brooklyn: "#f0c402",
        Queens: "#ff1100",
        Bronx: "#00ff40",
        "Staten Island": "#4c00ff"
      }
    },

    title: {
      text: "NYC Farmers Markets by Borough (2025)"
    },

    legend: {
      position: "right"
    },

    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    }
  });
}

function showMap(lat, lon){
  console.log("Button clicked", lat, lon);
  let location = [lat, lon];

  if(!mapObj){
    mapObj = L.map("map");

    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
      }
    ).addTo(mapObj);
  }

  mapObj.setView(location, 18);

  L.marker(location).addTo(mapObj);
}