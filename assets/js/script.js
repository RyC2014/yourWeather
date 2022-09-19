//'indy === city'

let city = "";
let url = "";
let APIkey = "";
let currenturl = "";
let queryurl = "";


function APIcalls() {
  url = "https://api.openweathermap.org/data/2.5/forecast?q=";
  currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
  APIkey = "&units=imperial&appid=5ad6f017c6ce3eaba0287e11606980ed";
  queryurl = url + "indianapolis" + APIkey;
  current_weather_url = currenturl + "indianapolis" + APIkey;

  console.log(current_weather_url);

  $("#name_of_city").text("Today's Weather in Indianapolis");
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
}
