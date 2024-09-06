let price = 19.5; // Giả sử giá mặc định là 19.5 cho ví dụ
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const customerCash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

function calculateChange(price, cash, cid) {
    const currencyUnits = [
        ['ONE HUNDRED', 100],
        ['TWENTY', 20],
        ['TEN', 10],
        ['FIVE', 5],
        ['ONE', 1],
        ['QUARTER', 0.25],
        ['DIME', 0.1],
        ['NICKEL', 0.05],
        ['PENNY', 0.01]
    ];

    let cashToReturn = cash - price;
    let change = [];
    let totalCashInDrawer = cid.reduce((total, currency) => total + currency[1], 0);

    if (cashToReturn > totalCashInDrawer) {
        return "Status: INSUFFICIENT_FUNDS";
    } else if (cashToReturn === totalCashInDrawer) {
        // Nếu tổng số tiền cần trả lại bằng với số tiền trong ngăn kéo, trả lại tất cả tiền và đóng ngăn kéo
        for (let i = 0; i < currencyUnits.length; i++) {
            let unitName = currencyUnits[i][0];
            let unitValue = currencyUnits[i][1];
            let amountInDrawer = cid.find(item => item[0] === unitName)[1];
            if (amountInDrawer > 0) {
                change.push([unitName, amountInDrawer]);
            }
        }
        return "Status: CLOSED " + change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ');
    }

    for (let i = 0; i < currencyUnits.length; i++) {
        let unitName = currencyUnits[i][0]; // Tên đơn vị tiền tệ, ví dụ: "ONE HUNDRED"
        let unitValue = currencyUnits[i][1]; // Giá trị đơn vị tiền tệ, ví dụ: 100
        let drawerItem = cid.find(item => item[0] === unitName); // Tìm đơn vị tiền tệ trong cid
        let amountInDrawer = drawerItem[1]; // Số lượng tiền có sẵn trong ngăn kéo
        let amountToGive = 0; // Số lượng tiền cần trả lại cho đơn vị này

        while (cashToReturn >= unitValue && amountInDrawer > 0) {
            cashToReturn -= unitValue; // Giảm số tiền cần trả lại
            cashToReturn = parseFloat(cashToReturn.toFixed(2));
            amountInDrawer -= unitValue; // Giảm số tiền có sẵn trong ngăn kéo
            amountToGive += unitValue; // Tăng số tiền sẽ trả lại cho đơn vị này
        }

        drawerItem[1] = amountInDrawer; // Cập nhật lại số tiền trong ngăn kéo sau khi đã lấy ra

        if (amountToGive > 0) {
            change.push([unitName, amountToGive]); // Nếu có tiền trả lại, lưu lại trong mảng change
        }
    }


    if (cashToReturn > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    return "Status: OPEN " + change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ');
}

purchaseBtn.addEventListener('click', () => {
    let customerCashValue = parseFloat(customerCash.value);

    if (customerCashValue < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (customerCashValue === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
    } else {
        let result = calculateChange(price, customerCashValue, cid);
        changeDue.textContent = result;
    }
});
