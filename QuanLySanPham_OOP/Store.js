class Store {
    constructor(nameInput) {
        this.name = nameInput;
        this.getStorage();        
    }

    add(newProduct) {
        this.listProduct.push(newProduct);
        this.saveStorage();
    }

    getList() {
        return this.listProduct;
    }

    remove(index) {
        this.listProduct.splice(index, 1);
        this.saveStorage();
    }

    getProductByIndex(index) {
        const product = this.listProduct[index];
        return product;
    }

    update(index, newProduct) {
        this.listProduct[index] = newProduct;
        this.saveStorage();
    }

    saveStorage() {
        localStorage.setItem("listProduct", JSON.stringify(this.listProduct));
    }

    getStorage() {
        const list = JSON.parse(localStorage.getItem("listProduct"));
        if (list === null) {
            this.listProduct = [];
        } else {
            this.listProduct = list;
        }
    }
    getByName(name) {
        const list = [];
        for (let i = 0; i < this.listProduct.length; i++) {
            const nameProduct = this.listProduct[i].name.toLowerCase();
            const nameSearch = name.toLowerCase();
            if (nameProduct.include(nameSearch)) {
                list.push(this.listProduct[i]);
            }
        }
        return list;
    }
}