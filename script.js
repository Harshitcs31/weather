let weather = {
    apiKey: "80e6e552d831a4d1d3bdae019a71c4e6",
    fetchWeather:function(city){
        fetch(
            // "https://api.openweathermap.org/data/2.5/weather?q=patna&appid=80e6e552d831a4d1d3bdae019a71c4e6"
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            +city 
            +"&units=metric&appid=" 
            +this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const{name} = data;
        const{icon, description} = data.weather[0];
        const{feels_like} = data.main;
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        //{sunrise} = data.sys;
        const{country} = data.sys;
        //console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".country").innerText = country;

        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C " ;
        document.querySelector(".feels_like").innerText = "Feels Like: " + feels_like+ "°C";
        //document.querySelector(".sunrise").innerText = "Sunrise: " + sunrise ;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "Km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
} ;

document
    .querySelector(".search button")
    .addEventListener("click", function(){
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Patna");