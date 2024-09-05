const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
    diceValuesArr = [];

    for (let i = 0; i < 5; i++) {
        const randomDice = Math.floor(Math.random() * 6) + 1;
        diceValuesArr.push(randomDice);
    };

    listOfAllDice.forEach((dice, index) => {
        dice.textContent = diceValuesArr[index];
    });
};

const updateStats = () => {
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
};

const diceHandResult = (dice) => {

    const counts = {};
    for (const value of dice) {
        counts[value] = (counts[value] || 0) + 1;
    }

    const frequencies = Object.values(counts);

    const sortedDice = [...dice].sort((a, b) => a - b);

    if (frequencies.includes(4)) {
        return "Four of a kind";
    } else if (frequencies.includes(3)) {
        return "Three of a kind";
    } else if (frequencies.includes(3) && frequencies.includes(2)) {
        return "Full house";
    } else if (sortedDice.join('') === '12345') {
        return "Large straight";
    } else {
        return "None of the above";
    }
}

const updateScore = (selectedValue, achieved) => {
    score += parseInt(selectedValue);
    const li = document.createElement("li");
    totalScoreElement.textContent = score;
    li.textContent = `${achieved} : ${selectedValue}`;
    scoreHistory.appendChild(li);
};

const getHighestDuplicates = (arrs) => {
    const counts = {};
    const score = arrs.reduce((total, value) => {
        return total + value;
    }, 0);

    for (const value of arrs) {
        counts[value] = (counts[value] || 0) + 1;
    }

    const frequencies = Object.values(counts);

    if (frequencies.includes(4)) {
        updateRadioOption(1, score);
        updateRadioOption(0, score);
    } else if (frequencies.includes(3)) {
        updateRadioOption(0, score);
    } else {
        updateRadioOption(5, 0);
    }
};

const detectFullHouse = (arrs) => {
    const counts = {};

    for (const value of arrs) {
        counts[value] = (counts[value] || 0) + 1;
    }

    const frequencies = Object.values(counts);

    if (frequencies.includes(3) && frequencies.includes(2)) {
        updateRadioOption(2, 25);
    } else {
        updateRadioOption(5, 0);
    }
};

const checkForStraights = (arrs) => {
    const sortedDice = [...arrs].sort((a, b) => a - b);
    
    // Loại bỏ các giá trị trùng lặp
    const uniqueDice = [...new Set(sortedDice)];

    // Kiểm tra "large straight" (sảnh lớn)
    if (uniqueDice.join('') === '12345' || uniqueDice.join('') === '23456') {
        updateRadioOption(4, 40); // Radio button thứ 5 (chỉ mục 4)
        updateRadioOption(3, 30); // Radio button thứ 4 (chỉ mục 3), giá trị và văn bản là 30
    } 
    // Kiểm tra "small straight" (sảnh nhỏ)
    else if (
        (uniqueDice.length >= 4 && 
        ((uniqueDice[0] + 1 === uniqueDice[1] && uniqueDice[1] + 1 === uniqueDice[2] && uniqueDice[2] + 1 === uniqueDice[3]) || 
         (uniqueDice[1] + 1 === uniqueDice[2] && uniqueDice[2] + 1 === uniqueDice[3] && uniqueDice[3] + 1 === uniqueDice[4])))
    ) {
        updateRadioOption(3, 30); // Radio button thứ 4 (chỉ mục 3)
    } else {
        updateRadioOption(5, 0); // Radio button cuối cùng (chỉ mục 5)
    }
};

const resetRadioOptions = () => {
    for (let i = 0; i < scoreInputs.length; i++) {
        scoreInputs[i].disabled = true;
        scoreInputs[i].checked = false;
        scoreSpans[i].textContent = "";
    }
};

const updateRadioOption = (index, score) => {
    scoreSpans[index].textContent = `, score = ${score}`;
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
};

const resetGame = () => {
    diceValuesArr = [];
    listOfAllDice.forEach((dice) => {
        dice.textContent = 0;
    });
    score = 0;
    round = 1;
    rolls = 0;
    totalScoreElement.textContent = score;
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
    scoreHistory.textContent = "";
    resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
    if (rolls === 3) {
        alert("You have made three rolls this round. Please select a score.");
    } else {
        resetRadioOptions();
        rolls++;
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
        detectFullHouse(diceValuesArr);
        checkForStraights(diceValuesArr);
    }
});

rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing;

    if (isModalShowing) {
        rulesBtn.textContent = "Hide rules";
        rulesContainer.style.display = "block";
    } else {
        rulesBtn.textContent = "Show rules";
        rulesContainer.style.display = "none";
    }
});

keepScoreBtn.addEventListener("click", () => {
    let selectedValue;
    let achieved;

    for (const radioButton of scoreInputs) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            achieved = radioButton.id;
            break;
        }
    }

    if (selectedValue) {
        rolls = 0;
        round++;
        updateStats();
        resetRadioOptions();
        updateScore(selectedValue, achieved);
        if (round > 6) {
            setTimeout(() => {
                alert(`Game Over! Your total score is ${score}`);
                resetGame();
            }, 500);
        }
    } else {
        alert("Please select an option or roll the dice");
    }
});
