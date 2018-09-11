var map, infoWindow;
var numLabel = localStorage.length + 1;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -20.7622569, lng: -41.5317164 },
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow();
  carregaMarkers();
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  google.maps.event.addListener(map, "click", function(event) {
    addMarker(event.latLng, map);
  });
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: numLabel.toString(),
    map: map
  });
  localStorage.setItem(
    numLabel,
    JSON.stringify({
      valor: numLabel,
      latitude: marker.position.lat(),
      longitude: marker.position.lng()
    })
  );
  console.log(marker.position.lat(), marker.position.lng());
  numLabel++;
}

function carregaMarkers() {
  let ponto;
  for (var i = 1; i <= localStorage.length; i++) {
        ponto = JSON.parse(localStorage.getItem(i));
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
      label: ponto.valor.toString(),
      map: map
    });
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
