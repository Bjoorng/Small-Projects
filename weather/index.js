const apiKey = "4108a077b36e7f8cfb5d8e99eb8e53ed";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchStBox = document.querySelector(".searchStart input");
const searchStBtn = document.querySelector(".searchStart button");
const weatherIcon = document.querySelector(".weatherIcon");
let cardsContainer = document.createElement("div");
cardsContainer.classList.add("cardsContainer");
let mainContainer = document.querySelector(".mainContainer");
mainContainer.appendChild(cardsContainer);

const weatherInfo = async function getWeather(element) {
  fetch(apiUrl + element + `&appid=${apiKey}`, {})
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error while retrieving the data");
      }
    })
    .then((data) => {
      console.log(data);

      const getIcon = function (data) {
        if (data.weather[0].main == "Clear") {
          return "images/clear.png";
        } else if (data.weather[0].main == "Clouds") {
          return "images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
          return "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          return "images/drizzle";
        } else if (data.weather[0].main == "Snow") {
          return "images/snow.png";
        } else {
          return "images/mist.png";
        }
      };

      console.log(data.weather[0].main);

      let cardTemplate = document.createElement("div");
      cardTemplate.innerHTML = `
          <div class="card">
                <div class="search">
                  <input type="text" placeholder="search" spellcheck="false" />
                  <button>
                    <img src="./images/search.png" alt="search icon" />
                  </button>
                </div>
                <div class="weather">
                  <img
                    class="weatherIcon"
                    src="${getIcon(data)}"
                    alt="the picture representing the weather"
                  />
                  <div class="cityTemp">
                    <div class="city">${data.name}</div>
                    <div class="temperature">${Math.round(
                      data.main.temp
                    )}°</div>
                    <div class="minMax">
                      <div class="min">
                        <div>min.</div>
                        <div class="minTemp">${Math.round(
                          data.main.temp_min
                        )}°</div>
                      </div>
                      <div class="max">
                        <div>max.</div>
                        <div class="maxTemp">${Math.round(
                          data.main.temp_max
                        )}°</div>
                      </div>
                    </div>
                  </div>
                  <div class="details">
                    <div class="detSec">
                      <img
                        class="hum"
                        src="images/humidity.png"
                        alt="humidity icon"
                      />
                      <div class="humDiv">
                        <p class="humidity">${data.main.humidity}%</p>
                        <p class="humText">Humidity</p>
                      </div>
                    </div>
                    <div class="detSec">
                      <img class="wind" src="images/wind.png" alt="wind icon" />
                      <div class="windDiv">
                        <p class="windSpeed"></p>
                        <p class="windText">${data.wind.speed} kph</p>
                      </div>
                      <div>
                        <button class="remove">X</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
          `;

      cardsContainer.appendChild(cardTemplate);

      localStorage.setItem(element);

      const searchBoxes = document.querySelectorAll(".search input");
      const searchBtns = document.querySelectorAll(".search button");
      
      const removeBtns = document.querySelectorAll(".remove");

      removeBtns.forEach((e) =>{
        e.addEventListener("click", () => {
         card = e.closest(".card");
         card.classList.add("dNone");
        });
      });


      searchBtns.forEach((searchBtn, index) => {
        let weatherInner = function (element) {
          fetch(apiUrl + element + `&appid=${apiKey}`, {})
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error("Error while retrieving the data");
              }
            })
            .then((data) => {
              const getInnerIcon = function (data) {
                if (data.weather[0].main == "Clear") {
                  return "images/clear.png";
                } else if (data.weather[0].main == "Clouds") {
                  return "images/clouds.png";
                } else if (data.weather[0].main == "Rain") {
                  return "images/rain.png";
                } else if (data.weather[0].main == "Drizzle") {
                  return "images/drizzle";
                } else if (data.weather[0].main == "Snow") {
                  return "images/snow.png";
                } else {
                  return "images/mist.png";
                }
              };

              let card = searchBtn.closest(".card");
              let weatherContainer = card.querySelector(".weather");
              weatherContainer.innerHTML = `
                <img
                  class="weatherIcon"
                  src="${getInnerIcon(data)}"
                  alt="the picture representing the weather"
                />
                <div class="cityTemp">
                  <div class="city">${data.name}</div>
                  <div class="temperature">${Math.round(data.main.temp)}°</div>
                  <div class="minMax">
                    <div class="min">
                      <div>min.</div>
                      <div class="minTemp">${Math.round(data.main.temp_min)}°</div>
                    </div>
                    <div class="max">
                      <div>max.</div>
                      <div class="maxTemp">${Math.round(data.main.temp_max)}°</div>
                    </div>
                  </div>
                </div>
                <div class="details">
                  <div class="detSec">
                    <img
                      class="hum"
                      src="images/humidity.png"
                      alt="humidity icon"
                    />
                    <div class="humDiv">
                      <p class="humidity">${data.main.humidity}%</p>
                      <p class="humText">Humidity</p>
                    </div>
                  </div>
                  <div class="detSec">
                    <img class="wind" src="images/wind.png" alt="wind icon" />
                    <div class="windDiv">
                      <p class="windSpeed"></p>
                      <p class="windText">${data.wind.speed} kph</p>
                    </div>
                    <div>
                        <button class="remove">X</button>
                      </div>
                  </div>
                </div>
              `;
            })
            .catch((error) => {
              console.error(error);
            });
        };

        searchBtn.addEventListener("click", () => {
          weatherInner(searchBoxes[index].value);
          searchBoxes[index].value = "";
        });

        let removeBtn = document.querySelector(".remove");

        removeBtn.addEventListener("click", () => {
          card.classList.add("dNone");
          console.log(card);
        })

        searchBoxes[index].addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            weatherInner(searchBoxes[index].value);
            searchBoxes[index].value = "";
          }
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

searchStBtn.addEventListener("click", () => {
  weatherInfo(searchStBox.value);
  searchStBox.value = "";
});

searchStBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weatherInfo(searchStBox.value);
    searchStBox.value = "";
  }
});
