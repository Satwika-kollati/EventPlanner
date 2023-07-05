
const firebaseConfig = {
    apiKey: "AIzaSyCRKhILK71bGnVztKmfJc7YjQeJ_IBWoUA",
    authDomain: "event-planner-96e0c.firebaseapp.com",
    projectId: "event-planner-96e0c",
    storageBucket: "event-planner-96e0c.appspot.com",
    messagingSenderId: "987785968697",
    appId: "1:987785968697:web:435b4162f3f87b947761e8"
  };
  

    //Initialise Firebase

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();   
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots : true});
    const user = firebase.auth().currentUser;
    db.settings({ timestampsInSnapshots : true});
   



    const submit = document.querySelector(".joingroup-button");
    const joingroupform = document.querySelector(".joingroup-form");


    
    joingroupform.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const username = document.querySelector("#username");
    const enteredgroupId = document.querySelector("#group-Id");
    const enteredpassword = document.querySelector("#password");
    const user = firebase.auth().currentUser;
    const grpId = {
        grppId : enteredgroupId.value,
    }


      db.collection("Group-Form").where("groupId", "==", enteredgroupId.value).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().password == enteredpassword.value){


                //saving username
                db.collection('Group-Form').doc(enteredgroupId.value).collection('users').doc().set( {
                         username: username.value,
                         userId : user.uid,
                    }) 

            
                // saving groupid in localstorage
                window.localStorage.setItem('GROUPID',JSON.stringify(grpId));
                window.localStorage.getItem('GROUPID');
                console.log(window.localStorage.getItem('GROUPID'));


                joingroupform.reset();
                window.location.assign('grouppage2.html');

                }
                
                else{
                //alert message
                alert("The entered password is Incorrect.Please try Again.")
                }
                })
            }).catch((error) => {
                alert("The groupId you have entered doesn't exist.Please try again.")
                console.log(error);
            });
    
})
   



    

     
    
