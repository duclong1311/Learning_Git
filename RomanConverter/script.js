const inputNumber = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");
const romanDictionaries = [
    {romanNum: 'M', arabicNum: 1000},
    {romanNum: 'CM', arabicNum: 900},
    {romanNum: 'D', arabicNum: 500},
    {romanNum: 'CD', arabicNum: 400},
    {romanNum: 'C', arabicNum: 100},
    {romanNum: 'XC', arabicNum: 90},
    {romanNum: 'L', arabicNum: 50},
    {romanNum: 'XL', arabicNum: 40},
    {romanNum: 'X', arabicNum: 10},
    {romanNum: 'IX', arabicNum: 9},
    {romanNum: 'V', arabicNum: 5},
    {romanNum: 'IV', arabicNum: 4},
    {romanNum: 'I', arabicNum: 1}
];
const minuend = []; //So tru
const subtrahend = []; //So bi tru
const difference = []; // Hieu

const romanConverter = (input) => {
    if (input === 0) {
        return "";
    } else {
        for (let i = 0; i < romanDictionaries.length; i++) {
            if (input >= romanDictionaries[i].arabicNum){
                return romanDictionaries[i].romanNum + romanConverter(input - romanDictionaries[i].arabicNum);
            }
        }
    }
}

const checkUserInput = () => {
    const intInput = parseInt(inputNumber.value);

    if (!intInput) {
        result.innerText = "Please enter a valid number.";
        return;
    } if (intInput < 0) {
        result.innerText = "Please enter a number greater than or equal to 1";
        return;
    } if (intInput > 3999) {
        result.innerText = "Please enter a number less than or equal to 3999";
        return;
    }

    result.innerText = romanConverter(intInput);
    inputNumber.value = "";
}

inputNumber.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});

convertBtn.addEventListener("click", checkUserInput);

