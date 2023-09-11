const firebaseConfig = {
    apiKey: "AIzaSyDc2HOz5FGzWMoelvragdcNNENOS1bY21s",
    authDomain: "kwitter-6984d.firebaseapp.com",
    databaseURL: "https://kwitter-6984d-default-rtdb.firebaseio.com",
    projectId: "kwitter-6984d",
    storageBucket: "kwitter-6984d.appspot.com",
    messagingSenderId: "276431106569",
    appId: "1:276431106569:web:50781ff90a087fd9ddbed8"
};

firebase.initializeApp(firebaseConfig);
userName=localStorage.getItem("userName");
roomName=localStorage.getItem("roomName");

function send(){
    msg=document.getElementById("msg").value ;
    firebase.database().ref(roomName).push({
        name:userName,
        message:msg,
        like:0
    });
    msg=document.getElementById("msg").value=" " ;

}
function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
         snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
             childData = childSnapshot.val();
              if (childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;
                //Início do código
console.log(firebaseMessageId);
console.log(messageData);
name=messageData["name"];
message=messageData["message"];
like=messageData["like"];
console.log(name);
nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


       row = nameWithTag + messageWithTag +like_button + spanWithTag;      
       document.getElementById("output").innerHTML += row;









                //Fim do código
            }
        });
    });
}
getData();

function updateLike(m){
    bt=m;
    likes=document.getElementById(bt).value ;
    updateL=Number(likes)+1;
    firebase.database().ref(roomName).child(m).update({
        like: updateL
          });
        
        
        
        
        
        
}
function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location="index.html";

}


