const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

const checkPhoneNumber = () => {
  if (input.value === "") {
    alert("Please provide a phone number");
  } else {
    result.innerText = phoneNumberValidator(input.value);
  }
};

const clearPhoneNumber = () => result.innerText = '';

const phoneNumberValidator = (input) => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  return regex.test(input) ? `Valid US number: ${input}` : `Invalid US number: ${input}`;
};

checkBtn.addEventListener('click', checkPhoneNumber);
clearBtn.addEventListener('click', clearPhoneNumber);
