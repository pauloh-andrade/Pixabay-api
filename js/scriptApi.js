"use strict";
let contador = document.querySelector("#pagina");
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
    newStatus.innerHTML = `${status.totalHits} ${tipoBusca} grátis de ${pesquisa}`;
    container.appendChild(newStatus);
}
//variavel para carregar quantidade de paginas
const carregarPaginas = (totalImagens, imagensPagina) =>{
    const quantPagina = Math.ceil(totalImagens.totalHits/imagensPagina);
    const container = document.querySelector("#quantPaginas");
    const newQuant = document.createElement("p");
    newQuant.innerHTML = `/${quantPagina}`;
    container.appendChild(newQuant);
    
}
//function para retornar infromações sobre a busca(tipo, categoria, e pasta)
const tipoBusca = ()=>{
    //recebendo value do select
    const busca = document.querySelector("#categorias").value;
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
//function para atualizar pagina

//function para pesquisar imagens 
const pesquisarImagens = async(pesquisa) =>{
        const ordernar = document.querySelector("#order").value;
        const orientacao = document.querySelector("#orientation").value;
        const categoria = document.querySelector("#category").value;
        const cor = document.querySelector("#color").value;
    
        let pagina = contador.value;
        //recebendo tipo de busca (video ou image) e dirretório video
        const busca = tipoBusca();
        //url json pixabay
        const url = `https://pixabay.com/api/${busca[1]}?key=23670717-85b5103b3d880933d4e67c566&q=${pesquisa}&lang=pt&${busca[0]}&per_page=20&page=${pagina}&order=${ordernar}&orientation=${orientacao}&category=${categoria}&colors=${cor}`;
        //fazendo requisição
        const response = await fetch(url);
        //Extraindo json
        const imagens = await response.json();

        limparElementos(document.querySelector("#container-galeria"));
        limparElementos(document.querySelector(".status"));
        limparElementos(document.querySelector("#quantPaginas"));

        carregarGaleria(imagens.hits);
        carregarStatus(imagens,pesquisa,busca[2]);
        carregarPaginas(imagens,20);

}
//function para avançar uma pagina
const proximaPagina = () =>{
    const quantPagina = parseInt(document.querySelector("#quantPaginas").textContent.replace('/',''));
    if(contador.value < quantPagina){
        contador.value = parseInt(contador.value) + 1;
        const pesquisa = document.querySelector("#pesquisa").value;
        pesquisarImagens(pesquisa);
    }
}
//function para voltar uma pagina
const paginaAnterior = () =>{
    if(contador.value >1){
        contador.value = parseInt(contador.value) - 1;
        const pesquisa = document.querySelector("#pesquisa").value;
        pesquisarImagens(pesquisa);
    }
}
//function para receber pesquisa
const pesquisa =(evento)=>{
    if(evento.key == "Enter"){
        contador.value = 1;
        //recebendo value do input
        const pesquisa = evento.target.value;
        pesquisarImagens(pesquisa);
        
    }
}
//function verificar icon-user
const verificarUser = (item) =>{
    if(item.userImageURL == ''){
        item.userImageURL = 'img/user.png'
        return item.userImageURL
    }
    else{
        return item.userImageURL;
    }
    
}
//function para criar cards de imagens
const criarItem = item =>{
    //criando container
    const container = document.querySelector("#container-galeria");
    const newCard =document.createElement("div");
    //newCard.href = `${item.pageURL}`;
    const tags = item.tags.replace(/,+/g, '');
    //chamando função para verificar foto de usuario
    item.userImageURL = verificarUser(item);
    //criando card
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
    //carregando card
    container.appendChild(newCard);
}
const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisa);
document.querySelector("#proximo").addEventListener("click", proximaPagina);
document.querySelector("#anterior").addEventListener("click", paginaAnterior);


