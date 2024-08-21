// menu button functionalty
const menu = document.querySelector(".menu");
const closer = document.querySelector(".full-div i");

tl = gsap.timeline();

tl.to(".full-div", {
  right: 0,
  duration: 0.3,
});

tl.from(".full-div a", {
  x: 100,
  duration: 0.3,
  stagger: 0.2,
  opacity: 0,
});

tl.from("full-Div i", {
  opacity: 0,
});

tl.pause();

menu.addEventListener("click", function() {
  tl.play();
});

closer.addEventListener("click", function() {
  tl.reverse();
});


// user icon javascript

let listElements = document.querySelector(".active")

listElements.addEventListener("click", (event) => {
  event.preventDefault();
  var box = document.querySelector('.box');
  if (box.style.display === 'none' || box.style.display === "") {
    box.style.display = 'block'
  } else {
    box.style.display = 'none'
  }
});


// addToCart and shoping card 

let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector("#iconCartSpan");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".productlist");

let listProducts = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

// Function to add data to the HTML
const addDataToHTML = () => {
  // Clear the existing HTML content in the product list container
  listProductHTML.innerHTML = "";

  // Check if there are any products in the list
  if (listProducts.length > 0) {
    // Loop through each product and create the necessary HTML structure
    listProducts.forEach((product) => {
      // Create a new div element for the product
      let newProduct = document.createElement("div");
      newProduct.classList.add("swiper-slide"); // Adding the "swiper-slide" class
      newProduct.setAttribute("data-id", product.id); // Setting a data attribute with the product ID

      // Populate the inner HTML of the product div
      newProduct.innerHTML = `
        <img src="${product.image}" class="w-full h-48 object-contain mb-4">
        <div class="flex w-full product-details text-center">
          <div class="box2 pb-2 pl-4 pr-12 text-left h-full">
            <a class="px-1.5 py-1 text-lg border-none rounded-md mb-5" href="#">${product.category}</a>
            <div class="rating flex items-center mt-2 mb-2">
              <span class="text-yellow-400 text-xl"><i class="fas fa-star"></i></span>
              <span class="text-yellow-400 text-xl"><i class="fas fa-star"></i></span>
              <span class="text-yellow-400 text-xl"><i class="fas fa-star"></i></span>
              <span class="text-yellow-400 text-xl"><i class="fas fa-star"></i></span>
              <span class="text-gray-300 text-xl"><i class="fas fa-star"></i></span>
              <span class="ml-2 text-blue-500 text-xl">${product.rating}</span>
            </div>
            <p class="text-4xl tracking-wider font-semibold mb-2">${product.name}</p>
            <a href="#" class="text-2xl font-bold text-green-600">${product.price}</a>
            <span class="text-gray-500 ml-2 line-through">${product.oldPrice}</span>
          </div>
          <div class="w-full relative">
            <button
              class="addCart bg-green-700 text-xl text-white rounded-full shadow hover:bg-green-800 transition duration-300">
              <i class="fas fa-shopping-cart ml-2"></i>
            </button>
          </div>
        </div>`;
      
      // Append the newly created product div to the main product list container
      listProductHTML.appendChild(newProduct);
    });

    // Uncomment and define the addCartFunctionality function to handle cart interactions
    // addCartFunctionality();
  }
};


// Event listener for Add To Cart buttons
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let productElement = positionClick.closest(".swiper-slide");
    let product_id = productElement ? productElement.dataset.id : null;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newcart = document.createElement("div");
      newcart.classList.add("item");
      newcart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProducts[positionProduct];
      listCartHTML.appendChild(newcart);
      newcart.innerHTML = `<div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name text-2xl">
                ${info.name}
                </div>
                <div class="totalPrice text-2xl">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
      listCartHTML.appendChild(newcart);
    });
  }
  iconCartSpan.innerHTML = totalQuantity;
};




listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if (positionClick.classList.contains('plus')) {
      type = 'plus';
    }
    changeQuantityCart(product_id, type);
  }
})
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case 'plus':
        cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
}

// Initialize app
const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    });
};

initApp();

// Function to render stars
const renderStars = (rating) => {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars +=
        '<span class="text-2xl text-yellow-400"><i class="fas fa-star"></i></span>';
    } else {
      stars +=
        '<span class="text-2xl text-gray-300"><i class="fas fa-star"></i></span>';
    }
  }
  return stars;
};

const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.searchBox');
const searchInput = document.querySelector('.searchBox input');
const closeIcon = document.querySelector('.close-icon');

searchIcon.addEventListener('click', () => {
  searchBox.style.display = 'flex';
  searchInput.focus();
});

closeIcon.addEventListener('click', () => {
  searchBox.style.display = 'none';
  searchInput.value = ''; // Clear the search input
});

