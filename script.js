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
const user = firebase.auth().currentUser;


function signUp() {

  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var username = document.getElementById("username");
  
  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.then(u => {

    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: username.value

    }).then(() => {

      alert("Signed Up with " + email.value);

      window.location.assign('homepage.html');

    }).catch((e) => {
      alert(e.message);
    })
  })

  promise.catch(e => alert(e.message));
}


  function signIn(){

     var email = document.getElementById("email");
     var password = document.getElementById("password");
     const user = firebase.auth().currentUser;
     

     const promise = auth.signInWithEmailAndPassword(email.value, password.value).then(function() {
     
       console.log(user);
       
       window.location.assign('homepage.html');
     
     });
      promise.then(u =>{
      alert("Signed In");})
      promise.catch(e => alert(e.message));
  }

  function signOut(){
    auth.signOut().then(function() {

      alert("Signed Out");
      window.location.assign('loginpage.html');
  
    });
  } 
 
