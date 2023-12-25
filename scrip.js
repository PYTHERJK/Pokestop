const urlApi = 'https://pokeapi.co/api/v2/pokemon';
const pokemomElement = document.querySelector('.pokemom')
// função para gerar um id aleatório com números inteiros
const randomId = () => Math.floor(Math.random() * 905)

// função para pegar as habilidades dos pokemons
const getAbilities = (abilities) =>
    abilities.map(item => item.ability.name);

const createAbilities = (abilities) => abilities.reduce((acc, item) => acc += `<li>${item}</li>`, '')

const createPokemom = ({ image, name, abilities }) => {
    pokemomElement.innerHTML = `<div class="pokemom__wrapper__imagem">
    <img
      src="${image}"
      class="pokemom__image"
      alt="pokemom ${name}"
    />
  </div>
  <div class="pokemom__info">
    <h2 class="pokemom__name">${name}</h2>
    <ul class="pokemom__abilities">
    ${createAbilities(abilities)}
    </ul>
  </div>`;
}



// pega a url/nome ou id
const getPokemom = () =>
    fetch(`${urlApi}/${randomId()}`)
        .then(response => response.json())
        .then(({name, abilities, ...pokemom}) => {
            const pokemomImage = pokemom.sprites.other.dream_world.front_default
            const pokemomSelected = {
                name: name,
                image: pokemomImage ? pokemomImage : '/assets/pokemon_logo.png',
                abilities: getAbilities(abilities)
            }
            createPokemom(pokemomSelected)
        })

getPokemom();