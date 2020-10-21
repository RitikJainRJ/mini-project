const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkRequired(inputArr){
  inputArr.forEach(input => {
    if(input.value.trim() === '')
      showError(input, `${input.id} is required`);
    else
      showSuccess(input);
  });
}

function checkLength(input, min, max){
  if(input.value.length < min)
    showError(input, `${input.id} must be greater than ${min}`);
  else if(input.value.length > max)
    showError(input, `${input.id} must be less than ${max}`);
  else
    showSuccess(input);
}

function checkEmail(email){

}

function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value)
    showError(input2, 'password does not match');
  else if(input2.value.trim() !== '')
    showSuccess(input2);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkRequired([ username, email, password, password2 ]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
})