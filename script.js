// Carousel Logic, for mobile and tablet
let slidePosition = 0;
const slides = document.getElementsByClassName("carousel__item");
const thumbnails = document.querySelectorAll(".carousel__thumbnail");
const totalSlides = slides.length;

// Prosuct Quantity and Add to Cart Logic
let quantity = 0;
const count = document.querySelector(".product__quantity-value");
const priceText = document.querySelector(
  ".product__discount-price",
).textContent;
const price = parseFloat(priceText.replace("$", ""));
const cartCount = document.querySelector(".nav__cart-badge");
let totalItems = 0;

// Cart Selectors
const cartEmpty = document.querySelector(".cart__empty");
const cartFull = document.querySelector(".cart__full");
const cartQuantity = document.querySelector(".cart__quantity");
const cartDeleteBtn = document.querySelector(".cart__delete");
const cartBtn = document.querySelector(".nav__cart");
const cartDropdown = document.querySelector(".cart__dropdown");

// Lightbox Selectors
const carouselContainer = document.querySelector(".carousel__container");
const lightbox = document.querySelector(".lightbox__container");
const lightboxCloseBtn = document.querySelector(".lightbox__close");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxSlides = document.getElementsByClassName("lightbox__item");
const lightboxThumbnails = document.querySelectorAll(".lightbox__thumbnail");

// Mobile Menu Selectors
const mobileMenuBtn = document.querySelector(".nav__menu-icon");
const mobileMenuCloseBtn = document.querySelector(".mobile__close-menu");
const mobileMenu = document.querySelector(".mobile__menu");
const mobileOverlay = document.querySelector(".mobile__overlay");

document
  .querySelector(".carousel__prev")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    moveToPrevSlide();
  });

document
  .querySelector(".carousel__next")
  .addEventListener("click", function (e) {
    e.stopPropagation();
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
  updateMainThumbnails();
  updateLightboxSlidePosition();
  updateLightboxThumbnails();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
  updateMainThumbnails();
  updateLightboxSlidePosition();
  updateLightboxThumbnails();
}

// Product Quantity and add to cart logic

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
  if (quantity > 0) {
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
    return;
  } else {
    totalItems = totalItems + quantity;
    cartCount.textContent = totalItems;
    cartCount.style.display = "flex";
    cartEmpty.classList.add("is-hidden");
    cartFull.classList.add("is-visible");
    cartQuantity.textContent = totalItems;
    const totalPrice = (totalItems * price).toFixed(2);

    document.querySelector(".cart__total-price").textContent = "$" + totalPrice;

    quantity = 0;
    count.textContent = quantity;
  }
}

// Cart dropdown logic

cartBtn.addEventListener("click", function () {
  cartDropdown.classList.toggle("is-open");
});

// Cart delete button logic

cartDeleteBtn.addEventListener("click", function () {
  totalItems = 0;
  cartCount.textContent = totalItems;
  cartCount.style.display = "none";
  cartEmpty.classList.add("is-hidden");
  cartFull.classList.add("is-visible");
});

// Mobile menu logic
mobileMenuBtn.addEventListener("click", function () {
  mobileMenu.classList.add("is-open");
  mobileOverlay.style.display = "block";
});

mobileMenuCloseBtn.addEventListener("click", function () {
  mobileMenu.classList.remove("is-open");
  mobileOverlay.style.display = "none";
});

mobileOverlay.addEventListener("click", function () {
  mobileMenu.classList.remove("is-open");
  mobileOverlay.style.display = "none";
});

// Thumbnail click logic
function updateMainThumbnails() {
  thumbnails.forEach(function (t) {
    t.classList.remove("carousel__thumbnail-active");
  });
  thumbnails[slidePosition].classList.add("carousel__thumbnail-active");
}

thumbnails.forEach(function (thumbnail, index) {
  thumbnail.addEventListener("click", function () {
    slidePosition = index;
    updateSlidePosition();
    updateMainThumbnails();
    updateLightboxSlidePosition();
    updateLightboxThumbnails();
  });
});

// Lightbox logic
carouselContainer.addEventListener("click", function () {
  lightbox.style.display = "flex";
  updateLightboxSlidePosition();
  updateLightboxThumbnails();
});

lightboxCloseBtn.addEventListener("click", function () {
  lightbox.style.display = "none";
});

lightboxOverlay.addEventListener("click", function () {
  lightbox.style.display = "none";
});

document
  .querySelector(".lightbox__prev")
  .addEventListener("click", function () {
    moveToPrevSlide();
  });

document
  .querySelector(".lightbox__next")
  .addEventListener("click", function () {
    moveToNextSlide();
  });

lightboxThumbnails.forEach(function (thumbnail, index) {
  thumbnail.addEventListener("click", function () {
    lightboxThumbnails.forEach(function (t) {
      t.classList.remove("lightbox__thumbnail-active");
    });
    thumbnail.classList.add("lightbox__thumbnail-active");
    slidePosition = index;
    updateLightboxSlidePosition();
    updateLightboxThumbnails();
    updateSlidePosition();
    updateMainThumbnails();
  });
});

function updateLightboxSlidePosition() {
  for (let slide of lightboxSlides) {
    slide.classList.remove("lightbox__item-visible");
    slide.classList.add("lightbox__item-hidden");
  }

  lightboxSlides[slidePosition].classList.add("lightbox__item-visible");
}

function updateLightboxThumbnails() {
  lightboxThumbnails.forEach(function (t) {
    t.classList.remove("lightbox__thumbnail-active");
  });
  lightboxThumbnails[slidePosition].classList.add("lightbox__thumbnail-active");
}
