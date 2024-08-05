const store = new Store("Linh's store");
const p1 = new Product(1, "Bánh", 20000, "https://dongtienbakery.com/image/cache/data/Product_B%C3%A1nh%20m%C3%AC/B%C3%A1nh%20m%C3%AC%20kh%C3%B4ng%20nh%C3%A2n%20(2)_fix-608x416f.jpg");
//store.add(p1);

function getAll() {
    const listProduct = store.getList();
    let html = ``;
    for (let i = 0; i < listProduct.length; i++) {
        html += `
            <tr>
                <td>${listProduct[i].id}</td>
                <td>${listProduct[i].name}</td>
                <td>${listProduct[i].price}</td>
                <td><img src=${listProduct[i].image} style="width: 50px; heigh=50px;"></td>
                <td>
                    <button onclick="remove(${i})">Xóa</button>
                    <button onclick="showFormUpdate(${i})">Sửa</button>
                </td>
                <td><button onclick="showDetail(${i})">Chi tiết</button></td>
            </tr>
        `;
    }
    document.getElementById("list-product").innerHTML = html;
}

function showDetail(index) {
    const productDetail = store.getProductByIndex(index);
    document.getElementById("product-detail").innerHTML = `
        <h3>Detail</h3>
    `;
}

function getByName() {
    const nameSearch = document.getElementById("name-search").value;
    const list = store.getByName(nameSearch);
    for (let i = 0; i < list.length; i++) {
        html += `
            <tr>
                <td>${listProduct[i].id}</td>
                <td>${listProduct[i].name}</td>
                <td>${listProduct[i].price}</td>
                <td><img src=${listProduct[i].image} style="width: 50px; heigh=50px;"></td>
                <td>
                    <button onclick="remove(${i})">Xóa</button>
                     <button onclick="showFormUpdate(${i})">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("list-product").innerHTML = html;
}

function showFormUpdate(index) {
    window.location = "add.html";
    const oldProduct = store.getProductByIndex(index);
    document.getElementById("product-id").value = oldProduct.id;
    document.getElementById("product-name").value = oldProduct.name;
    document.getElementById("product-price").value = oldProduct.price;
    document.getElementById("product-image").value = oldProduct.image;
    document.getElementById("btn").innerHTML = `<button onclick="edit(${index})">Edit</button>`
}

function update(index) {
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;
    const newProduct = new Product(id, name, price, image);
    store.update(index, newProduct);
    alert("Sửa thành công");
    getAll();
    clearData();
    document.getElementById("btn").innerHTML = `<button onclick="add()">Add</button>`
}

function add() {
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;
    const newProduct = new Product(id, name, price, image);
    window.location = "index.html"
    store.add(newProduct);
    getAll();
    clearData();
}

function remove(index) {
    const isConfirm = confirm("Bạn chắc chứ");
    if (isConfirm) {
        store.remove(index);
        alert("Xóa thành công");
        getAll();
    }
}

function clearData() {
    document.getElementById("product-id").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
}

getAll();
