async function deleteProduct(product_id){
    let data = await fetch(`http://localhost:7500/cart/${product_id}`);
    let dt = await data.json();
    alert("Product deleted successfully");
    location.reload();
}

async function updateTotalPrice(cart){
    let data = await fetch(`http://localhost:7500/cart/price`);
    let totalPrice = await data.json();
    console.log(totalPrice.sum);
    let totalDiv = document.getElementById('total_amount');
    totalDiv.textContent = '₹'+ totalPrice.sum;
}