import anime from "../node_modules/animejs/lib/anime.es.js";
import _ from "../node_modules/underscore/underscore-esm.js"

const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("input").value;

    fetchCountries(input)
    .then(countries => {
        const sorted = sortCountries(countries);
        displayBiggest(sorted);
        anime({
            targets: "li",
            scale: .8,
            duration: 2000,
        })
    })
})

async function fetchCountries(input){
    const url = `https://restcountries.com/v3.1/lang/${input}`;

    const response = await fetch(url);
    const countries = await response.json();
    return countries;
}

function sortCountries(countryArr){
    const sortArr = structuredClone(countryArr);

    const smallestFirst = _.sortBy(sortArr, function(country) {return country.population});
    const biggestFirst = smallestFirst.reverse();

    return biggestFirst;
}

function displayBiggest(countries){
    const threeBiggest = countries.slice(0,3);
    const div = document.querySelector("div");
    div.innerHTML = "";
    const ol = document.createElement("ol");
    div.append(ol);
    
    threeBiggest.forEach(country => {
        const li = document.createElement("li");
        ol.append(li);
        li.innerText = country.name.common + ", " + country.population;
    })
}

