// App object
const weather = {};

// Init
weather.init = function(){
    weather.getUserInput();
    weather.getDate();
    weather.changeLocation();
    weather.inputPlaceholder();
}

// Input
weather.inputPlaceholder = function(){
    $('.inputField').on('click', function(){
        $('#city').focus();
        $('.inputPlaceholder').css({
            'top':'-40px',
            'font-size': '24px'
        });
    })
}

// Create date
weather.getDate = function(){
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
    const months = monthNames[month];
    $('.date').text(`${months} ${day}, ${year}`)
}

// Retrieve input from search
weather.changeLocation = function(){
     $('.changeLocation').on('click', function(){
       location.reload();
    });
}

weather.getUserInput = function(){

    $("#submit").click(function(e) {
        e.preventDefault();
        const userInputString = $('#city').val();
        const userInputArray = userInputString.split(',');
        const userLocationLong = `${userInputArray[0]}, ${userInputArray[2]}`;
        $('.locationData').text(`${userLocationLong}`);

        const userInputCity = userInputArray[0];

        weather.getSearchData(userInputCity);
        $('.primary-wrapper').css('transform', 'translateY(-100vh)');
        $('.title').css('opacity','0.05')

    });

}

weather.getWeatherApiKey = '9ebf3823937188011fc9cfb4540e1b5a';

weather.getSearchData = function(query){
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${weather.getWeatherApiKey}&units=metric`,
        method: 'GET',
        dataType: 'json'
    })
    .then(function(feed){
        weather.temperatureData = feed.main;
        weather.humidityData = feed.main.humidity;
        weather.condition = feed.weather[0].main;
        weather.windspeed = feed.wind.speed;
        weather.updateWeatherDom();
    });
}

//Add the data to DOM
weather.updateWeatherDom = function(){
    const temp = weather.temperatureData;
    $('.windspeedValue').text(weather.windspeed)
    $('.humidityValue').text(weather.humidityData)
    $('.mainConditionValue').text(weather.condition)
    $('.tempValue').text(temp.temp.toFixed(0))
}


$(document).ready(function(){
  weather.init();
});


