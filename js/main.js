$(document).ready(function() {
  var temperatur;
    if (navigator.geolocation) {
        var lat, lng;
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            apiKey = '2131efb53e7d072d49456432ddb0b028';
            console.log('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + apiKey);
            $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + apiKey, function(weather) {
                $('#location').html(weather.sys.country + ', ' + weather.name);
                $('#status').html(weather.weather[0].description);
                $('#temperatur').html(toC(weather.main.temp));
                temperatur=weather.main.temp;
                $('#icon').attr('src', 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png');
            }, function(error) {}, {
                enableHighAccuracy: true
            });
        });
    }

    function toC(kelvin) {
        return Math.floor(kelvin - 273.15);
    }

    function toF(kelvin) {
        return Math.floor(kelvin * 9/5 - 459.67);
    }

    function toCFF(f) {
        return Math.floor((f - 32) / 1.8);
    }
    $('.unit').on('click', function() {
        if ($('.unit').html() === 'C') {
            $('#temperatur').html(toF(temperatur));
            $('.unit').html('F');
        } else {
            $('#temperatur').html(toC(temperatur));
            $('.unit').html('C');
        }
    });
});
