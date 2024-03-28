printPlanets();

async function printPlanets() {
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
}