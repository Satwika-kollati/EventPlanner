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
  
    const Groupdata = document.querySelector('#group-info');
    const title = document.querySelector('#title');
    const groupmembers = document.querySelector('#memberslist');
    
  
    function rendergroupinfo(doc){
  
    //group data
  
      let li = document.createElement('li');
      let date = document.createElement('span');
      let groupid = document.createElement('span');
      let password = document.createElement('span');
      let eventtype = document.createElement('span');
      let eventcelebrator = document.createElement('span');
  
      li.setAttribute('data-id', doc.id);
      date.textContent = doc.data().date;
      groupid.textContent = doc.data().groupId;
      password.textContent = doc.data().password;
      eventtype.textContent = doc.data().eventtype;
      eventcelebrator.textContent = doc.data().eventcelebrator;
      
      
      li.append("DATE OF THE EVENT : ", date);
      li.append("GROUP-ID :",groupid);
      li.append("PASSWORD :",password);
      
  
      Groupdata.appendChild(li);
    }  
  
     //HEADING
     function renderheading(doc){
  
     let heading = document.createElement('heading');
     let eventtype = document.createElement('span');
     let eventcelebrator = document.createElement('span');
  
      heading.setAttribute('data-id',doc.id);
      eventtype.textContent = doc.data().eventtype;
      eventcelebrator.textContent = doc.data().eventcelebrator;
      
      heading.append(eventcelebrator,"'s ", eventtype);
  
     title.appendChild(heading);
    }
  
    //members data
    function rendermembers(doc){
  
      
          let li = document.createElement('li');
          
          let members = document.createElement('span');
      
          li.setAttribute('data-id', doc.id);
          members.textContent = doc.data().username;
    
          li.append(members);
        
          groupmembers.appendChild(li);
        }  
      



  // COUNTDOWN TIMER
  
  function renderdate(doc){
  
      let de = document.createElement('de');
      let date = document.createElement('span'); 
  
      de.setAttribute('data-id', doc.id);
      date.textContent = doc.data().date;
  
      de.appendChild(date);
      
  
  function getTimeRemaining(endtime){
    var time = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (time/1000) % 60 );
    var minutes = Math.floor( (time/1000/60) % 60 );
    var hours = Math.floor( (time/(1000*60*60)) % 24 );
    var days = Math.floor( time/(1000*60*60*24) );
    return {
      'total': time,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function countdowntimer(id, endtime){
    var count = document.getElementById(id);
    var daysSpan = count.querySelector('#days');
    var hoursSpan = count.querySelector('#hours');
    var minutesSpan = count.querySelector('#minutes');
    var secondsSpan = count.querySelector('#seconds');
  
    function countdown(){
      var time = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = time.days;
      hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);
  
      if(time.total<=0){
        clearInterval(timeinterval);
      }
    }
  
    countdown();
    var timeinterval = setInterval(countdown,1000);
  }
  
  var eventtime = de.textContent ;
  countdowntimer('countdowntimer',eventtime);
  
  }

    
 
  // getting data
  
   auth.onAuthStateChanged(user => {
    const displayName = user.displayName;
    
    const groupid = JSON.parse(window.localStorage.getItem('GROUPID'))
    
    window.localStorage.removeItem('GROUPID')

    db.collection('Group-Form').where('groupId','==',groupid.grppId).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          rendergroupinfo(doc);  
      });
    });
  
    db.collection('Group-Form').where('groupId','==',groupid.grppId).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderheading(doc);
      });
    });
  
    db.collection('Group-Form').where('groupId','==',groupid.grppId).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderdate(doc);
      });
    });

    db.collectionGroup('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            rendermembers(doc);
          });
        });
      
  
  
   })
  