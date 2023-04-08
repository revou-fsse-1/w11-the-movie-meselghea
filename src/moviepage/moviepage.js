
 async function fetchMovieDetails(id) {
    try {
      const response = await fetch(`http://localhost:3004/movies/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function displayMovieDetails() {
    const urlSource = new URLSearchParams(window.location.search);
    const id = urlSource.get("id");
    const movieDetails = document.getElementById("movie-details");
    const data = await fetchMovieDetails(id);
    const genre = data.genre
      .map(
        (genre) =>
          `<span class="genre rounded-3xl border px-3 border-black p-1">${genre}</span>`
      )
      .join("");
  
    movieDetails.innerHTML = `
    <div class="w-auto h-6">
    <h2 class="font-bold text-4xl sm:text-5xl sm:text-center">${data.title}</h2>
    </div>
    
    <div class="flex flex-row sm:flex-col justify-around mt-10 sm:mt-20 sm:items-center">
    <img src="${data.image}" class="object-fill sm:mt-6 h-72 w-52 rounded-2xl mt-5"/>
    <div>  
    <p class="ml-6 flex justify-evenly h-min w-auto font-bold sm:font-semibold sm:text-center mt-7 sm:mt-7 ">${genre}</p>
    <p class="ml-6 text-lg sm:text-sm mt-5 sm:mt-5 sm:ml-3 sm:font-semibold sm:text-center font-bold w-80">${data.synopsis}</p>
    <p class="ml-6 mt-10 sm:text-center">IMBD Rating ⭐${data.rating}/10</p>
    </div>
    <div>
    <iframe width="375px" height="230px" class="rounded-2xl sm:hidden mt-16 flex ml-20" src="${data.trailer}"></iframe>
    </div>
    `;
  }
  displayMovieDetails();