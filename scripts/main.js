//prevent jQuery code from running before the document is done loading
$(document).ready(function(){

  //hide this on load, as it isn't yet populated
  $('#weather-container').hide();
  function weather() {

    var msg = document.getElementById("msg");
    var apiKey = 'PUT YOUR API KEY HERE';
    var url = 'http://api.openweathermap.org/data/2.5/weather?';

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {

      //success, so msg div no longer needed
      $('#msg').hide();


      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

       $.getJSON(url + "lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey, function(data) {

        //show this div now that it can be populated
        $('#weather-container').show();

        $('#location').html("Lat: " + latitude.toFixed(5) + "<br> Lon: " + longitude.toFixed(5));
        $('#icon').html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
  			$('#description').html(data.weather[0].description);
        $('#temp').html(data.main.temp + '&deg; F');
  			$('#humidity').html('Humidity:  ' + data.main.humidity + '%');
  			$('#wind').html('Wind:  ' + data.wind.speed + ' MPH');
      });
    }

    function error() {
      msg.innerHTML = "Unable to retrieve your location.";
    }

    msg.innerHTML = "Locating...";
  }

  weather();

});
