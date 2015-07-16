

function verifyEmail(email){

var status = false;     
var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

     if (email.search(emailRegEx) == -1) {
                 console.log("please enter a valid email address.");
     }
     
     else {
          console.log("Woohoo! it is a valid email address");
          status = true;
     }
     return status;
}



function getValue(){

    var mail = document.getElementById("mail").value;
    console.log("onclick caught");
    alert(mail);
 }


function getuid(){

 // returns the userid of an authenticated user... 
 var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");

 if ( obj = ref.getAuth()) {
     var id = obj.uid.split(':');
     console.log("user is login with user id " + id[1]);
     return id[1];
 }

 else 
 {
     console.log("user is not login yet ");
     return false;
 }


}


function createIdea(subject, body){

     var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/ideabox");
     var id; 
    if ( (id = getuid()) ){

    var addref = ref.child("ideabox");
    addref.push({
      'subject': subject,
      'body' : body,
      'uid' : id,
      'date': Date()
    });

    }
    else {
   
         console.log('user not login');	
	return false;
      }
} //closes funtion 





function deleteIdea(id){


}


function editIdea(id){

    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");

    var editref = ref.child("ideabox");
    editref.update({
      "subject": subject,
      "body": body
    });

}


function registerUser(email, password, firstname, lastname){
    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/"), createuser, id;
     console.log(ref);
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
       
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        id = userData.uid.split(':'),
        uid = id[1];
	
     createuser = ref.child("users");
    createuser.push({
    'firstname' : firstname,
    'lastname': lastname,
    'email': email,
    'password': password,
    'date': Date(),
    'id' : uid });
   
    console.log("writting users data to child node");
    alert("you have Being Registered. Please login ");

      }

} );

}

function loginUser(email, password){

    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");
    
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
	  return false;
      } else {
        console.log("Authenticated successfully with payload:", authData);
        window.location.href = "big.html"
	  return true;
      }
    }, {remember: "default"});

}




function getuserbyId(){

    // Get a reference to our posts
    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/users");

    // Retrieve new posts as they are added to our database
    ref.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log("Author: " + newPost.author);
      console.log("Title: " + newPost.title);
      console.log("Previous Post ID: " + prevChildKey);
    });

}



var form = document.getElementById('register-form');
form.addEventListener("submit", function(e){
  e.preventDefault();
  var email = document.getElementById('email').value;
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var password = document.getElementById('password').value;

  registerUser(email, password, firstname, lastname);
  //console.log(email, password, firstname, lastname);
});



var form1 = document.getElementById('login-form');
console.log(form1);
form1.addEventListener("submit", function(e){
  e.preventDefault();
  var username = document.getElementById('mail').value;
  var pass = document.getElementById('pass').value;

  loginUser(username, pass);
  
});
