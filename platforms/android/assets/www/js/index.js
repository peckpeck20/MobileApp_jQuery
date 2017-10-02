var app = {
// Application Constructor
initialize: function() {
    this.bindEvents();
},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);

},
// device ready function
// 
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
    //app.receivedEvent('deviceready');
    //alert('welcome!');


},
// Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
}
};


//open camera and take photo
function openCamera(){
    //get picture 
     navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
     //send the image URI to the DOM
     function onSuccess(imageURI) {
        console.log(imageURI);
        $("#camimage").attr("src","data:image/jpeg;base64," + imageURI);
        //$("#camimage").responsiveImg();
    }

    function onFail(message) {
        app.showAlert('Error taking picture', 'Error');
    }  
};

//get location 
function getLocation(){

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;

        
        //call the getWeather function using the coordinates
        getWeather(Latitude,Longitude);
        
        // Get weather by using coordinates

    function getWeather(latitude, longitude) {

    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
    var OpenWeatherAppKey = "6fd856e15815d47237dbd211075efced";

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
      + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $.getJSON(queryString, function (results) {

        if (results.weather.length) {

            $.getJSON(queryString, function (results) {

                if (results.weather.length) {
                    //for testing purposes
                    console.log(queryString);
                    //print results to DOM
                    $("#locationPromt").empty();
                    $('#descriptionLat').text("Latitude : " + Latitude);
                    $('#descriptionLong').text("Longitude : " + Longitude);
                    
                    $('#descriptionLoc').text("Location : " + results.name);
                    $('#tempLoc').text("Temperature : " + results.main.temp);
                    $('#imgLoc').attr("src","http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");
                    $('#windLoc').text("Wind speed : " + results.wind.speed);
                    $('#humidityLoc').text("Humidity : " +results.main.humidity);
                    $('#visibilityLoc').text("Visilibity : " +results.weather[0].main);

                    var sunriseDate = new Date(results.sys.sunrise);
                    $('#sunriseLoc').text("Sunrise : " + sunriseDate.toLocaleTimeString());

                    var sunsetDate = new Date(results.sys.sunrise);
                    $('#sunsetLoc').text("Sunset : " +sunsetDate.toLocaleTimeString());
                }

            });
        }
    }).fail(function () {
        console.log("error getting location");
    });
    }
        
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    //get location
    navigator.geolocation.getCurrentPosition(onSuccess, onError);


};
