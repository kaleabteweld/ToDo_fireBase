  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAiDXTCgKAZeQpMQbCLf4CJMcR38MY4zgA",
    authDomain: "todo-ade05.firebaseapp.com",
    databaseURL: "https://todo-ade05.firebaseio.com",
    projectId: "todo-ade05",
    storageBucket: "todo-ade05.appspot.com",
    messagingSenderId: "806706913781",
    appId: "1:806706913781:web:3983edae6a1adc884540bc",
    measurementId: "G-L7BH727Q14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const fireDB = firebase.firestore();
  const user_id = "clVm04G0SVl8swX3jXaP";

  console.log("start");
  fireDB.collection("ToDo").where("uesr","==",user_id).orderBy("time").get()
      .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.id);
          });
      })
      .catch(function (error) {
        console.log("error: "+error);
      })