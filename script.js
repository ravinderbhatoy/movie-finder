const IMGPATH = "https://image.tmdb.org/t/p/w500"

const main = document.querySelector('main')
const form = document.getElementById('form')
const userInput = document.getElementById('search')
const webTitle = document.querySelector('h1')



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODBmODY3Y2ZlZWE3ZGZlYWUxMmI0ZGNhOGJiODkyOCIsInN1YiI6IjY0ZGIxNDg4ZjQ5NWVlMDI5MjUwYjJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LU9aKT_aGxZuG78CECnU97srQ0SLxzYTaJB5F-nSchM'
    }
};

function showMovies(data){
    data.results.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColorByRating(vote_average)}">${vote_average.toFixed(1)}</span>
            <div class="overview">
            <h4>Overview: </h4>
            ${overview}
            </div>
        </div>
        `
        main.appendChild(movieEl)
    })
}

async function movieBySearch(search) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1`, options)
    const data = await resp.json()
    main.innerText = ''
    webTitle.innerText = 'Search results'
    showMovies(data)
    return data.results
}


async function fetchMovies() {
    const resp = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = await resp.json()
    webTitle.innerText = 'Popular Movies'
    showMovies(data)
    return data.results
}

fetchMovies()


function getColorByRating(voteAvg) {
    if (voteAvg >= 8) {
        return 'green'
    } else if (voteAvg >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (userInput.value) {
        movieBySearch(userInput.value)
    }
})

