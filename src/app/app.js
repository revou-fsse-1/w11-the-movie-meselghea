//fetch function
async function getAllMovies() {
  try {
    const response = await fetch(`http://localhost:3004/movies/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getAllWatchlist() {
  try {
    const response = await fetch(`http://localhost:3004/watchlist`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getCurrentWatch() {
  try {
    const response = await fetch(`http://localhost:3004/currentWatch`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getMovieById(id) {
  try {
    const response = await fetch(`http://localhost:3004/movies/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getPreviousWatch() {
  try {
    const response = await fetch(`http://localhost:3004/isPrevious`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getSuggestedWatch() {
  try {
    const response = await fetch(`http://localhost:3004/isSuggested`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


//curent watch
async function renderCurrentWatch() {
  let movies = await getCurrentWatch();
  let componentList = movies.map((movie) => movieCardComponent(movie));
  let cardListWrapper = document.getElementById("current-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//suggested watch
async function renderSuggestedWatch() {
  let movies = await getSuggestedWatch();
  let componentList = movies.map((movie) =>
    movieWithRatingCardComponent(movie)
  );
  let cardListWrapper = document.getElementById("suggested-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//previous watch
async function renderPreviousWatch() {
  let movies = await getPreviousWatch();
  let componentList = movies.map((movie) => movieCardComponent(movie));
  let cardListWrapper = document.getElementById("previous-watch-list");
  cardListWrapper.innerHTML = componentList.join("");
}

// movie id with description
async function renderMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  localStorage.setItem("movieId", `${movieId}`);
  console.log("movieid", movieId);
  const loadToLocalStorage = () => {
    fetch(`http://localhost:3004/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("movieTitle", `${data.title}`); //title
        localStorage.setItem("movieImage", `${data.image}`); //image
        localStorage.setItem("movieSynopsis", `${data.synopsis}`); //synopsis
        localStorage.setItem("movieGenre", `${data.genre}`); //genre
        localStorage.setItem("movieProduction", `${data.production}`);
        localStorage.setItem("movieTrailer", `${data.trailer}`); //trailer
        localStorage.setItem("movieRating", `${data.rating}`); //rating
        localStorage.setItem("movieYear", `${data.year}`); //year
      });
  };
  loadToLocalStorage();

  let movie = await getMovieById(movieId);
  let movieComponent = movieDetailComponent(movie);
  let movieWrapper = document.getElementById("movie-detail-id"); 
  movieWrapper.innerHTML = movieComponent;
}

//add watchlist
function addWatchlist() {
let movieId = localStorage.getItem("movieId");
  fetch("http://localhost:3004/watchlist", {
    method: "POST",
    body: JSON.stringify({
      id: movieId,
      title: localStorage.getItem("movieTitle"),
      image: localStorage.getItem("movieImage"),
      synopsis: localStorage.getItem("movieSynopsis"),
      genre: localStorage.getItem("movieGenre"),
      trailer: localStorage.setItem("movieTrailer", "data.trailer"),
      production: localStorage.getItem("movieProduction"),
      rating: localStorage.getItem("movieRating"),
      year: localStorage.getItem("movieYear"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
// Watchlist
async function renderMoviesList() {
  let movies = await getAllWatchlist();
  let componentList = movies.map((movie) =>
    movieWithRatingCardComponent(movie)
  );
  let cardListWrapper = document.getElementById("movie-list");
  cardListWrapper.innerHTML = componentList.join("");
}

//library load
addEventListener("DOMContentLoaded", function () {
  renderCurrentWatch();
  renderSuggestedWatch();
  renderPreviousWatch();
  renderMovieDetail();
  renderMoviesList();
});

//load component
function movieCardComponent(movie) {
  return `
        <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="moviepage.html?id=${
          movie.id
        }">
        <img class="w-44 object-cover h-64 rounded-3xl" src="${
          movie.image
        }" alt="Cover movie ${movie.title}">
        <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full">
        ⭐${movie.rating}
        </p>
      </a>
      `;
}

function movieWithRatingCardComponent(movie) {
  return `
        <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="moviepage.html?id=${
          movie.id
        }">
        <img class="w-44 object-cover h-64 rounded-3xl" src="${
          movie.image
        }" alt="Cover movie ${movie.title}">
        <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full">
        ⭐${movie.rating}
        </p>
      </a>
      `;
}

function movieDetailComponent(movie) {
  return `
  <div class="overflow-x-hidden max-w-screen-xl max-md:justify-center max-md:px-3 max-md:item-center">
    <div class="flex flex-auto max-md:justify-center max-w-screen-xl py-6 mx-auto">
      <h1 class="font-bold mb-4 text-4xl max-md:whitespace-normal max-md:text-center">${movie.title}<h1>
  </div>
  <section class="grid grid-cols-5 gap-8 max-md:items-center justify-between py-6 mx-auto max-md:grid-cols-1 max-md:content-center max-md:justify-center">
  <div class="block max-md:justify-center"><img class="max-md:place-items-center max-md:justify-center max-md:content-center h-full w-full rounded-3xl" src="${movie.image}" alt="Cover movie ${movie.title}"></div>
  <div class="col-span-2 max-sm:grid-none">        
    <div class="flex gap-2 py-4 mb-2 flex-wrap">
            <button class="border text-black text-sm font-bold bg-neutral-100 hover:bg-gray-500 p-2 px-4 rounded-3xl sm:items-center sm:font-light">${movie.genre[0]}</button>
            <button class="border text-black text-sm font-bold  bg-neutral-100 hover:bg-gray-500 p-2 px-4 rounded-3xl sm:items-center sm:font-light">${movie.genre[1]}</button>
            <butto class="border text-black text-sm font-bold  bg-neutral-100 hover:bg-gray-500 p-2 px-4 rounded-3xl sm:items-center sm:font-light">${movie.genre[2]}</button>
    </div>
            <div class="pr-5 text-left max-md:w-full"><p>${movie.synopsis}</p></div>
            <div>IMDB Rating ${movie.rating}/10</div>
  </div>
  <div class="col-span-2"><iframe class="w-screen h-60"
  src="${movie.trailer}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  ></iframe>
  </div>
  </section>
  </div>
    `;
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  searchInput.classList.toggle("max-[390px]:hidden");
  searchInput.focus();
});

