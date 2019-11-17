
let history = []
function getWeather() {
    $('.weatherResponse').html('');
    var cityName = $('#cityName').val();
    history.push(cityName);
    localStorage.setItem("History", JSON.stringify(history));
    var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b6fa23b52bf3cf09a13463a9202b84e8';
    // $.getJSON(apiCall, weatherCallback);
    $.ajax({
        type: "GET",
        url: apiCall,
        dataType: "json",
    }).then(function(weatherData){
        console.log(weatherData)
        var cityName = weatherData.name;
        var description = weatherData.weather[0].description;
        var temp = weatherData.main.temp;
        var humid = weatherData.main.humidity;
        var wind = weatherData.wind.speed;
        var cityInfo = cityName + description + temp + humid + wind;
        $('.weatherResponse').append("<H2>" + cityName + "<H2>");
        $('.weatherResponse').append("<h3>" + "Current Weather: " + description + "<h3>");
        $('.weatherResponse').append("<h3>" + "Current Temperature: " + temp + "<h3>");
        $('.weatherResponse').append("<h3>" + "Humidity: " + humid + "<h3>");
        $('.weatherResponse').append("<h3>" + "Wind Speed : " + wind + "<h3>");
        loopLocalStorage()
    })

}
function loopLocalStorage (){
    console.log("HIST", window.localStorage.getItem("History"))
    let hist = JSON.parse(window.localStorage.getItem("History")) || []; // "[Austin, Houston]" ----> [Austin, Houston]
    console.log(hist)
    for (var i =0; i < hist.length; i++){
       var apiSearch=  'http://api.openweathermap.org/data/2.5/weather?q=' + hist[i] + '&appid=b6fa23b52bf3cf09a13463a9202b84e8';
       console.log("API", apiSearch)


        var a = $("<button>");
        a.text(hist[i]);
    }
    $(".weatherStore").append(a);
    $(document).on("click", ".cityButton", apiSearch)
}
loopLocalStorage()
