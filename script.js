// Carousel Logic, for mobile and tablet
let slidePosition = 0;
const slides = document.getElementsByClassName("carousel__item");
const totalSlides = slides.length;

document
  .querySelector(".carousel__prev")
  .addEventListener("click", function () {
    moveToPrevSlide();
  });

document
  .querySelector(".carousel__next")
  .addEventListener("click", function () {
    moveToNextSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove("carousel__item-visible");
    slide.classList.add("carousel__item-hidden");
  }

  slides[slidePosition].classList.add("carousel__item-visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}

// Product Quantity and add to cart logic
let quantity = 0;
let count = document.querySelector(".product__quantity-value");

const priceText = document.querySelector(
  ".product__discount-price",
).textContent;
const price = parseFloat(priceText.replace("$", ""));
let cartCount = document.querySelector(".nav__cart-badge");
let totalItems = 0;

document
  .querySelector(".product__decrease")
  .addEventListener("click", function () {
    decreaseCount();
  });

document
  .querySelector(".product__increase")
  .addEventListener("click", function () {
    increaseCount();
  });

function decreaseCount() {
  if (quantity === 0) {
  } else {
    quantity--;
  }

  count.textContent = quantity;
}

function increaseCount() {
  quantity++;
  count.textContent = quantity;
}

document
  .querySelector(".product__add-to-cart")
  .addEventListener("click", function () {
    addToCart();
  });

function addToCart() {
  if (quantity === 0) {
  } else {
    totalItems = totalItems + quantity;
    cartCount.textContent = totalItems;
    cartCount.style.display = "flex";
    quantity = 0;
    count.textContent = quantity;
  }
}
