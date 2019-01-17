// your code goes here ...
function verifyAge(age) {
  age = parseInt(age, 10);
  const ageCheck = age !== NaN && age > 0 ? true : false;
  return ageCheck;
}

function verifyExists(attr) {
  const attrCheck = attr === "" ? false : true;
  return attrCheck;
}

const householdContainer = document.getElementsByClassName("household")[0];
const addButton = document.getElementsByClassName("add")[0];
const submitButton = document.querySelector("button[type=submit]");

function renderHouseholdMember(values) {
  let memberHTML = "<ul>";
  for (var key in values) {
    memberHTML += "<li>" + key + ": " + values[key] + "</li>";
  }
  memberHTML += "</ul>";
  householdContainer.innerHTML = memberHTML;
}

function renderError(validAge, hasRelationship) {
  const errors = [
    "Please verify that you have input a valid age and try again.",
    "Please select a relationship and try again."
  ];
  for (var i = 0; i <= 1; i++) {
    if (arguments[i] === false) {
      householdContainer.innerHTML = errors[i];
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

submitButton.addEventListener('submit', function(e){
  debugger;
});
