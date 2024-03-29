Planets();

async function Planets() {
    listOfPlanets = []
    let res = await fetch("https://swapi.dev/api/planets/")
    let data = await res.json();
    while (data.next != null) {
        data.results.forEach(element => {
            listOfPlanets.push(element);
        });
        res = await fetch(data.next);
        data = await res.json();
    }
    data.results.forEach(element => {
        listOfPlanets.push(element);
    });
    console.log(listOfPlanets);
    createButtons(listOfPlanets);
}

function createButtons(list) {
    let buttons = document.getElementById('planetButtons');
    list.forEach(planet => {
        let button = document.createElement('button');
        button.setAttribute('type','button');
        button.innerHTML = planet['name'];
        button.addEventListener("click", function() {
            displayPlanetInfo(planet)});
        buttons.appendChild(button);
    })
}

function displayPlanetInfo(planet) {
    planetName = document.getElementById('planetName');
    planetName.innerHTML = `Name: ${planet['name']}`;
    planetClimate = document.getElementById('planetClimate');
    planetClimate.innerHTML = `Climate: ${planet['climate']}`;
    planetPopulation = document.getElementById('planetPopulation');
    planetPopulation.innerHTML = `Population: ${planet['population']}`;
    planetTerrain = document.getElementById('planetTerrain');
    planetTerrain.innerHTML = `Terrain: ${planet['terrain']}`;
    console.log(planet['name']);
}

async function searchPlanet() {
    let  searchWord = document.getElementById("searchInput").value;
    let res = await fetch(`https://swapi.dev/api/planets/?search=${searchWord}`);
    let {results} = await res.json();
    document.getElementById("searchPlanetName").innerText = results[0]['name'];
    document.getElementById("searchPlanetClimate").innerText = results[0]['climate'];
    document.getElementById("searchPlanetPopulation").innerText = results[0]['population'];
    document.getElementById("searchPlanetTerrain").innerText = results[0]['terrain'];
}
