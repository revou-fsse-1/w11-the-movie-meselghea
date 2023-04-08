const API_ENDPOINT = "http://localhost:3004/watchlist";
const watchlist = document.getElementById("watchlist-card");

//currently watching card//

const loadWatchlist = () => {
  fetch(API_ENDPOINT)
  then((response) => response.json())
    .then((data) => {
      watchlist.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        watchlist.innerHTML += `
        <a
        class="min-w-[155px] min-h-[235px] max-w-[155px] rounded-[20px] relative overflow-hidden"
        href="#"
        ><img
          class="w-[100%] object-cover h-[235px] rounded-[20px]"
          src="${data[i].image}"
          alt="${data[i]}"
      />
      <p
      class="text-white/0 hover:text-white hover:bg-black/70 text-5xl font-bold absolute top-0 flex justify-center items-center w-[100%] h-[100%]"
      id ="${data[i].id}"
      onclick="MovieDetail(this)"
    >
    ⭐ ${data[i].rating * 10}
    </p>
      </a>
            `;
      }
    });
};
loadWatchlist();