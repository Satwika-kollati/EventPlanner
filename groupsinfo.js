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
  const user = firebase.auth().currentUser;
  db.settings({ timestampsInSnapshots : true});
  

//render group info

  const Groupscreated  = document.querySelector('#groups-created');
  const Groupsjoined  = document.querySelector('#groups-joined');

  

  function rendergroupinfo1(doc){

  //group data

    let p = document.createElement('p');
    
    let eventcelebrator = document.createElement('span');
    let eventtype = document.createElement('span');
    let date = document.createElement('span');
    let groupid = document.createElement('span');
    
    

    p.setAttribute('data-id', doc.id);
    date.textContent = doc.data().date;
    groupid.textContent = doc.data().groupId;
    eventtype.textContent = doc.data().eventtype;
    eventcelebrator.textContent = doc.data().eventcelebrator;
    
    const groupId = groupid.textContent 
    var a = document.createElement('a');
    var linkText = document.createTextNode("Go to Group Page");
    a.appendChild(linkText);
    a.title = "Go to Group Page";
    a.id = groupId;
    a.href = "grouppage.html";
    
    console.log(a.id)
  
    p.append(eventcelebrator , "'s ", eventtype," ",a);
    
    Groupscreated.appendChild(p);

    a.addEventListener("click", myFunction);

function myFunction() {

  
       // saving groupid in localstorage
       window.localStorage.setItem('group-ID',JSON.stringify(groupid.textContent));
       window.localStorage.getItem('group-ID');
       console.log(window.localStorage.getItem('group-ID'));
    
      
}
  }

 

// getting data

 auth.onAuthStateChanged(user => {
  const displayName = user.displayName;


  db.collection('Group-Form').where('username','==',displayName).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        rendergroupinfo1(doc);  
    });
  });

 

 })

