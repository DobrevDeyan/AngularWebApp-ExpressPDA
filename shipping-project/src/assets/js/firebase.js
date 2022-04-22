// // var firebaseConfig = {
// // apiKey: "AIzaSyBpVYH05GktTW5LiKkvlMU_aebaSE1S_JE",
// // authDomain: "shippingproject-b6ee3.firebaseapp.com",
// // projectId: "shippingproject-b6ee3",
// // storageBucket: "shippingproject-b6ee3.appspot.com",
// // messagingSenderId: "182574825890",
// // appId: "1:182574825890:web:941d18481b92586f7a72fb",
// // measurementId: "G-HKW9V1N79Q",
// // };

// // const functions = require("firebase-functions");
// // const admin = require("firebase-admin");
// // admin.initializeApp(firebaseConfig);
// // const db = admin.firestore();

// // // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);

// // function sendData() {
// //   const proformaDB = firebase.firestore().collection("users");

// //   proformaDB.get().then((snapshot) => {
// //     const data = snapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));
// //     console.log("All data in 'users' collection", data);
// //   });
// //   console.log("dsds");
// // }
// // sendData();

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "AIzaSyBpVYH05GktTW5LiKkvlMU_aebaSE1S_JE",
//   authDomain: "shippingproject-b6ee3.firebaseapp.com",
//   projectId: "shippingproject-b6ee3",
//   storageBucket: "shippingproject-b6ee3.appspot.com",
//   messagingSenderId: "182574825890",
//   appId: "1:182574825890:web:941d18481b92586f7a72fb",
//   measurementId: "G-HKW9V1N79Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// function sendData() {
//   try {
//     const docRef = await addDoc(collection(db, "proformas"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }s
// }
// sendData();
