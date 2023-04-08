const API_ENDPOINT = "http://localhost:3004/";
const currentlyWatching = document.getElementById("currently-watching-card");

//currently watching card//

const loadCurrentlyWatching = () => {
  fetch(API_ENDPOINT + "currentWatch")
  .then((response) => response.json())
  .then((data) => {
    currentlyWatching.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      currentlyWatching.innerHTML += `
      <a
      class=" block rounded-3xl relative overflow-hidden gap-8  hover:bg-black"
      href="#" onclick="MovieDetail(this)"
      ><img
      class="w-max object-cover h-60 rounded-3xl hover:to-black"
      src="${data[i].image}"
      alt="${data[i]}" 
      />
      <p
      class="text-white/0 hover:text-white hover:bg-black/70 text-2xl font-bold absolute top-0 flex justify-center text-center items-center w-full h-full"
      id ="${data[i].id}"
      
      >
      ⭐${data[i].rating * 10} 
      </p>
      </a>
      `;
    }
  });
};
loadCurrentlyWatching();

//---Suggested To Watch-->
const suggestedwatch = document.getElementById("suggested-watch-card");

  const loadSuggestedwatch = () => {
    fetch(API_ENDPOINT + "isSuggested")
      .then((response) => response.json())
      .then((data) => {
        suggestedwatch.innerHTML = "";
        for (let i = 0; i < 4; i++) {
          suggestedwatch.innerHTML += `
          <a
          class=" block rounded-3xl relative overflow-hidden gap-8  hover:bg-black"
          href="#" onclick="MovieDetail(this)"
          ><img
          class="w-max object-cover h-60 rounded-3xl hover:to-black"
          src="${data[i].image}"
          alt="${data[i]}" 
          />
        <p
        class="text-white/0 hover:text-white hover:bg-black/70 text-2xl font-bold absolute top-0 flex justify-center text-center items-center w-full h-full"
        id ="${data[i].id}"
        
      >
      ⭐${data[i].rating * 10} 
      </p>
        </a>
          `;
        }
      });
  };
  loadSuggestedwatch();

//previously-watched//
  const previouslyWatch = document.getElementById("previously-watched-card");

  const loadPreviouslyWatch = () => {
    fetch(API_ENDPOINT + "isPrevious")
      .then((response) => response.json())
      .then((data) => {
        previouslyWatch.innerHTML = "";
        for (let i = 0; i < 6; i++) {
          previouslyWatch.innerHTML += `
          <a
          class=" block rounded-3xl relative overflow-hidden gap-8  hover:bg-black"
          href="#" onclick="MovieDetail(this)"
          ><img
          class="w-max object-cover h-60 rounded-3xl hover:to-black"
          src="${data[i].image}"
          alt="${data[i]}" 
          />
        <p
        class="text-white/0 hover:text-white hover:bg-black/70 text-2xl font-bold absolute top-0 flex justify-center text-center items-center w-full h-full"
        id ="${data[i].id}"
        
      >
      ⭐${data[i].rating * 10} 
      </p>
        </a>
          `;
        }
      });
  };
  loadPreviouslyWatch();

  let MovieDetail = (e) => {
    const movieID = e.getAttribute("id");
    localStorage.setItem("movieID", `${movieID}`);
    window.location.href = "./moviepage.html";
  };
  
  let goToWatchList = () => {
    window.location.href = "../moviepage.html";
  };