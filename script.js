import { countries_data } from "./countries_data.js";

let totalPopulation = 0;
countries_data.forEach(country => {
    totalPopulation += country.population;
});

countries_data.forEach(country => {
   country["populationRatio"] = country.population/totalPopulation; 
});

const objectOfLanguage = {};

countries_data.forEach(country => {
    country.languages.forEach(language => {
         if(objectOfLanguage[language]) objectOfLanguage[language]++;
         else objectOfLanguage[language] = 1;
    });
});


const arrayOfLanguages = [];
for(const language in objectOfLanguage) {
    arrayOfLanguages.push({language: language,count: objectOfLanguage[language]});
}

//create an array that sorted by its language
const sortedArrayOfLanguages = arrayOfLanguages.sort((a,b) => b.count - a.count);
let totalLanguages = 0;
sortedArrayOfLanguages.forEach(language => {
    totalLanguages += language.count;
});
sortedArrayOfLanguages.forEach(language => {
    language.languageRatio = language.count/totalLanguages;
});


//create an array that is sorted by its population
const populationSorting = countries_data.sort((a,b) => {
    if(a.population > b.population) return -1;
    else if (a.population <  b.population) return 1;
    else return 0;
});


const populationButton = document.querySelector('.population');
const languageButton = document.querySelector('.languages');
const visualisation = document.querySelector('.visualisation');
const inform = document.querySelector('.inform');

languageButton.addEventListener('click', () => {
    visualisation.innerHTML = '';
    inform.innerHTML = '10 Most Spoken Languages in The World.';
    sortedArrayOfLanguages.slice(0,10).forEach(language => {
        const row = document.createElement('div');
        row.className = 'row';
        const languageName = document.createElement('p');
        languageName.innerHTML = language.language;
        languageName.className = 'name';
        const container = document.createElement('div');
        container.className = 'container';
        const bar = document.createElement('div');
        container.appendChild(bar);
        bar.className = 'bar';
        bar.style.width = language['languageRatio']*4*100 + '%';
        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.innerHTML = language.count;
        row.appendChild(languageName);
        row.appendChild(container);
        row.appendChild(amount);
        visualisation.appendChild(row);
    });
});

const populationDisplay =  () => {
    visualisation.innerHTML = '';
    inform.innerHTML = '10 Most populated countries in The World.';
    populationSorting.slice(0,10).forEach(country => {
        const row = document.createElement('div');
        row.className = 'row';
        const countryName = document.createElement('p');
        countryName.className = 'name';
        countryName.innerHTML = country.name;
        const container = document.createElement('div');
        container.className = 'container';
        const bar = document.createElement('div');
        container.appendChild(bar);
        bar.className = 'bar';
        bar.style.width = country['populationRatio']*5*100 + '%';
        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.innerHTML = country.population;
        row.appendChild(countryName);
        row.appendChild(container);
        row.appendChild(amount);
        visualisation.appendChild(row);
    });
};

populationButton.addEventListener('click',populationDisplay);
window.addEventListener('load',populationDisplay);


document.body.addEventListener('load',)