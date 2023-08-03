const formulario=document.querySelector('#formulario')
const listaTweets=document.querySelector('#lista-tweets')
let comen = [];


eventlistener();
//aqui voy a crear los listener
function eventlistener(){
    formulario.addEventListener('submit',agregartweet);
    document.addEventListener('DOMContentLoaded',()=>{
    comen=JSON.parse(localStorage.getItem('comen')) || []
    console.log(comen);
    crearHTML();
    });
}
//aqui las funciones
function agregartweet(e){
 e.preventDefault();   
 const tweets=document.querySelector('#tweet').value

 if(tweets==''){
    mostrarerror('EL mensaje esta vacio ')
    return;
  
    }
    const tweetobj={
        id:Date.now(),
        tweets:tweets
}
 comen=[...comen,tweetobj]
 crearHTML();
 formulario.reset();
 
}



function mostrarerror(error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error');
    const contenido=document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(()=>{
        mensajeError.remove();
    },3000)


}
 
function crearHTML(){
    limpiarHTMl();
    if(comen.length>0){
        comen.forEach((tweets)=>{
            const botonBorrar=document.createElement('a');
            botonBorrar.classList='borrar-tweet';
            botonBorrar.innerText='Eliminar';
            botonBorrar.onclick=()=>{
                borrarTweet(tweets.id);
            }
            const li=document.createElement('li');
            li.textContent=tweets.tweets;
            li.appendChild(botonBorrar);
            listaTweets.appendChild(li)
        })
    }
    agregarstorage();
};
function agregarstorage(){
localStorage.setItem('comen',JSON.stringify(comen))
}
function borrarTweet(id){
    console.log('eliminando tweet',id);
    comen=comen.filter(tweets=>tweets.id !== id);
    crearHTML();
}

function limpiarHTMl(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

