// To be unit tested
function verifyAge(age) {
  age = parseInt(age, 10);
  const ageCheck = age !== NaN && age > 0 ? true : false;
  return ageCheck;
}

// To be unit tested
function verifyExists(attr) {
  const attrCheck = attr === "" || attr === undefined ? false : true;
  return attrCheck;
}

const householdContainer = document.getElementsByClassName("household")[0];
const addButton = document.getElementsByClassName("add")[0];
const submitButton = document.querySelector("button[type=submit]");
const pageContainer = document.getElementsByClassName("builder")[0];
let errorsContainer = document.createElement('div');
errorsContainer.id = "errors";
pageContainer.appendChild(errorsContainer);

function renderHouseholdMember(values) {
  const li = document.createElement('li');
  li.className = "householdMember";
  const button = document.createElement('button');
  button.name = "removeButton";
  button.innerText = "Remove";
  var ol = document.createElement("ol");
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
  const errors = [
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
  let formValues = {};

  for (var i = 0; i < document.forms[0].length; i++) {
    if (document.forms[0][i].value && document.forms[0][i].value !== "") {
      formValues[document.forms[0][i].name] = document.forms[0][i].value;
    }
  }
  const validateAge = verifyAge(formValues.age);
  const checkRelationship = verifyExists(formValues.rel);
  if (validateAge && checkRelationship) {
    renderHouseholdMember(formValues);
  }
  else {
    renderError(validateAge, checkRelationship);
  }
});

submitButton.addEventListener('click', function(e){
  e.preventDefault();
  var householdMembers = document.getElementsByClassName("householdMember");
  for (var i = 0; i < householdMembers.length; i++) {
    var householdMemberAttrs = householdMembers[i].children[0].children;
    var members = {};
    var memberJSON;
    members[i] = members[i] || {};
    for (var j = 0; j < householdMemberAttrs.length; j++) {
      var attr = householdMemberAttrs[j].innerText;
      var attrName = attr.substring(0, attr.indexOf(":"));
      var attrValue = attr.substring(attr.indexOf(":"));
      members[i][j] = members[i][j] || {};
      members[i][j][attrName] = attrValue;
    }
  }
  memberJSON = JSON.stringify(members);
  var debugContainer = document.getElementsByClassName("debug")[0];
  debugContainer.innerHTML = memberJSON;
  debugContainer.style.display = "block";
});
