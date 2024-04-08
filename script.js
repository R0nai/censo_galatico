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
    });
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
    removeElementsFromUl();
    printResidents(planet['residents']);
}

async function searchPlanet() {
    let  searchWord = document.getElementById("searchInput").value;
    let res = await fetch(`https://swapi.dev/api/planets/?search=${searchWord}`);
    let {results} = await res.json();
    document.getElementById("planetName").innerText = results[0]['name'];
    document.getElementById("planetClimate").innerText = results[0]['climate'];
    document.getElementById("planetPopulation").innerText = results[0]['population'];
    document.getElementById("planetTerrain").innerText = results[0]['terrain'];
    removeElementsFromUl();
    printResidents(results[0]['residents']);
}

async function printResidents(residents) {
    residents.forEach(resident => {
        findResident(resident); 
    });
}

async function findResident(resident) {
    let res = await fetch(resident);
    let result = await res.json();
    let listOfResidents = document.getElementById('planetResidents');
    let residentInfo = document.createElement('li');
    residentInfo.innerHTML = `Ǹame: ${result['name']} , Birth Year: ${result['birth_year']}`;
    listOfResidents.appendChild(residentInfo);
}

function removeElementsFromUl() {
    let listOfResidents = document.getElementById("planetResidents");
    while (listOfResidents.firstChild) {
        listOfResidents.removeChild(listOfResidents.firstChild);
    }
}