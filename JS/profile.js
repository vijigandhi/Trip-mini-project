"use strict";


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDoc, getDocs, doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import{getStorage,ref as sref,uploadBytesResumable,getDownloadURL}from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAb3BzH5tfNzTuKUDEhVpz51RzPySS5Vfc",
    authDomain: "dckap-trip-26e10.firebaseapp.com",
    databaseURL: "https://dckap-trip-26e10-default-rtdb.firebaseio.com",
    projectId: "dckap-trip-26e10",
    storageBucket: "dckap-trip-26e10.appspot.com",
    messagingSenderId: "149435458483",
    appId: "1:149435458483:web:41d72b11078e86b888e1c6"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var Username = document.getElementById("name");
var UseEmail = document.getElementById("email");
var UserContact = document.getElementById("phone");

var user = JSON.parse(sessionStorage.getItem("login_details"))
console.log("TEST");
console.log(user);
// console.log(user.email_ID);


document.addEventListener("DOMContentLoaded", async function () {

    let getRef = doc(db, "user_data", `u_id${user.is_user}`);

    let getdata = await getDoc(getRef)
         console.log(getdata.data().email_ID);
 
                 document.getElementById("defaultName").textContent = getdata.data().username || "Default Name";
                 document.getElementById("defaultEmail").textContent = getdata.data().email_ID|| "+Add";
                 document.getElementById("defaultNo").textContent = getdata.data().pno|| "+Add";
         
                 document.getElementById("name").value = getdata.data().username || "";
                 document.getElementById("email").value = getdata.data().email_ID || "";
                 document.getElementById("phone").value = getdata.data(). pno || "";
                 document.getElementById("password").value = getdata.data().password || "";
                 document.querySelector(".ProfileImg").src =  getdata.data().u_dp||"Assets/gray-user-profile-icon-png-fP8Q1P copy.png";

})



// --------------------------------------------------------------------------------------------------



document.addEventListener("DOMContentLoaded", function() {
    const personalInfo = document.querySelector(".Personal-info");
    const profileDetails = document.querySelector(".profile-details");
    const addFavoriteinfo = document.querySelector(".addFavorite")
    const addFavoriteDetails = document.querySelector(".add-favorite");
    const Travelhistory = document.querySelector(".Travel-history");
    const travelHistoryDetails = document.querySelector(".travelHistory");

    personalInfo.classList.add("color");

    function showProfileDetails() {
        profileDetails.style.display = "block";
        addFavoriteDetails.style.display = "none";
        // travelHistoryDetails.style.display = "none";
        personalInfo.classList.add("color");
        // Travelhistory.classList.remove("color");
        addFavoriteinfo.classList.remove("color");
    }

    function showaddFavorite() {
        profileDetails.style.display = "none";
        addFavoriteDetails.style.display = "block";
        // travelHistoryDetails.style.display = "none";
        personalInfo.classList.remove("color");
        addFavoriteinfo.classList.add("color");
        // Travelhistory.classList.remove("color");
    }

    // function showAddTraval() {
    //     profileDetails.style.display = "none";
    //     addFavoriteDetails.style.display = "none";
    //     travelHistoryDetails.style.display = "block";
    //     personalInfo.classList.remove("color");
    //     addFavoriteinfo.classList.remove("color");
    //     Travelhistory.classList.add("color");

    // }

    personalInfo.addEventListener("click", function() {
        showProfileDetails();
    });

    addFavoriteinfo.addEventListener("click", function() {
        showaddFavorite();
    });

    // Travelhistory.addEventListener("click", function() {
    //     showAddTraval();
    // });

});



// ----------------------------------logout function------------------------------------------------

let logout = document.querySelector(".Log-out");
logout.addEventListener("click",()=>{

    if(sessionStorage.getItem('login_details'))

    { 
        sessionStorage.removeItem('login_details');
        location.href="index.html"

        
    }
    else{
        sign_in_btn.style.display = 'block'
    } 

});


// ----------------------------------profile pic---------------------------------------------------------
    let ProfileImg = document.querySelector(".ProfileImg");
    let inputfile= document.querySelector("#input-file");

inputfile.onchange = function(){

    ProfileImg.src = URL.createObjectURL(inputfile.files[0]) 
    let pimage =  document.querySelector("#input-file").files[0]

let meta_data = {contentype:pimage.type}
let task = sref(getStorage(),'images'+pimage.name)
let store = uploadBytesResumable(task,pimage,meta_data)
store.then(getDownloadURL(store.snapshot.ref).then((downloadURL)=>{
    let ref = doc(db,"user_data",`${user}`);

    updateDoc(
      ref,  {
       u_dp:downloadURL
      
    }
    ).then(()=>{
      alert("Updated Successfully")
    })
}))
};
// -----------------------------------------------------------------------------------


