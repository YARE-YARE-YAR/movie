
const API_KEY = 'eacf3df4-a4f2-4a9f-960b-74db5eafeb4f'
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const API_URL_MOVIE_ID= `https://kinopoiskapiunofficial.tech/api/v2.2/films/`


const movies = document.querySelector('.movies')
const movieCover = document.querySelector('.movie_cover')
const form =document.querySelector('form')
const search = document.querySelector('.header__search')
getMovies(API_URL)

async function getMovies(url){
    const resp =await fetch(url, {
        headers:{
            "Content-Type":"application/json",
            "X-API-KEY": API_KEY,
        },
    })
    const respData = await resp.json()

    showMovies(respData)

    console.log(respData.total)
}
    function showMovies(data){
 const moviesEl = document.querySelector('.movies')



        data.items.forEach((movie) => {
            
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            


            form.addEventListener('submit', e =>{
                e.preventDefault()
                // console.log(movie.nameRu.includes(search.value))

                 if(movie.nameRu.toLowerCase().includes(search.value)){
                     
                     movieEl.innerHTML=`
                         <div id="id" class="movie">
                    <div class="movie__cover-inner">
                        <img class="movie_cover" src="${movie.posterUrl}">
                        <div class="movie__cover--darkened"></div>
                     </div>
                     <div class="movie__info">
                        <div class="movie__title">${movie.nameRu}</div>
                        <div class="movie__category">${movie.genres.map((categor) => ` ${categor.genre}`)}</div>
                        <div class="movie__average movie__average--${rating()}">${movie.ratingKinopoisk}</div>
                     </div>
                  </div>
                         `
                         movieEl.classList.remove('no')
                 }else{
                    movieEl.innerHTML= ''
                    
                    movieEl.classList.add('no')

                 }
                 
                 
             })

            function showModalFunc(){

            }


             form.addEventListener('submit', e =>{
                e.preventDefault()
                if(!search.value){        
               movieEl.classList.remove('no')
                }
             })





    movieEl.innerHTML=`
    <div id="id" class="movie">
<div class="movie__cover-inner">
   <img class="movie_cover" src="${movie.posterUrl}">
   <div class="movie__cover--darkened"></div>
</div>
<div class="movie__info">
   <div class="movie__title">${movie.nameRu}</div>
   <div class="movie__category">${movie.genres.map((categor) => ` ${categor.genre}`)}</div>
   <div class="movie__average movie__average--${rating()}">${movie.ratingKinopoisk}</div>
</div>
</div>
    `
    // if(search.value.length == 0){
        moviesEl.appendChild(movieEl)
    // }
   
        
           
                
    function rating(){
        if(movie.ratingKinopoisk < 6){
            return `red`
        }else if(movie.ratingKinopoisk < 9 ){
            return 'orange'
        }else if(movie.ratingKinopoisk >= 9){
            return 'green'
        }
    } 

    movieEl.addEventListener('click', ()=> openModal(movie.kinopoiskId))
        })  
}





// MODAL

const modal = document.querySelector('.modal')
async function openModal(id){
document.querySelector('body').classList.add('stopScroll')
    const resp =await fetch(API_URL_MOVIE_ID + id, {
        headers:{
            "Content-Type":"application/json",
            "X-API-KEY": API_KEY,
        },
    })
    const respData = await resp.json()

    const bodalBackBlack = document.querySelector('.modal__back')

    modal.classList.add('modal__open')
     
    modal.innerHTML=`<div class="modal__back  ">
<div class="modal__window ">

<img class="modal__img" src="${respData.posterUrl}" height="250">
<h2 class="modal__title">${respData.nameRu}</h2>
<div class='modal-information'>
<div class='modal-site'>Сайт: <a href='${respData.webUrl}'>${respData.webUrl}</a></div>
<div class='modal-year'>Год: ${respData.year}</div>
<div class='modal-time'>Время: ${respData.filmLength} мин</div>
<div class='modal-overwiew'>Описание: ${respData.description}</div>
</div>
<button class="modal__close">X</button>
</div>
`

modal.addEventListener('click', (e) => {
    if(e.target == document.querySelector('.modal__close')){
        modal.classList.remove('modal__open')
        document.querySelector('body').classList.remove('stopScroll')

    }
})
window.addEventListener('click', (e)=>{
   if(e.target == document.querySelector('.modal__back')){
    modal.classList.remove('modal__open')
    document.querySelector('body').classList.remove('stopScroll')


   }
})

}
