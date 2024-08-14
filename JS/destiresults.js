
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc ,setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
let firebaseConfig = {
    apiKey: "AIzaSyAb3BzH5tfNzTuKUDEhVpz51RzPySS5Vfc",
    authDomain: "dckap-trip-26e10.firebaseapp.com",
    databaseURL: "https://dckap-trip-26e10-default-rtdb.firebaseio.com",
    projectId: "dckap-trip-26e10",
    storageBucket: "dckap-trip-26e10.appspot.com",
    messagingSenderId: "149435458483",
    appId: "1:149435458483:web:41d72b11078e86b888e1c6"
  };


 // get the seleccted package from sessionStorage and update text contents

document.addEventListener("DOMContentLoaded", function() {

    let packageData = JSON.parse(sessionStorage.getItem('selectedPackage'));
    console.log(packageData);
   
    let destinationNameElement = document.querySelector('.destinationName');
    let packageNameElement = document.querySelector('.packagename');

   
    if (destinationNameElement && packageNameElement && packageData) {
        destinationNameElement.textContent = packageData.destination;
        packageNameElement.textContent = `"${packageData.name}"`;
    }
});

// func to create each day place cards
document.addEventListener("DOMContentLoaded", function() {
  
    let packageData = JSON.parse(sessionStorage.getItem('selectedPackage'));

   
    let tripDetailsContainer = document.getElementById('trip-details');

  
    function createPlaceCard(place, dayNumber) {
        let placeCard = document.createElement('section');
        placeCard.classList.add('container');

        let card = document.createElement('div');
        card.classList.add('card');

        let content = document.createElement('div');
        content.classList.add('content');

        let dayCount = document.createElement('p');
        dayCount.classList.add('day-count', 'logo');
        dayCount.textContent = 'Day ' + dayNumber;

        let placeName = document.createElement('div');
        placeName.classList.add('place-name', 'h6');
        placeName.textContent = place.name;

        let hoverContent = document.createElement('div');
        hoverContent.classList.add('hover_content');

        let placeDescription = document.createElement('p');
        placeDescription.classList.add('place-description');
        placeDescription.textContent = place.description;

        hoverContent.appendChild(placeDescription);

        content.appendChild(dayCount);
        content.appendChild(placeName);
        content.appendChild(hoverContent);

        card.appendChild(content);

        placeCard.appendChild(card);

        return placeCard;
    }

    //loop for multiple cards
    if (packageData && packageData.places) {
        packageData.places.forEach((place, index) => {
            let placeCard = createPlaceCard(place, index + 1);
            tripDetailsContainer.appendChild(placeCard);
        });
    }
});



// ------------------------------------------------------
// map integration - map API script in destiresults -html
document.addEventListener('DOMContentLoaded', function() {
    initMap(); 
});

function initMap() {
    console.log('test')
    var selectedPackage = JSON.parse(sessionStorage.getItem('selectedPackage'));
    if (!selectedPackage || !selectedPackage.places || selectedPackage.places.length < 2) {
        console.error('Invalid or insufficient data in selected package');
        return;
    }
        
    var places = selectedPackage.places;
    var origin = places[0].name + ', Tamil Nadu, India';
    var destination = places[places.length - 1].name + ', Tamil Nadu, India';
    var waypoints = places.slice(1, -1).map(place => ({ location: place.name + ', Tamil Nadu, India', stopover: true }));

    var map = new google.maps.Map(document.getElementById('pic'), {
        
    });
    
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    var request = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
}

