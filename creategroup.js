const firebaseConfig = {
  apiKey: "AIzaSyCRKhILK71bGnVztKmfJc7YjQeJ_IBWoUA",
  authDomain: "event-planner-96e0c.firebaseapp.com",
  projectId: "event-planner-96e0c",
  storageBucket: "event-planner-96e0c.appspot.com",
  messagingSenderId: "987785968697",
  appId: "1:987785968697:web:435b4162f3f87b947761e8"
};

  
  
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(); 
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots : true});

  //create group form
  
  const submit = document.querySelector(".creategroup-button");
  const groupform = document.querySelector(".create-group-form");

  groupform.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.querySelector("#username");
  const eventtype = document.querySelector("#event-type");
  const eventcelebrator = document.querySelector("#event-celebrator");
  const password = document.querySelector("#password");
  const date = document.querySelector("#date");

  const id = Date.now()

  

  // Saving the data to the database

   db.collection('Group-Form').doc('_'+id).set( {

    username: username.value,
    eventtype: eventtype.value,
    eventcelebrator: eventcelebrator.value,
    groupId: '_'+id,
    password: password.value,
    date: date.value,
    
   
    
  }).then(() => {
  
       groupform.reset();
       window.location.assign('groupsinfo.html');
    }).catch(err => {
       console.log(err);
    });
  });



 
