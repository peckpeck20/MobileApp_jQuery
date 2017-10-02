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
    //$("#locationTxt").text("Getting your location");
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
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        alert(lat ,long);
        /*
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    */
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
