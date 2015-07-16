var ref = new Firebase("https://scorching-inferno-7037.firebaseio.com/"),
    usersRef = ref.child('users'),
    ideasRef = ref.child('ideabox');
function getuid(){

 // returns the userid of an authenticated user... 
 var authInfo = ref.getAuth(),
     id = authInfo.uid.split(':'),
     uid = id[1];

     if (authInfo) {
      console.log('Success: '+ authInfo.uid);
     } else {
      console.log('Logged out!');
     }
return uid;
}

function pushIdea(subject, body){

         usersRef.on('child_added', function (snapshot) {
          console.log(snapshot.val());
         });
     
      ideasRef.push({
      'subject': subject,
      'body' : body,
      'uid' : getuid(),
      'date': Date()
    }, function (err) {
      if (err) {
        alert(err);
      } else {
        alert('Successfully pushed to Database!');
      }
    });
} //closes funtion 

function createIdea(title, desc) {
  var showIdeasWrapper = document.getElementById('parent'),
       wrapper = document.createElement('div'),
       subject = document.createElement('h3'),
       body = document.createElement('p'),
       editBtn = document.createElement('button'),
       removeBtn = document.createElement('button'),
       saveBtn = document.createElement('button'),
       counter = 0;

    wrapper.className = 'idea-box';
    body.className = 'idea-title';
    subject.className = 'idea-description';
    editBtn.className = ' btn btn-primary ';
    removeBtn.className = ' btn btn-danger ';
    saveBtn.className = ' btn btn-success btn-save ';

    wrapper.appendChild(subject);
    wrapper.appendChild(body);
    wrapper.appendChild(editBtn);
    wrapper.appendChild(removeBtn);
    wrapper.appendChild(saveBtn);
    showIdeasWrapper.appendChild(wrapper);

    subject.textContent = title;
    body.textContent = desc;
    editBtn.textContent = 'Edit';
    removeBtn.textContent = 'Remove';
    saveBtn.textContent = 'Save';

    removeBtn.addEventListener('click', function () {
      this.parentNode.parentNode.removeChild(this.parentNode);
    });

    saveBtn.addEventListener('click', function () {
      var title = this.parentNode.firstElementChild.textContent, desc = this.parentNode.firstElementChild.nextElementSibling.textContent,
          changeFormElem = this.nextElementSibling;

      if (changeFormElem !== null) {
        pushIdea( changeFormElem.firstElementChild.value || title, changeFormElem.firstElementChild.nextElementSibling.value || desc );
      } else {
        pushIdea(title, desc);
      }
    });

    editBtn.addEventListener('click', function () {
      var editForm = document.createElement('form'),
          editSubject = document.createElement('input'), editBody = document.createElement('textarea');

          ++counter;

          editForm.id = 'edit-idea-form';
          editForm.style.marginTop = '25px'
          editSubject.style.marginBottom = '10px';

          editSubject.value = this.parentNode.firstElementChild.textContent;
          editBody.value = this.parentNode.firstElementChild.nextElementSibling.textContent;

          editSubject.className = ' form-control change-subject ';
          editBody.className = ' form-control change-desc ';

          editSubject.required = true;
          editBody.required = true;

          if (counter === 1) {
            editForm.appendChild(editSubject);
            editForm.appendChild(editBody);

            this.parentNode.appendChild(editForm);
          } else {
          return false;
        }





    });

 
}

var userIdeaTitle = document.getElementById('user-idea'), 
    userIdeaDescription = document.getElementById('desc'), 
    submitIdeaForm = document.getElementById('idea-form');


submitIdeaForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Title: ' + userIdeaTitle.value, 'Description: ' + userIdeaDescription.value);

  //pushIdea(userIdeaTitle.value, userIdeaDescription.value);

  createIdea(userIdeaTitle.value, userIdeaDescription.value);
  userIdeaTitle.value = '';
  userIdeaDescription.value = '';
})

//getuid();
