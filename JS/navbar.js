
//-------------------------- login signup process --------------------------

document.addEventListener("DOMContentLoaded", function() {
    let signintag = document.getElementById("nav-btn");
    let profiletag = document.getElementById("nav-profile");
    let admintag = document.querySelector('.menu li:nth-child(5)');
  
    let loginDetailsExists = sessionStorage.getItem("login_details");
    let userSignupDataExists = sessionStorage.getItem("user_signup_Data");
  
    if (loginDetailsExists ) {
      
      let loginDetails = JSON.parse(loginDetailsExists);
      if (loginDetails && loginDetails.is_admin === 1) {
        signintag.style.display = "none";
        profiletag.style.display = "block";
        admintag.style.display = "block";
      } else {
        signintag.style.display = "none";
        profiletag.style.display = "block";
        admintag.style.display = "none";
      }
    } else {
    
      signintag.style.display = "block";
      profiletag.style.display = "none";
      admintag.style.display = "none";
    }
});
let userData =JSON.parse(sessionStorage.getItem('login_details'))
console.log(userData)