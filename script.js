// script.js

var products = []; // Ürünlerin listesi
var cart = []; // Sepetin listesi

// Ürün ekleme
function addProduct(event) {
  event.preventDefault();

  var productName = document.getElementById("productName").value;
  var productPrice = parseFloat(document.getElementById("productPrice").value);

  
  var product = {
    name: productName,
    price: productPrice
  };

  products.push(product);

  renderProducts();
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
}

// Ürünleri listeleme
function renderProducts() {
  var productList = document.getElementById("productList");
  productList.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var li = document.createElement("li");
    li.innerHTML = product.name + " - $" + product.price.toFixed(2);
    productList.appendChild(li);
  }
}

// Sepete ekleme
function addToCart(index) {
  var product = products[index];
  cart.push(product);
  saveCartToLocalStorage(); // Sepeti local storage'a kaydet
  renderCart();
}

// Sepet ürününü silme
function deleteCartItem(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage(); // Sepeti local storage'a kaydet

  renderCart();
}

function deleteProduct(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage(); // Sepeti local storage'a kaydet
  renderCart();
}

// Sepeti güncelleme
function renderCart() {
    var cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
  
    var totalPrice = 0; // Toplam fiyatı hesaplamak için değişken oluşturun
  
    for (var i = 0; i < cart.length; i++) {
      var cartItem = cart[i];
      var li = document.createElement("li");
  
      var productName = document.createElement("span");
      productName.innerHTML = cartItem.name.padEnd(30,"-") ;
      li.appendChild(productName);
  
      var productPrice = document.createElement("span");
      productPrice.innerHTML = "$" + cartItem.price.toFixed(2);
      li.appendChild(productPrice);
  
      var deleteButton = document.createElement("button");
      deleteButton.innerText = "Sil";
      deleteButton.setAttribute("data-index", i);
      deleteButton.className = "delete-button";
      deleteButton.onclick = function () {
        var index = parseInt(this.getAttribute("data-index"));
        deleteCartItem(index);
      };
  
      li.appendChild(deleteButton);
      cartList.appendChild(li);
  
      totalPrice += cartItem.price; // Her ürünün fiyatını toplam fiyata ekleyin
    }
  
    var cartTotal = document.getElementById("cartTotal");
    cartTotal.innerHTML = "Toplam Fiyat: $" + totalPrice.toFixed(2); // Toplam fiyatı güncelleyin
    
    cartTotal.style.fontWeight="bold"
  }

// Sepeti satın alma
function buyCart() {
  if (cart.length > 0) {
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      totalPrice += cart[i].price;
    }

    Swal.fire({
      icon: 'success',
      title: 'Sepetinizi satın aldınız!',
      text: 'Toplam fiyat: $' + totalPrice.toFixed(2),
    });

    cart = [];
    saveCartToLocalStorage(); // Sepeti local storage'dan sil

    renderCart();

  } else {
    Swal.fire({
      icon: 'info',
      title: 'Sepetiniz boş!',
      text: 'Sepetinizi doldurun ve tekrar deneyin.',
    });
  }
}

// Ürünleri local storage'da saklama
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Ürünleri local storage'dan yükleme
  function loadProductsFromLocalStorage() {
    var storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      products = JSON.parse(storedProducts);
      renderProducts(); // Ürünleri yükledikten sonra listeyi güncelle
    }
  }
  
  // Sepeti local storage'da saklama
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Sepeti local storage'dan yükleme
  function loadCartFromLocalStorage() {
    var storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
  }
// Ürün ekleme
function addProduct(event) {
    event.preventDefault();
  
    var productName = document.getElementById("productName").value;
    var productPrice = parseFloat(document.getElementById("productPrice").value);
  
    if (productName.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Ürün adı boş. Lütfen geçerli bir ürün adı girin.'
      });
      return;
    }
  
    if (isNaN(productPrice)|| productPrice <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Geçersiz fiyat. Lütfen geçerli bir fiyat girin.'
      });
      return;
    }

    var product = {
      name: productName,
      price: productPrice
    };
  
    products.push(product);
    saveProductsToLocalStorage(); // Ürünleri local storage'a kaydet
  
    renderProducts();
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
  }
  
  // Sepete ekleme
  function addToCart(index) {
    var product = products[index];
    cart.push(product);
    saveCartToLocalStorage(); // Sepeti local storage'a kaydet
  
    renderCart();
  }
// Sayfa yüklendiğinde verileri local storage'dan yükle
window.onload = function() {
    loadProductsFromLocalStorage();
    loadCartFromLocalStorage();
    renderProducts();
    renderCart();
  };
      
  // Ürünü silme
  function deleteProduct(index) {
  products.splice(index, 1);
  saveProductsToLocalStorage(); // Ürünleri local storage'a kaydet

  renderProducts();
}
  
  
 // Ürünleri listeleme
function renderProducts() {
    var productList = document.getElementById("productList");
    productList.innerHTML = "";
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      var li = document.createElement("li");
      li.innerHTML = `${product.name.padEnd(30, '-')}   $${product.price.toFixed(2)}`;
      li.style.fontSize = "18px";
      var addButton = document.createElement("button");
      addButton.innerText = "Sepete Ekle";
      addButton.setAttribute("data-index", i);
      addButton.className = "add-button";
      addButton.style.paddingLeft="10px";
      addButton.style.marginLeft="40px";
      addButton.onclick = function() {
        var index = parseInt(this.getAttribute("data-index"));
        addToCart(index);

      };
  
      var deleteButton = document.createElement("button");
      deleteButton.innerText = "Sil";
      deleteButton.setAttribute("data-index", i);
      deleteButton.className = "delete-button";
      deleteButton.onclick = function() {
        var index = parseInt(this.getAttribute("data-index"));
        deleteProduct(index);
      };
  
      li.appendChild(addButton);
      li.appendChild(deleteButton);
      productList.appendChild(li);
    }
  }
  