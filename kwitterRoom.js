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
//ADICIONE SEUS LINKS FIREBASE

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";
function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala"
  });

  localStorage.setItem("roomName", roomName);

  window.location = "kwitterPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "kwitterPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
