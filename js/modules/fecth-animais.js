import AnimaNumeros from './anima-numeros.js';

export default function fetchAminais(url, target) {
  // Cria a div contendo informações com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }
  // Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }
  // Anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Puxa cada animal utlizando o arquivo json
  // e cria cada animal utlizando o createAnimal
  async function criarAnimais() {
    try {
      // Fecth espera a resposta e transforma em JSON
      const animaisResponse = await fetch(url);
      const animaisJson = await animaisResponse.json();

      // Após a transformação em JSON, ativa as funcções
      // para preencher e animar os números
      animaisJson.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }
  return criarAnimais();
}
