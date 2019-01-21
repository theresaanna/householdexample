// To be unit tested
function verifyAge(age) {
  age = parseInt(age, 10);
  var ageCheck = age !== NaN && age > 0 ? true : false;
  return ageCheck;
}

// To be unit tested
function verifyExists(attr) {
  var attrCheck = attr === "" || attr === undefined ? false : true;
  return attrCheck;
}

/*
Notes:
I wanted to do a true first iteration and not get too fancy. In
hindsight, this might have been a lot cleaner if I had went ahead
and used localStorage.
*/

var householdContainer = document.getElementsByClassName("household")[0],
    addButton = document.getElementsByClassName("add")[0],
    submitButton = document.querySelector("button[type=submit]"),
    pageContainer = document.getElementsByClassName("builder")[0],
    errorsContainer = document.createElement('div');
errorsContainer.id = "errors";
pageContainer.appendChild(errorsContainer);

function renderHouseholdMember(values) {
  var li, ol, button;
  li = document.createElement('li');
  li.className = "householdMember";
  button = document.createElement('button');
  button.name = "removeButton";
  button.innerText = "Remove";
  ol = document.createElement("ol");
  householdContainer.appendChild(li).appendChild(ol);
  for (var key in values) {
    ol.innerHTML += "<li class=\"householdMemberAttr\">" + key + ": " + values[key] + "</li>";
  }
  li.appendChild(button);
  button.addEventListener('click', function(e) {
    householdContainer.removeChild(e.target.parentElement);
  });
}

function renderError(validAge, hasRelationship) {
  var errors = [
    "Please verify that you have input a valid age and try again.<br/>",
    "Please select a relationship and try again.<br/>"
  ];
  errorsContainer.innerHTML = "";
  for (var i = 0; i <= 1; i++) {
    if (arguments[i] === false) {
        errorsContainer.innerHTML += errors[i];
    }
  }
}

addButton.addEventListener('click', function(e){
  e.preventDefault();
  var formValues = {},
      validateAge, checkRelationship;

  for (var i = 0; i < document.forms[0].length; i++) {
    if (document.forms[0][i].value && document.forms[0][i].value !== "") {
      formValues[document.forms[0][i].name] = document.forms[0][i].value;
    }
  }
  validateAge = verifyAge(formValues.age);
  checkRelationship = verifyExists(formValues.rel);
  if (validateAge && checkRelationship) {
    renderHouseholdMember(formValues);
  }
  else {
    renderError(validateAge, checkRelationship);
  }
});

submitButton.addEventListener('click', function(e){
  e.preventDefault();
  var householdMembers = document.getElementsByClassName("householdMember"),
      members = {},
      householdMembersAttrs,
      memberJSON,
      attr,
      attrName,
      attrValue,
      debugContainer;
  for (var i = 0; i < householdMembers.length; i++) {
    householdMemberAttrs = householdMembers[i].children[0].children;
    memberJSON;
    members[i] = {};
    for (var j = 0; j < householdMemberAttrs.length; j++) {
      attr = householdMemberAttrs[j].innerText;
      attrName = attr.substring(0, attr.indexOf(":"));
      attrValue = attr.substring(attr.indexOf(":")).substring(2);
      members[i][j] = members[i][j] || {};
      members[i][j][attrName] = attrValue;
    }
  }
  memberJSON = JSON.stringify(members);
  debugContainer = document.getElementsByClassName("debug")[0];
  debugContainer.innerHTML = memberJSON;
  debugContainer.style.display = "block";
});