var form = document.getElementById("profileform");

document.addEventListener("DOMContentLoaded",function(){

const editButton = document.querySelector(".btn");
const savebtn = document.getElementById("savebtn")
const twoBtn = document.querySelector(".twoBtn")

    twoBtn.style.display = "none"
    function toggleInputFields(){
        const defaultDetails = document.querySelector(".defaultShow-detials");
        const inputDetails = document.querySelectorAll(".details");
    
        
        defaultDetails.style.display = "none"
        editButton.style.display = "none"
        inputDetails.forEach(detail => {
        detail.style.display = "flex";
     });
    };
    




editButton.addEventListener("click", function(event) {
    twoBtn.style.display = "block"
    toggleInputFields();
    event.preventDefault();

});

});


var savebtn = document.getElementById("savebtn")
savebtn.addEventListener("click",async function(event){
    event.preventDefault();
            const nameInput = document.getElementById("name").value;
            console.log(nameInput);
            const emailInput = document.getElementById("email").value;
            console.log(emailInput);
            const phoneInput = document.getElementById("phone").value;
            console.log(phoneInput);
            const usernameInput = document.getElementById("username").value;
            console.log(usernameInput);
            const passwordInput = document.getElementById("password").value.trim();
            console.log(passwordInput);
            const confirmPasswordInput = document.getElementById("confirm-password").value.trim();
            console.log(confirmPasswordInput);

           var defaultName = document.getElementById("defaultName")
           console.log(defaultName);
           var defaultNo = document.getElementById("defaultNo")
           console.log(defaultNo);


           console.log(  UseEmail.value, UserContact.value, Username.value)



            
            let ref = doc(db, "user_data", `u_id${user.is_user}`);

            updateDoc(
              ref,  {
                 username:nameInput,
                // email_ID:emailInput,
                password:passwordInput,
                pno:phoneInput
            }
            ).then(()=>{
            //   alert("Updated Successfully")
            const inputDetails = document.querySelectorAll(".details");
            const defaultDetails = document.querySelector(".defaultShow-detials");
            var twoBtn = document.querySelector(".twoBtn");
            var editButton = document.querySelector(".btn");

            
                location.href="profile.html"
            })
        
           
     
       
})

var form = document.getElementById("profileform");
var defaultDetails = document.querySelector(".defaultShow-detials");
var twoBtn = document.querySelector(".twoBtn");
var editButton = document.querySelector(".btn");
var cancel = document.getElementById("cancel");

cancel.addEventListener("click", function() {

const inputDetails = document.querySelectorAll(".details");

if (twoBtn.style.display != "none") {
    console.log("none");
    inputDetails.forEach(detail => {
        detail.style.display = "none";
     });
    defaultDetails.style.display = "block";
    twoBtn.style.display = "none";
    editButton.style.display = "block";
}


});

 // -----------------------------tooltip function-----------------------------------------------


var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirm-password");

passwordInput.addEventListener("keyup",function(){
    document.getElementById("message").style.display="block";
    passwordValidation();
})

confirmPasswordInput.addEventListener("click",function(){
    document.getElementById("message").style.display = "none";
})

  var letter= document.getElementById("letter");
  var capital= document.getElementById("capital");
  var num = document.getElementById("number");
  var special= document.getElementById("special")
  var leng=document.getElementById("length")

  
function passwordValidation(){


  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var Splcharater = /\W/g
  var numbers = /[0-9]/g;

    if(passwordInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
     } 
     else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    if(passwordInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
     } 
     else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    if(passwordInput.value.match(numbers)) {  
        num .classList.remove("invalid");
        num .classList.add("valid");
     } 
     else {
        num .classList.remove("valid");
        num .classList.add("invalid");
    }

    if(passwordInput.value.match(Splcharater)) {  
        special .classList.remove("invalid");
        special .classList.add("valid");
     } 
     else {
        special.classList.remove("valid");
        special.classList.add("invalid");
    }
    if (passwordInput.value.length >=8) {
        leng .classList.remove("invalid");
        leng .classList.add("valid");
    }
    else{
        leng.classList.remove("valid");
        leng.classList.add("invalid");
    }


if(   letter.classList.contains("valid") && capital.classList.contains("valid")
 &&  num .classList.contains("valid") &&   special .classList.contains("valid")
 && leng .classList.contains("valid") ){
    document.getElementById("message").style.display="none";
}

};
