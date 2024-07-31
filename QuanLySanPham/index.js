// B1: Xây dựng HTML
// B2: Xây dựng hàm bên Js
// B3: Xác định phần tử HTML mà mình muốn tương tác

let list = ["Iphone", "Samsung", "Iphone 11"];

function searchName() {
    let nameSearch = document.getElementById("name-search").value;
    const newList = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].toLowerCase().includes(nameSearch.toLowerCase())) {
            const product = list[i];
            newList.push(product);
        }
    }

    let html = '';
    for (let i = 0; i < list.length; i++) {
        html += `
            <tr>
                <td>${list[i]}</td>
                <td><button onclick="showFormEdit(${i})">Sửa</button></td>
                <td><button onclick="removeProduct(${i})">Xóa</button></td>
            </tr>
        `;
    }
    document.getElementById('list-product').innerHTML = html;
}

function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getDataLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

function showAll() {
    let html = '';
    for (let i = 0; i < list.length; i++) {
        html += `
            <tr>
                <td>${list[i]}</td>
                <td><button onclick="showFormEdit(${i})">Sửa</button></td>
                <td><button onclick="removeProduct(${i})">Xóa</button></td>
            </tr>
        `;
    }
    document.getElementById('list-product').innerHTML = html;
}

function showFormEdit(index) {
    document.getElementById("new-product").value = list[index];
    document.getElementById("btn").innerHTML = `
        <button id="add-new-product" onclick="edit(${index})">Save</button>
    `;
}

function edit(index) {
    const newProduct = document.getElementById("new-product").value;
    list[index] = newProduct;
    alert("sửa thành công");
    showAll();
    document.getElementById("new-product").value = '';
    document.getElementById("btn").innerHTML = `
    <button id="add-new-product" onclick="edit(${index})">Add</button>
    `;
}

function addProduct() {
    const newProduct = document.getElementById('new-product').value;
    list.push(newProduct);
    saveLocalStorage("list", list);
    showAll();
    alert("Thêm thành công");
    document.getElementById("new-product").value = '';
}

function removeProduct(index) {
    const isConfirm = confirm("Are you sure?");
    if (isConfirm) {
        list.splice(index, 1);
        saveLocalStorage("list", list);
        showAll();
        alert("Xóa thành công");
    }
}

showAll();
const addNewProduct = document.getElementById('add-new-product');
addNewProduct.addEventListener("click", addProduct);