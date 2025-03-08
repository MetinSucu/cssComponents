let map;
let directionsService;
let directionsRenderer;
let markers = [];

function initMap() {
    // Haritayı başlat
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.9334, lng: 32.8597 }, // Örneğin Ankara
        zoom: 6,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        draggable: true, // Sürükle bırak özelliği
    });

    // Rota değiştiğinde yapılacak işlemler
    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        if (directions) {
            computeTotalDistance(directions);
        }
    });

    // Haritaya tıklama olayını dinleyin
    map.addListener("click", (event) => {
        addMarker(event.latLng);
    });
}

function calculateRoute() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Lütfen başlangıç ve bitiş noktalarını girin.");
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: getWaypoints(), // Ara noktalar
        optimizeWaypoints: true,
    };

    directionsService.route(request, (result, status) => {
        if (status === "OK") {
            directionsRenderer.setDirections(result);
            computeTotalDistance(result);
        } else {
            alert("Rota bulunamadı: " + status);
        }
    });
}

function getWaypoints() {
    const waypointsInput = document.getElementsByClassName("waypoint");
    const waypoints = [];
    for (let input of waypointsInput) {
        if (input.value) {
            waypoints.push({
                location: input.value,
                stopover: true,
            });
        }
    }
    return waypoints;
}

function addWaypointField() {
    const waypointsContainer = document.getElementById("waypoints");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "waypoint";
    input.placeholder = "Ara Nokta";
    input.style.marginTop = "5px";
    waypointsContainer.appendChild(input);
}

// Marker ekleme fonksiyonu
function addMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true, // Marker'ı sürüklenebilir yapıyoruz
    });

    // Marker'a tıklanınca açıklama eklemek için
    const contentString = `
        <div>
          <h4>Marker Ekle</h4>
          <select id="markerType">
            <option value="Bekleme Noktası">Bekleme Noktası</option>
            <option value="Mola Yeri">Mola Yeri</option>
            <option value="Benzin İstasyonu">Benzin İstasyonu</option>
          </select>
          <button onclick="setMarkerInfo(${marker.position.lat()}, ${marker.position.lng()}, '${marker}')">Kaydet</button>
        </div>
      `;

    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    markers.push(marker);
}

// Marker'a bilgi ekleme fonksiyonu
function setMarkerInfo(lat, lng, marker) {
    const markerType = document.getElementById("markerType").value;
    const infoWindow = new google.maps.InfoWindow({
        content: `Tip: ${markerType}`,
    });

    // Yeni açıklamayı marker'a ekle
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    infoWindow.open(map, marker);
}

// Rota toplam mesafesini hesapla
function computeTotalDistance(result) {
    let total = 0;
    const route = result.routes[0];

    for (let i = 0; i < route.legs.length; i++) {
        total += route.legs[i].distance.value;
    }
    total = total / 1000; // Metreden kilometreye çevir
    document.getElementById("total").innerHTML = "Toplam Mesafe: " + total + " km";
}