const arrayLength = document.getElementById('array-length');
const createArrayBtn = document.getElementById('create-array');
const calculateBtn = document.getElementById('calculate');
const printArray = document.getElementById('array');
const results = document.getElementById('results');

let array = [];  

const createArray = () => {
    const length = parseInt(arrayLength.value);
    array = [];  

    if (isNaN(length) || length === '' || length > 19 || length <= 0) {
        alert("invalid array length");
    } else {
        for (let i = 0; i < length; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
        console.log(array);
        printArray.innerHTML = `Mảng được tạo là: ${array}`;
    } 
};

const calculate = (nums) => {
    let sum = 0;  
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 3 === 0 && nums[i] % 5 === 0) {
            sum += nums[i];
        } 
    }
    return sum == 0 ? "Không có phần tử thỏa mãn" : sum;
};

createArrayBtn.addEventListener('click', createArray);
calculateBtn.addEventListener('click', () => {
    const result = calculate(array);  
    results.innerHTML = `Tổng các số chia hết cho 3 và 5 là: ${result}`;  
});
