

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDoc, getDocs, doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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

document.addEventListener("DOMContentLoaded", async function() {
    // Function to generate package card dynamically  HTML tailwind cards 
    // created by adding their css in line 
    function createPackageCard(packageData) {
        let { destination, name, days, image, places } = packageData;
        console.log(packageData)
        let packageCard = document.createElement('div');
        packageCard.classList.add('w-72', 'package-card', 'h-72', 'bg-white', 'shadow-md', 'rounded-xl', 'duration-500', 'hover:scale-105', 'hover:shadow-xl');

        let img = document.createElement('img');
        img.setAttribute('src', image);
        img.setAttribute('alt', name);
        img.classList.add('h-50', 'w-74', 'object-cover', 'rounded-t-xl');

        let detailsContainer = document.createElement('div');
        detailsContainer.classList.add('px-4', 'py-3', 'w-72');

        let destinationSpan = document.createElement('span');
        destinationSpan.classList.add('destination-name', 'text-gray-400', 'mr-3', 'uppercase', 'text-xs');
        destinationSpan.textContent = destination;

        let packageNameP = document.createElement('p');
        packageNameP.classList.add('package-name', 'text-lg', 'font-bold', 'text-black', 'truncate', 'block', 'capitalize');
        packageNameP.textContent = name;

        let durationP = document.createElement('p');
        durationP.classList.add('no-days', 'text-lg', 'font-semibold', 'text-black', 'cursor-auto', 'my-3');
        durationP.textContent = days + ' Days';

        detailsContainer.appendChild(destinationSpan);
        detailsContainer.appendChild(packageNameP);
        detailsContainer.appendChild(durationP);

        packageCard.appendChild(img);
        packageCard.appendChild(detailsContainer);

       // to store the data of the card that's clicked in sessionStorage
        packageCard.addEventListener('click', function() {
         
            sessionStorage.setItem('selectedPackage', JSON.stringify(packageData));

           
            window.location.href = 'destiresults.html';
        });

        return packageCard;
    }

  
    let container = document.getElementById('Projects');

    // Fetch package data from Firestore
    async function getfromefirestore() {
        try {
            let querySnapshot = await getDocs(collection(db, "packages"));
            let packageData = querySnapshot.docs.map(doc => doc.data());
            return packageData;
        } catch (error) {
            console.error('Error fetching package data:', error);
            return [];
        }
    }

    // Fetch package data and create cards
    let packageData = await getfromefirestore();
    packageData.forEach(data => {
        let packageCard = createPackageCard(data);
        container.appendChild(packageCard);
    });
});


// ----------------------- Searchbar click and blur event----------------
  document.addEventListener('DOMContentLoaded', (event) => {


    let input = document.getElementById('dest-search');

    input.addEventListener('keydown', function(event) {
     

      if (event.key === "Enter" || event.keyCode === 13) {
        
        console.log('Enter key was pressed.');

        var search = document.getElementById('dest-search').value;
        search = search.toLowerCase();
        let dest_name = document.getElementsByClassName('destination-name')
        let package_crd = document.getElementsByClassName('package-card')
        for(var i=0; i<dest_name.length;i++){
            if(!dest_name[i].innerHTML.toLowerCase().includes(search)){
                package_crd[i].style.display ='none';
            }
            else{
                package_crd[i].style.display ='block'
            }
        }
      }
      input.addEventListener('blur', function(event) {
        var search = document.getElementById('dest-search').value;
        search = search.toLowerCase();
        let dest_name = document.getElementsByClassName('destination-name')
        let package_crd = document.getElementsByClassName('package-card')
        for(var i=0; i<dest_name.length;i++){
            if(!dest_name[i].innerHTML.toLowerCase().includes(search)){
                package_crd[i].style.display ='none';
            }
            else{
                package_crd[i].style.display ='block'
            }
        }
      });
    });
  });

//-------------------------------gunasri review div-----------------------


var review_share_btn = document.querySelector(".review_share_btn");
    // review_share_btn.classList.add("review_share_btn2");
