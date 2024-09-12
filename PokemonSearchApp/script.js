const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHp = document.getElementById("hp");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonsprites = document.getElementById("sprites");
const listPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pikachuName = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu";
const pikachuId = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/25";
const searchBtn = document.getElementById("search-button");

async function fetchData() {
    try {
        const res = await fetch(listPokemon);
        const data = await res.json();
        showPokemonData(data, searchInput.value);
    } catch (err) {
        console.log(err);
    }
}

async function fetchPokemonData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showPokemonInfor(data);
    } catch (err) {
        console.log(err);
    }
}

function showPokemonInfor(data) {
    const { height, name, id, weight, sprites, stats, types } = data;

    const statsInfo = stats.map(({ base_stat }) => {
        return {
            baseStat: base_stat
        }
    });

    const statElements = [
        pokemonHp,
        pokemonAttack,
        pokemonDefense,
        pokemonSpecialAttack,
        pokemonSpecialDefense,
        pokemonSpeed
    ];

    const { front_default } = sprites;

    pokemonName.textContent = `${name.toUpperCase()}`;
    pokemonId.textContent = `#${id}`;
    pokemonWeight.textContent = `${weight}`;
    pokemonHeight.textContent = `${height}`;

    pokemonTypes.innerHTML = '';
    types.forEach(({ type }) => {
        const li = document.createElement('li');
        li.textContent = type.name.toUpperCase();
        pokemonTypes.appendChild(li);
    });

    pokemonsprites.innerHTML = `<img id="sprite" src="${front_default}" alt="front_default">`;

    statsInfo.forEach((stat, index) => {
        statElements[index].textContent = stat.baseStat;
    });
}

function showPokemonData(data, input) {
    let hasPokemon = false;
    const { count, results } = data;
    for (let i = 0; i < results.length; i++) {
        if (parseInt(input) === results[i].id || input.toString().toLowerCase() === results[i].name.toLowerCase()) {
            hasPokemon = true;
            const pokemonData = fetchPokemonData(results[i].url);
            break;
        }
    }

    if (!hasPokemon) {
        alert("Pokémon not found");
    }
}

searchBtn.addEventListener('click', fetchData);

