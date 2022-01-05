let timerId;
let dropdownBox = document.getElementById("dropDown");
let searchInput = document.getElementById("search");
searchInput.oninput = () => {
    deBounce(showData, 1000);
};

async function showData(){
    try{
        let inputValue = document.getElementById("search").value;
        let data = await fetch(`products/showProducts/${inputValue}`);
        console.log(data);
        let dt = await data.json();
        console.log(dt.searchedProducts);
        dropDown(dt.searchedProducts);
        
    }
    catch(err){
        console.log(err);
    }
}

function dropDown(product){
    console.log(product);
    dropdownBox.innerHTML = null;
    dropdownBox.setAttribute("class", "dropDown");
    product.forEach((el) => {
        let div = document.createElement("div");
        div.setAttribute("class", "dropDownDiv");
        let prodName = document.createElement("div");
        prodName.innerHTML = el.product_name;
        prodName.setAttribute("class", "dropDownName");

        div.onclick = () => {
            goToProduct(el);
        }

        div.append(prodName);
        dropdownBox.append(div);
    });
}

function goToProduct(product) {
    console.log(product._id);
    // const newProduct = JSON.parse(product);
    // console.log(newProduct.price);
    window.location.href = `products/${product._id}`
}

function deBounce(func, delay){
    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(function(){
        func();
    }, delay);
}