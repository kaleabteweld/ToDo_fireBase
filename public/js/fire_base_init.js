  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBHx3goRddf-VkYMvFQQn0-U742-OICt5A",
    authDomain: "todo-ed8fd.firebaseapp.com",
    databaseURL: "https://todo-ed8fd.firebaseio.com",
    projectId: "todo-ed8fd",
    storageBucket: "todo-ed8fd.appspot.com",
    messagingSenderId: "170054999174",
    appId: "1:170054999174:web:94655aff7cfa6ddefb8507",
    measurementId: "G-X7V7R98QZ9"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const fireDB = firebase.firestore();
