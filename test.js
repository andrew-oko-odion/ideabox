
function registerUser(email, password, firstname, lastname){

    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");


    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:" +  userData.uid);
        var id = userData.uid.split(':');


     var createuser = ref.child("users");
    createuser.push({
    'firstname' : firstname,
    'lastname': lastname,
    //'sex': sex,
    //'date': date(),
    'email': email,
    'password': password,
    'uid': id[1] });

      console.log("writting users data to child node");
    console.log("done .... ");

      }
    });
}

// registerUser('smalltext@gmail.com', 'password', 'jack', 'smith');  // REGISTER A USER HERE ...

function loginUser(email, password){

    var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");

    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        //console.log("Login Failed!", error);
        return false;
      } else {
        //console.log("Authenticated successfully with payload:", authData);
        return true;
      }
    }, {remember: "default"});

}


function getuid(){

 // returns the userid of an authenticated user...
 var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com");

 if ( obj = ref.getAuth()) {
     var str = obj.uid.split(':');
     var id = str[1];
     //console.log("function getuid(): user is login with user id " + id);
     return id;
 }

 else {
     console.log("user is not login yet ");
     return false;
 }


}



function createIdea(subject, body){

     var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/");
     var id;
    if ( (id = getuid()) ){

    var addref = ref.child("ideabox");
    addref.push({
      'subject': subject,
      'body' : body,
      'uid' : id
    });
    }

     else {

         console.log('user not login');
        return false;
      }

} //closes funtion 

 var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/users");
  
  ref.on("value", function(snapshot) {
   var obj, id;
   obj = snapshot.val();
  console.log();

  for (var id in obj){

      var i = obj[id].uid;
      
      if (Number(i) === Number(getuid()) ){
      console.log(i);
    
    }

  }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

