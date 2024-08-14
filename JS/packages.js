
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc ,setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAb3BzH5tfNzTuKUDEhVpz51RzPySS5Vfc",
    authDomain: "dckap-trip-26e10.firebaseapp.com",
    databaseURL: "https://dckap-trip-26e10-default-rtdb.firebaseio.com",
    projectId: "dckap-trip-26e10",
    storageBucket: "dckap-trip-26e10.appspot.com",
    messagingSenderId: "149435458483",
    appId: "1:149435458483:web:41d72b11078e86b888e1c6"
  };

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);


async function getLastDocumentId() {
    const querySnapshot = await getDocs(collection(db, "packages"));
    const documents = querySnapshot.docs;
    if (documents.length === 0) return 0; 
    return parseInt(documents[documents.length - 1].id);
}


let id;


getLastDocumentId().then(lastId => {
    id = lastId + 1;
});

// function to add packges to fire store | admin 
document.getElementById('packageForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    try {
       
        let destination = document.getElementById('destination').value.trim();
        let name = document.getElementById('name').value.trim();
        let days = parseInt(document.getElementById('days').value.trim());
        let image = document.getElementById('image').value.trim();
        

      
        let places = [];

      
        let placeNameInputs = document.querySelectorAll('.placeName');
        let placeDescriptionInputs = document.querySelectorAll('.placeDescription');

      
        for (let i = 0; i < placeNameInputs.length; i++) {
            
            let placeName = placeNameInputs[i].value.trim();
            let placeDescription = placeDescriptionInputs[i].value.trim();
            places.push({ name: placeName, description: placeDescription });
        }

        let ref = doc(db, "packages", `${id++}`);

       
        await setDoc(ref, {
            destination: destination,
            name: name,
            days: days,
            image: image,
            places: places,
            
        });

        console.log("Package added to Firestore");
    } catch (error) {
        console.error('Error adding package:', error);
    }

    this.reset();
    
});
