const firebaseConfig = {
  apiKey: "AIzaSyAb3BzH5tfNzTuKUDEhVpz51RzPySS5Vfc",
  authDomain: "dckap-trip-26e10.firebaseapp.com",
  databaseURL: "https://dckap-trip-26e10-default-rtdb.firebaseio.com",
  projectId: "dckap-trip-26e10",
  storageBucket: "dckap-trip-26e10.appspot.com",
  messagingSenderId: "149435458483",
  appId: "1:149435458483:web:41d72b11078e86b888e1c6"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDocs, updateDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userCollection = collection(db, "user_data");

async function checkEmailExists(email) {
  const q = query(userCollection, where("email_ID", "==", email));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}
let navi=document.querySelector(".form-inner")
let newPasswordForm = document.forms.pass_new;
let otpForm = document.forms.otp_form;

let emailToUpdate=document.getElementById("forget_email").value ;
let email = document.getElementById("forget_email").value;
let forget_email_form = document.forms.forgot;
let email_block = document.querySelector(".forget_right_side");
let otp_block = document.querySelector(".forgot_OTP");
// -------------------error-----------
let gmail = document.getElementById("forget_email");
let OTP = document.getElementById("otp");
let New = document.getElementById("conformPword");
let con = document.getElementById("confirm");
let for_email_error = document.getElementById("for_email-error");
let for_code_error = document.getElementById("for_code-error");
let for_pass_error = document.getElementById("for_new-error");
let for_con_error = document.getElementById("for_con-error");
forget_email_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailToUpdate = document.getElementById("forget_email").value.trim();

  if (emailToUpdate === "") {
    for_email_error.style.display="block"
    gmail.style.borderBottom="2px solid red"
    // alert("Email cannot be empty. Please enter a valid email.");
    
  } else {
      for_email_error.style.display="none"
   gmail.style.borderBottom="2px solid #858585"
    try {
      const emailExists = await checkEmailExists(emailToUpdate);

      if (emailExists) {
        let mail_msg = `Hi there, reset your password 
                        OTP:<br> ${otp_random} <br>`;

        Email.send({
          SecureToken: "92b969b6-deef-4c44-8b9e-f31609066e86",
          To: emailToUpdate,
          From: "tripdckap@gmail.com",
          Subject: "Enter the OTP",
          Body: mail_msg,
        }).then(
         
        ).catch((error) => alert(error));

        email_block.style.display = "none";
        otp_block.style.display = "block";
      } else {
        alert("Email ID does not exist. Please sign up.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("An error occurred. Please try again.");
    }
  }
});

var otp_random = Math.floor(Math.random() * 100000);
console.log(otp_random);
let new_pass_block = document.querySelector(".new_password");

otpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let otp_value = document.getElementById("otp").value;
  if (otp_value === "") {
    for_code_error.style.display="block"
    OTP.style.borderBottom="2px solid red"
    // alert("INVALID code");
  } else {
     for_code_error.style.display="none"
    OTP.style.borderBottom="2px solid #858585"
    if (otp_value === otp_random.toString()) {
      otp_block.style.display = "none";
      new_pass_block.style.display = "block";
    } else {
      alert("Invalid OTP. Please try again.");
    }
  }
});

newPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let newPassValue = document.getElementById("conformPword").value.trim();
  let confirm = document.getElementById("confirm").value;


  for_pass_error.style.display = "none";
  New.style.borderBottom = "2px solid #858585";
  for_con_error.style.display = "none";
  con.style.borderBottom = "2px solid #858585";

  if (newPassValue === "") {
    for_pass_error.style.display = "block";
    New.style.borderBottom = "2px solid red";
  } else if (confirm === "" || confirm !== newPassValue) {
    for_con_error.style.display = "block";
    con.style.borderBottom = "2px solid red";
  } else {
    try {
      const user = query(userCollection, where("email_ID", "==", emailToUpdate));
      const userSnapshot = await getDocs(user);

      if (!userSnapshot.empty) {
        const docRef = userSnapshot.docs[0].ref;

        await updateDoc(docRef, { password: newPassValue });

        location.href = "login.html";
      } else {
        alert("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred. Please try again.");
    }
  }
});
let back=document.querySelector(".back_login")
console.log(back)

back.addEventListener("click",()=>{
  location.href="login.html"
})

let x_button = document.querySelector("#xmark")
console.log(x_button)
x_button.addEventListener("click", () => {
    location.href = "login.html"
})


// password icon change
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("conformPword");
    const icon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
});
// confirm password icon change
document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
    const confirmInput = document.getElementById("confirm");
    const icon = document.getElementById("toggleConfirmPassword");

    if (confirmInput.type === "password") {
        confirmInput.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        confirmInput.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
});