var review_container2=document.querySelector(".review_container2");
var review_maincontainer2=document.querySelector(".review_maincontainer2");
var review_star_icons =document.querySelector(".review_star_icon");
var review_textarea =document.querySelector("#review_textarea");
var review_submit_btn=document.querySelector(".review_submit_btn");
var review_cancel_btn=document.querySelector("#review_cancel_btn");
var searchInput = document.getElementById("search");

let input = document.getElementById('dest-search');

var stars = document.querySelectorAll(".stars i");

let review_heading = document.querySelector(".re-heading");


let search_btn = document.querySelector(".icon");
let dest_search = document.getElementById('dest-search');

search_btn.addEventListener("click", async () => {
review_share_btn.style.display="block";
review_heading.style.display = "block";
    var search = dest_search.value;

    search = search.toLowerCase();
    if (search === "kodaikanal") {
        await firebaseReview("kodaikanal");
    } else if (search === "ooty") {
        await firebaseReview("ooty");
    } else if (search === "munnar") {
        await firebaseReview("munnar");
    } else if (search === "trichy") {
        await firebaseReview("trichy");
    } else if (search === "chennai") {
        await firebaseReview("chennai");
    }
    else if (search === "madurai") {
        await firebaseReview("madurai");
    }
});

dest_search.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        var search = dest_search.value;
      

        search = search.toLowerCase();
        if (search === "kodaikanal") {
            await firebaseReview("kodaikanal");
            review_share_btn.style.display="block";
            review_heading.style.display = "block";
        } else if (search === "ooty") {
            await firebaseReview("ooty");
            review_share_btn.style.display="block";
            review_heading.style.display = "block";
        } else if (search === "munnar") {
            await firebaseReview("munnar");
            review_share_btn.style.display="block";
            review_heading.style.display = "block";
        }
         else if (search === "chennai") {
            await firebaseReview("chennai");
            review_share_btn.style.display="block";
            review_heading.style.display = "block";

        }
    }
});

async function firebaseReview(place) {
    var tracklistTable = document.getElementById("main_id");
    tracklistTable.innerHTML = "";

    let displayRef = doc(db, "review_Collection", place);
    let dataRef = await getDoc(displayRef);
    let dataObj = dataRef.data();
    if (dataObj) {
        let dataArr = dataObj["reviewObj"];
        for (let key in dataArr) {
            tracklistTable.innerHTML += "<section class='container'>" +
                "<div class='card'>" +
                "<div class='content'>" +
                "<div class='testimonial-avatar'><img class='img1' src='" + dataObj["reviewObj"][key].image + "' alt=''>" +
                "<div class='content2'>" +
                "<div class='h6'>" + dataObj["reviewObj"][key].user_name+ "</div>" +
                "<div class='testimonial-rating'>" + getRatingStar(dataObj["reviewObj"][key].rating) +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='hover_content'>" +
                "<p>" + dataObj["reviewObj"][key].description + "</p>" +
                "</div>" +
                "</div>" +
                "</div> " +
                "</section>";
        }
    } else {
        console.log("No data found for " + place);
    }
}

async function firebaseWriteReview(place) {
    var tracklistTable = document.getElementById("main_id");
    tracklistTable.innerHTML = "";

    let displayRef = doc(db, "review_Collection", place);
    let dataRef = await getDoc(displayRef);
    let dataObj = dataRef.data();

}


review_share_btn.addEventListener("click",(e)=>{
    review_container2.style.display="block";
    // review_maincontainer2.style.height="38.5em"
    review_maincontainer2.style.width="99%"
    review_maincontainer2.style.position="absolute"
    review_maincontainer2.style.display= "block";
    review_maincontainer2.style.backgroundColor="rgba(0, 0, 0, 0.5)";;
    document.body.style.opacity= "1";
})



//review_submit_btn
review_submit_btn.addEventListener("click", async () => {
    var user = JSON.parse(sessionStorage.getItem("login_details"));
    var username = user ? user.username : null;
    
    if(!username){
       
        showPopup();
    
    }
    else{
        var search = document.getElementById('dest-search').value;
    
        let place = search;
        console.log(search);
        submitReview(place);
        console.log(place);
        
    }
   
});
// -------------------------------popup---------------------------------



// Function to show the popup
function showPopup() {
    var popup = document.getElementById("signupPopup");
    popup.style.display = "block";
}

