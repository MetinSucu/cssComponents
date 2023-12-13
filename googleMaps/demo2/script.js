var mapStyle = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
}, {
    "elementType": "labels.text.fill",
    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
}, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
}];
var directionsRenderer,map;
function initMap() {
     map = createMap();
     directionsRenderer = createDirectionsRenderer(map);

    var request = {
        origin: 'Esenler Mah. Horasan Sok. No:4/21 A  Görgülü Center A Blok  Selçuklu Konya',
        destination: '37.87148135969925,32.491022122446104',
        travelMode: 'DRIVING'
    };

    renderDirections(request, directionsRenderer, map);
}

function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65},
        styles: mapStyle
    });
}

function createDirectionsRenderer(map) {
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    return directionsRenderer;
}

function renderDirections(request, directionsRenderer, map) {
    var directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function (result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            customizePolyline(result, map);
        } else {
            console.error('Yol tarifi alınamadı: ' + status);
        }
    });
}

function customizePolyline(result, map) {
    var route = result.routes[0];
    var bounds = route.bounds;
    map.fitBounds(bounds);
    var path = new google.maps.MVCArray();
    var strokeColor = '#4285f4';
    var strokeOpacity = 0.8;
    var strokeWeight = 10;

    for (var i = 0; i < route.overview_path.length; i++) {
        path.push(route.overview_path[i]);
    }

    var polyline = new google.maps.Polyline({
        path: path,
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: strokeWeight,
        map: map
    });

    addPolylineEvents(polyline, strokeColor);
    directionsRenderer.setDirections({ routes: [] });
}

function addPolylineEvents(polyline, originalColor) {
    google.maps.event.addListener(polyline, 'mouseover', function () {
        polyline.setOptions({
            strokeColor: 'red',
            zIndex: 1
        });
    });

    google.maps.event.addListener(polyline, 'mouseout', function () {
        polyline.setOptions({
            strokeColor: originalColor,
            zIndex: 0
        });
    });

}
