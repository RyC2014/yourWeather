//'indy === city'

let city = "";
let url = "";
let APIkey = "";
let currenturl = "";
let queryurl = "";
let citiesDiv = document.getElementById("searched_cities_container");
let cities = [];
init();
searchClicker();
listClicker();


// function pulls saved cities for array
function init() {
  let saved_cities = JSON.parse(localStorage.getItem("cities"));

  if (saved_cities !== null) {

    cities = saved_cities
  }

  renderButtons();



}


function storeCities() {

  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderButtons() {

  citiesDiv.innerHTML = "";
  if (cities == null) {
    return;
  }


  let unique_cities = [...new Set(cities)];
  for (let i = 0; i < unique_cities.length; i++) {
    let cityName = unique_cities[i];

    let buttonEl = document.createElement("button");
    buttonEl.textContent = cityName;
    buttonEl.setAttribute("class", "listbtn");

    citiesDiv.appendChild(buttonEl);
    listClicker();
  }
}

// on click funtion for search history
function listClicker() {

  $(".listbtn").on("click", function (event) {


    console.log("bueler..")
    event.preventDefault();
    console.log("did it work?")
    city = $(this).text().trim();
    APIcalls();
  })
}

// on click funtion for main search
function searchClicker() {

  $("#searchbtn").on("click", function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim()

    cities.push(city);

    // cities array length will not go over 5
    if(cities.length > 5); {
      cities.shift()
    }

    if (city == "") {
      return;
    }
    APIcalls();
    storeCities();
    renderButtons();
  })
}




function APIcalls() {

  url = "http://api.openweathermap.org/data/2.5/forecast?q=";
  currenturl = "http://api.openweathermap.org/data/2.5/weather?q=";
  APIkey = "&id=524901&appid=5ad6f017c6ce3eaba0287e11606980ed";
  queryurl = url + city + APIkey;
  current_weather_url = currenturl + city + APIkey;

  console.log(current_weather_url);

  $("#name_of_city").text("Today's weather in " + city);
  $.ajax({
    url: queryurl,
    method: "GET",
  }).then(function (response) {
    let day_number = 0;

    //iterate through the 40 weather data sets
    for (let i = 0; i < response.list.length; i++) {
      
      //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
      if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
        //if time of report is 3pm, populate text areas accordingly
        let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
        let month = response.list[i].dt_txt.split("-")[1];
        let year = response.list[i].dt_txt.split("-")[0];
        $("#" + day_number + "date").text(month + "/" + day + "/" + year);
        let temp = Math.round(
          ((response.list[i].main.temp - 273.15) * 9) / 5 + 32
        );
        $("#" + day_number + "five_day_temp").text(
          "Temp: " + temp + String.fromCharCode(176) + "F"
        );
        $("#" + day_number + "five_day_humidity").text(
          "Humidity: " + response.list[i].main.humidity
        );
        $("#" + day_number + "five_day_icon").attr(
          "src",
          "http://openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png"
        );
        console.log(response.list[i].dt_txt.split("-"));
        console.log(day_number);
        console.log(response.list[i].main.temp);
        day_number++;
      }
    }
  });

  // current weather function
  $.ajax({
    url:current_weather_url,
    method: "GET", 
}).then(function(current_data){
    console.log(current_data);
    let temp = Math.round(((current_data.main.temp - 273.15) * 9/5 + 32))
    console.log("The temperature in " + city + " is: " + temp);
    $("#today_temp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
    $("#today_humidity").text("Humidity: " + current_data.main.humidity);
    $("#today_wind_speed").text("Wind Speed: " + current_data.wind.speed);
    $("#today_icon_div").attr({"src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
     "height": "100px", "width":"100px"});
})

}