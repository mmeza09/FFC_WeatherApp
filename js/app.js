var API = 'https://fcc-weather-api.glitch.me/api/current?';
var actualTempUnit = 'C';
var actualTemp;

function getWeather(lat,lon){
    $.ajax({
        url:API + 'lat='+lat+'&lon='+lon,
        type:"GET",
        dataType:'json',
        success:function(data){ 
            actualTemp=data.main.temp.toFixed(1);
            $('#temperature').html(data.main.temp.toFixed(1)+ ' °C');
            $('#location').html(data.name +', '+data.sys.country);
            $('#weather').html(data.weather[0].main);
            $('#description').html(data.weather[0].description);
            var weather = data.weather[0].main.toLowerCase();
            switch(weather){
                case 'clear':
                $('#weather-icon').addClass('wi wi-day-sunny'); break;
                case 'rain':
                $('#weather-icon').addClass('wi wi-rain'); break;
                case 'clouds':
                $('#weather-icon').addClass('wi wi-cloudy'); break;
                case 'drizzle':
                $('#weather-icon').addClass('wi wi-sprinkle'); break;
                case 'snow':
                $('#weather-icon').addClass('wi wi-snow'); break;
                case 'thunderstom':
                $('#weather-icon').addClass('wi wi-thunderstorm'); break;
                default:
                console.log('No weather icon found!');
            }
            
        }
    })
}

function changeTempUnit(){
    if (actualTempUnit === 'C'){
        actualTempUnit = 'F';
        actualTemp = (actualTemp*1.8)+32;
        $('#temperature').html(actualTemp.toFixed(1) +' °F');
    }else{
        actualTempUnit = 'C';
        actualTemp = (actualTemp-32)/1.8;
        $('#temperature').html(actualTemp.toFixed(1)+' °C');
    }
}
$(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            getWeather(position.coords.latitude,position.coords.longitude);
        })
    }else{
        console.error('Geolocalization is not allowed or supported in this browser!')
    }
    $("#temperature").on('click',changeTempUnit);
});