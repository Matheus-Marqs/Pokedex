const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button_prev');
const buttonNext = document.querySelector('.button_next');

let pokemonOne = 1;

const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    const data = await searchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        
        pokemonOne = data.id;
    } 
    else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (pokemonOne > 1) {
        pokemonOne -= 1;
        renderPokemon(pokemonOne);
    }
});

buttonNext.addEventListener('click', () => {
    pokemonOne += 1;
    renderPokemon(pokemonOne);
});

renderPokemon(pokemonOne);