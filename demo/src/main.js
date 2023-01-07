import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyB1_YphCnFKsZHbfXAkN75m-hFBY8BYhuY",
//   authDomain: "fir-5d5e2.firebaseapp.com",
//   projectId: "fir-5d5e2",
//   storageBucket: "fir-5d5e2.appspot.com",
//   messagingSenderId: "61926351000",
//   appId: "1:61926351000:web:c629bd36786a7b712cf0ed",
//   measurementId: "G-N4XLENVSCH",
// };
// const app = initializeApp(firebaseConfig);
// const dbs = getFirestore(app);
// const addUserBtnUI = document.getElementById("save");
// addUserBtnUI.addEventListener("click", addUserBtnClicked());

// function addUserBtnClicked() {
//   const usersRef = dbs.child("db");
//   const addUserInputsUI = document.getElementsByClassName("user-input");
//   let newUser = {};
//   for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
//     let key = addUserInputsUI[i].getAttribute("data-key");
//     let value = addUserInputsUI[i].value;
//     newUser[key] = value;
//   }
//   usersRef.push(newUser, function () {
//     console.log("data has been inserted");
//   });
// }

/* eslint-disable */
createApp(App).use(router).mount("#app");