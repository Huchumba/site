let basket = JSON.parse(localStorage.getItem("cartItems")) || [];  

let addToCart = (id) => {
    selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
            msg:"In cart"
        });
        let msgParent = document.getElementById(selectedItem.id);
        let msg = document.createElement('div');
        msgParent.append(msg);
        msgParent.style.pointerEvents = 'none';
    }     
    else if(ifExists) {
        let msgParent = document.getElementById(selectedItem.id);
        let msg = document.createElement('div');
        msgParent.append(msg);
        msgParent.style.pointerEvents = 'none';
  
    }
  
    updateCartQuantity()
    localStorage.setItem("cartItems", JSON.stringify(basket));
  }
  
  
  let updateCartQuantity = () => {
    let noOfItemsInCart = document.getElementById('cart-items-no');
    noOfItemsInCart.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0)
  }
  updateCartQuantity();