// Function to close the popup


    var popupclose = document.querySelector(".close-btn");
    popupclose.addEventListener("click",()=>{
        var popup = document.getElementById("signupPopup");
        popup.style.display = "none";
        cancel_fun()
    })
   




var star_error_msg = document.querySelector(".star_error_msg");
var textarea_error_msg = document.querySelector(".textarea_error_msg");
  //submitReview function
  
  async function submitReview(place) {

    var tracklistTable = document.getElementById("main_id");
        var comments = document.getElementById("review_textarea").value;
        var element = document.getElementById("star_id");
        var starCount = element.getElementsByClassName('fa-solid fa-star active').length;
       

    if (comments.trim() === "" && starCount === 0) {
  
        star_error_msg.innerText="This field is required *"
        star_error_msg.classList.add("error_star");
        textarea_error_msg.innerText="This field is required *"
        textarea_error_msg.classList.add("error_star")
    }
    else if(comments.trim() === ""){ 
        textarea_error_msg.innerText="This field is required *"
        textarea_error_msg.classList.add("error_star")
      
    }
    else if(starCount === 0){
        star_error_msg.innerText="This field is required *"
        star_error_msg.classList.add("error_star");
    }
    else{
        tracklistTable.innerHTML = "";
        
     // Firebase data handling
    let oldRef = doc(db, "review_Collection", place);
    let oldDataRef = await getDoc(oldRef);
    let oldData = oldDataRef.data();
    
    let oldArr = (oldData && Array.isArray(oldData.reviewObj)) ? oldData.reviewObj : [];
    
 

    var user = JSON.parse(sessionStorage.getItem("login_details"));

    console.log("Test user");
    console.log(user);
    // Extracting username from session
    var username = user.username;
    
    var user_id = 0;
    user_id++; 
    
    // Creating newReviewObj
    let newReviewObj = {
        user_id: user_id,
        user_name: username,
        image: "./Assets/gray-user-profile-icon-png-fP8Q1P.png",
        rating: starCount,
        description: comments
    };

console.log(newReviewObj);


    // Merge existing reviews with the new review
    let updatedReviews = [...oldArr, newReviewObj];
  
    let objRef = doc(db, "review_Collection", place);
    let objRefData = updateDoc(objRef, { 
        reviewObj: updatedReviews 
    })
  
    console.log(objRef);
  
    firebaseReview(place);
  
    // Function to call the container close 
    cancel_fun();
  }
  
}


  let star_rating_value = document.getElementById("star_rating_value")

  function getRatingStar(num){

    if(num == 1){
        
      return "<i class='fa-solid fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"
    }else if(num == 2){
      return "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"
    }else if(num == 3){
      return "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='far fa-star'></i>"+
      "<i class='far fa-star'></i>"
    }else if(num == 4){
      return "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='far fa-star'></i>"
    }
    else if(num == 5){
      return "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"+
      "<i class='fa-solid fa-star'></i>"
    }
  
    return "<i class='far fa-star'></i>"+
    "<i class='far fa-star'></i>"+
    "<i class='far fa-star'></i>"+
    "<i class='far fa-star'></i>"+
    "<i class='far fa-star'></i>";
  }
  
  review_cancel_btn.addEventListener("click",cancel_fun);
  function cancel_fun(){
  
    review_container2.style.display="none";
    review_maincontainer2.style.display= "none";
    review_maincontainer2.style.opacity= "0";
    review_textarea.value="";
    review_textarea.placeholder= "Write a review here...";
    star_rating_value.innerText="";
    star_error_msg.innerText="";
    textarea_error_msg.innerText="";
    stars.forEach((star) => {
      star.classList.remove("active");
  });
  
  }

  var star_count=document.querySelector(".star_count")
  var After_review_content=document.querySelector(".After_review_content");
  
  let review=['Bad','Not bad','Good','Very good','Excellent']
  
  stars.forEach((star,index) => {
    star.addEventListener("click",()=>{
        star_rating_value.innerText = review[index]
       
    })
});
  
  
  var stars = document.querySelectorAll(".stars i");
  
  stars.forEach((star, index1) => {
   
    star.addEventListener("click", () => {
    
      stars.forEach((star, index2) => {
     
        index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
  
        
      });
  });
  });
  


