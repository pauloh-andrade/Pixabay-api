"use stritic";

//function para limpar elementos ao pesquisar
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}
//function para carregar o status de busca
const carregarStatus = (status,pesquisa,tipoBusca) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p");
    newStatus.classList = ".txt-padrao";
    newStatus.innerHTML = `${status.totalHits} ${tipoBusca} grátis para ${pesquisa}`;
    container.appendChild(newStatus);
}
//function para retornar infromações sobre a busca(tipo, categoria, e pasta)
const tipoBusca = ()=>{
    //recebendo value do select
    const busca = document.querySelector(".categorias").value;
    //extraindo tipo de busca (image ou video)
    let tipoBusca = busca.substring(0,busca.lastIndexOf('.'));
    //extraindo categoria
    const categorias = busca.substring(busca.lastIndexOf('.') + 1);    
        
    //testando busca por video ou imagem
    if(tipoBusca == "imagens"){
        var urlBusca = `image_type=${categorias}`;
        var pastaVideo = "";
    }
    else{
        var urlBusca = `video_type=${categorias}`;
        var pastaVideo = "videos/";
    }
    const arrayBusca = [urlBusca,pastaVideo,tipoBusca];
    return arrayBusca;
}
//function para pesquisar imagens 
const pesquisarImagens = async(evento) =>{
    if(evento.key == "Enter"){
        //recebendo tipo de busca (video ou image) e dirretório video
        const busca = tipoBusca();
        //recebendo value do input
        const pesquisa = evento.target.value;
        //url json pixabay
        const url = `https://pixabay.com/api/${busca[1]}?key=23670717-85b5103b3d880933d4e67c566&q=${pesquisa}&lang=pt&${busca[0]}`;
        //fazendo requisição
        const response = await fetch(url);
        //Extraindo json
        const imagens = await response.json();

        limparElementos(document.querySelector("#container-galeria"));
        limparElementos(document.querySelector(".status"));

        carregarGaleria(imagens.hits);
        carregarStatus(imagens,pesquisa,busca[2]);
    }
}
//function para criar cards de imagens
const criarItem = item =>{
    const container = document.querySelector("#container-galeria");
    const newCard =document.createElement("div");
    //newCard.href = `${item.pageURL}`;
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
                <img class="card-image" src="${item.webformatURL?item.webformatURL:'https://i.vimeocdn.com/video/'+ item.picture_id+'_640x360.jpg'} ">
                </a>
            `;
    container.appendChild(newCard);
}


const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);
document.querySelector(".categorias").addEventListener("slected", pesquisarImagens);