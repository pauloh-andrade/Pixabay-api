"use stritic";
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const carregarStatus = (status,pesquisa) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p");
    newStatus.classList = ".txt-padrao";
    newStatus.innerHTML = `${status.totalHits} fotos grátis para ${pesquisa}`;
    container.appendChild(newStatus);
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
        limparElementos(document.querySelector(".status"));

        carregarGaleria(imagens.hits);
        carregarStatus(imagens,pesquisa);
    }
}
const criarItem = item =>{
    const container = document.querySelector("#container-galeria");
    const newCard =document.createElement("div");
//    newCard.href = `${item.pageURL}`;
    const tags = item.tags.replace(/,+/g, '');
    newCard.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="img-perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${tags}</div>
                    <div class="row">
                        <div class="row info"><img src="img/like-24.png">${item.likes}</div>
                        <div class="row info"><img src="img/comment-24.png">${item.comments}</div>
                        <div class="row info"><img src="img/star-24.png"></div>
                    </div>
                </div>
                <a class="card-image"href="${item.pageURL}">
                <img class="card-image" src="${item.webformatURL}">
                </a>
            
            `;
    container.appendChild(newCard);
}


const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);