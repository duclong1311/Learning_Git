const input = document.querySelector("#text-input");
const button = document.querySelector("#check-btn");
const result = document.querySelector("#result");

const checkForPalindrome = () => {
  if (input.value === "") {
    alert("Please input a value");
  } else {
    // remove any non alphabet characters from the input
    const inputValue = input.value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    if (inputValue === inputValue.split("").reverse().join("")) {
      result.innerHTML = `${input.value} is a palindrome`;
    } else {
      result.innerHTML = `${input.value} is not a palindrome`;
    }
  }
};

button.addEventListener("click", checkForPalindrome);