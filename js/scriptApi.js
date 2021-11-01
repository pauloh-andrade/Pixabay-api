"use stritic";
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const pesquisarImagens = async(evento) =>{
    if(evento.key == "Enter"){
        //recebendo value do input
        const pesquisa = evento.target.value;
        //url json pixabay
        const url = `https://pixabay.com/api/?key=23670717-85b5103b3d880933d4e67c566&q=${pesquisa}&image_type=photo&pretty=true`;
        //fazendo requisição
        const response = await fetch(url);
        //Extraindo json
        const imagens = await response.json();
        console.log(imagens);

        limparElementos(document.querySelector("#container-galeria"));

        carregarGaleria(imagens.hits);

    }
}
const criarItem = item =>{
    const container = document.querySelector("#container-galeria");
    const newCard =document.createElement("div");
    newCard.innerHTML = `
            <div class="options"></div>
            <img class="card-image" src="${item.webformatURL}">
            `;
    container.appendChild(newCard);
}


const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);