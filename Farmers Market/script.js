let data;

async function init(){

  let response = await fetch("Farmers.json");
  data = await response.json();

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