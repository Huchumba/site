let row0_product = document.getElementById("row0-products");
let row1_product = document.getElementById("row1-products");
let row2_products = document.getElementById("row2-products");
let row3_products = document.getElementById("row3-products");

let data;
let url = '../js/shopItems2.json';
let response = await fetch(url);
console.log(response.ok);

if (response.ok) {
  data = await response.json();
  console.log(data);
  outputGoods(data);
} else {
  console.log("Ошибка HTTP: " + response.status);
}

const filters = document.querySelector('#filters');
filters.addEventListener('input', filterGoods);

function filterGoods() {
  const categoryes = [...filters.querySelectorAll('#category input:checked')].map(n => n.value),
  rating = [...filters.querySelectorAll('#rating input:checked')].map(n => parseInt(n.value)),
  reliability = [...filters.querySelectorAll('#reliability input:checked')].map(n => n.value),
  model = [...filters.querySelectorAll('#model input:checked')].map(n => n.value),
  priceMin = document.querySelector('#price-min').value, 
  priceMax = document.querySelector('#price-max').value;
    
  outputGoods(data.filter(n => (    
    (!categoryes.length || categoryes.includes(n.title)) &&
    (!rating.length || n.rating >= 4) &&
    (!reliability.length || reliability.includes(n.reliability)) &&
    (!model.length || model.includes(n.model)) &&
    (!priceMin || priceMin <= n.price) && (!priceMax || priceMax >= n.price)    
  )));
}

//let content = document.querySelector(".content");
function outputGoods(goods) {
    document.querySelector(".content").innerHTML = goods.map(n => `
    <div class="row3-items-container product" id = product-id-${n.id}>
             <div class="row3-item-information-container">
             <img class = "product-img" src=${n.img} alt="">
             <div class="add-to-cart-more">
                 <div class="more">
                 <a href="details.html?id=${n.id}">
                  <i class = "fa-solid fa-info"></i>
                 </a>
                 </div>
                 <div class="add-to-cart" onclick = "addToCart(${n.id})" id = "${n.id}">
                 <i class="fa-solid fa-cart-plus add-item-to-cart"></i>
                 </div>
             </div>
             </div>
             <div class="name-price">
             <p class="item-name">${n.name}</p><span class="item-price">$${n.price}</span>
             </div>
         </div>
  `).join('');
}