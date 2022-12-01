import { pizzaMenu } from "./data.js";

const menuList = document.getElementById("menu-items");
const cartBtn = document.getElementById("cartBtn");
cartBtn.addEventListener("click", function () {
  document.getElementById("cart").classList.toggle("toggle-menu");
});
const paymentModalOpen = document.getElementById("paymentBtn");
const paymentModalCloseBtn = document.getElementById("paymentCloseBtn");
const paymentBtn = document.getElementById("submit");

paymentBtn.addEventListener("submit", function (e) {
  validatePayment();
  e.preventDefault();
});

function validatePayment() {
  const paymentForm = document.getElementById("paymentForm");

  paymentForm.classList.add("hidden");

  document.getElementById("statusMessage").textContent = "Siparişiniz başarıyla alınmıştır";
}

paymentModalCloseBtn.addEventListener("click", function () {
  document.getElementById("paymentModal").classList.remove("flex");
  document.getElementById("paymentModal").classList.add("hidden");
});

paymentModalOpen.addEventListener("click", function () {
  document.getElementById("paymentModal").classList.add("flex");
  document.getElementById("paymentModal").classList.remove("hidden");
  document.getElementById("cart").classList.add("toggle-menu");
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    handleCartBtn(e.target.dataset.id);
  } else if (e.target.dataset.plus) {
    handlePlusBtn(e.target.dataset.plus);
  } else if (e.target.dataset.minus) {
    handleMinusBtn(e.target.dataset.minus);
  }
});

let basket = [];
function handleCartBtn(targetObj) {
  let selectedPizza = pizzaMenu.find(function (basketItem) {
    if (targetObj == basketItem.id) {
      return basketItem;
    }
  });
  if (!basket.includes(selectedPizza)) {
    basket.push(selectedPizza);
    selectedPizza.amount = 1;
  }

  renderCart();
}

function getCartHTML() {
  let cartItems = ``;
  basket.map(function (cartItem) {
    cartItems += `
      <div id="pizza-${cartItem.id}" class="cart-item flex flex-col p-6 border-1 border-b">
                <div>
                  <h2 class="text-xs">${cartItem.name}</h2>
                  <p class="font-light text-xs">${cartItem.desc}</p>
                </div class="">
                <p class="text-sm">$${cartItem.price}.00</p>
                <div class="cart-item-increment flex flex-auto gap-2 mt-3">
                  <button data-minus="${cartItem.id}" id="decreaseAmount"
                    class="w-6 h-6 bg-th-red-500 text-white rounded-full">-</button>
                  <p class="pizza-amount-${cartItem.id}">${cartItem.amount}</p>
                  <button data-plus="${cartItem.id}" id="increaseAmount"
                    class="w-6 h-6 bg-th-red-500 text-white rounded-full">+</button>
                </div>
              </div>
    `;
  });
  updateCart();
  return cartItems;
}

function renderCart() {
  document.getElementById("cart-items").innerHTML = getCartHTML();
}

function handlePlusBtn(menuItemID) {
  let selectedPizza = pizzaMenu.find(function (basketItem) {
    if (menuItemID == basketItem.id) {
      return basketItem;
    }
  });
  document.getElementsByClassName(`pizza-amount-${menuItemID}`)[0].innerHTML = selectedPizza.amount += 1;
  updateCart();
}

function handleMinusBtn(menuItemID) {
  let selectedPizza = pizzaMenu.find(function (basketItem) {
    if (menuItemID == basketItem.id) {
      return basketItem;
    }
  });
  if (selectedPizza.amount > 1) {
    document.getElementsByClassName(`pizza-amount-${menuItemID}`)[0].innerHTML = selectedPizza.amount -= 1;
  }

  updateCart();
}

function updateCart() {
  const cartCounter = document.getElementById("cartCounter");
  const cart = document.getElementById("cart-total");
  let total = 0;
  let totalAmount = 0;

  basket.forEach(function (cartItem) {
    total += cartItem.amount * cartItem.price;
    totalAmount += cartItem.amount;
  });
  cartCounter.innerHTML = `${totalAmount}`;
  cart.innerHTML = `$${total}.00`;

  if (totalAmount > 0) {
    paymentModalOpen.disabled = false;
    paymentModalOpen.classList.remove("bg-gray-400");
    paymentModalOpen.classList.add("bg-th-red-500");
    paymentModalOpen.classList.add("btn-shadow");
  }
}

function getMenu() {
  pizzaMenu.forEach(function (pizza) {
    menuList.innerHTML += `
    <li class="sm:w-72 grid grid-cols-[1fr_minmax(100px,_2fr)_1fr] items-center justify-center border border-[#bdbdbd] mx-4 p-5 gap-5 rounded-l-[180px] rounded-r-[30px] sm:mx-0 sm:grid-cols-1 sm:rounded-r-[0] sm:rounded-l-[0] sm:rounded-t-[180px] sm:rounded-b-[30px] sm:grid-rows-[1fr_minmax(150px,_auto)_auto]">
          <img class="w-24 sm:w-72" src="${pizza.img}" alt="" />
          <div>
            <h3 class="font-semibold text-2xl text-left sm:text-center">${pizza.name}</h3>
            <p class="font-thin leading-[18px] mt-4 text-sm text-left sm:text-center">${pizza.desc}</p>
          </div>
          <div class="text-center">
            <p class="text-th-green-400 font-semibold text-2xl leading-8">$${pizza.price}</p>
            <button data-id="${pizza.id}" class="font-medium text-xs w-full mt-2 bg-th-red-500 text-white uppercase px-6 py-2 rounded-3xl">add to cart</button>
          </div>
        </li>
    `;
  });
}

getMenu();
updateCart();
