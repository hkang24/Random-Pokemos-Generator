
const url = 'https://pokeapi.co/api/v2/ability/';
async function getPokemon(num) {
    random = Math.round(Math.random() * 248)
    
    const response = await fetch(url + random, {
        method: 'GET',
        headers: {'Accept':'application/json',
                'Content-Type': 'application/json', }
    });
    

    return response.json();
}

async function init() {
    try {
        const pokemon = await getPokemon();
        return [pokemon.names[7], pokemon.effect_entries[1].effect];
    } catch (err) {
        console.log(err);
    }
}

class Pokemon {
    constructor(name, effect) {
        this.name = name;
        this.effect = effect
    }
}

class UI {
    constructor() {
        this.pokemon = document.getElementById('pokemon');
        this.button = document.getElementById('button');
        this.button.addEventListener('click', console.log('clicked'));
        this.button.addEventListener('click', (e) => this.onClick(e));
    }

    async onClick(e) {
        e.preventDefault();
        this.pokemon.innerHTML = '';
        try {
            const pokeName = await init();
            const div = document.createElement('h2');
            const div2 = document.createElement('h3');
            div2.classList.add('fs-5');
            div2.classList.add('font-weight-lighter');
            div.innerHTML = 'Name: ' + pokeName[0].name;
            div2.innerHTML = 'Effect: ' + pokeName[1];
            this.pokemon.appendChild(div);
            this.pokemon.appendChild(div2);
        } catch (err) {
            console.log('fetch failed', err);
        }    
    }
}

const ui = new UI();