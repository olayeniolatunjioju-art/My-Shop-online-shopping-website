/* =========================================
   MY SHOP — MAIN JAVASCRIPT
   CART + CHECKOUT
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const STANDARD_DELIVERY = 2000;


/* =========================================
   SAVE CART
========================================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item => {
        count += Number(item.quantity) || 1;
    });

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    const container =
        document.getElementById("cart-Items");

    if (!container) return;

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="cart-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your shopping bag is empty.
                </h3>

                <p>
                    Add something beautiful to your cart.
                </p>

                <a href="index.html#collection">
                    SHOP NOW
                </a>

            </div>
        `;

        updateCartTotal();

        return;
    }


    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-image">

                    <img
                        src="${item.image || "./images/images.jpg"}"
                        alt="${item.name || "Product"}"
                    >

                </div>


                <div>

                    <h3>
                        ${item.name || "Product"}
                    </h3>

                    ${
                        item.size
                        ? `
                            <p>
                                Size: ${item.size}
                            </p>
                        `
                        : ""
                    }

                    <p>
                        ₦${price.toLocaleString()}
                    </p>

                </div>

            </div>


            <div class="cart-item-actions">


                <!-- QUANTITY -->

                <div class="cart-quantity">

                    <button
                        onclick="decreaseCartItem(${index})"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        onclick="increaseCartItem(${index})"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>


                <!-- ITEM TOTAL -->

                <strong>
                    ₦${itemTotal.toLocaleString()}
                </strong>


                <!-- REMOVE -->

                <button
                    class="remove-item"
                    onclick="removeCartItem(${index})"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;


        container.appendChild(div);

    });


    updateCartTotal();
}


/* =========================================
   CART TOTAL
========================================= */

function updateCartTotal() {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        total += price * quantity;

    });


    const totalPrice =
        document.getElementById("totalPrice");


    if (totalPrice) {

        totalPrice.textContent =
            "₦" + total.toLocaleString();

    }


    updateCartCount();
}


/* =========================================
   INCREASE CART ITEM
========================================= */

function increaseCartItem(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) return;


    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;


    saveCart();

    displayCart();
}


/* =========================================
   DECREASE CART ITEM
========================================= */

function decreaseCartItem(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) return;


    const currentQuantity =
        Number(cart[index].quantity) || 1;


    if (currentQuantity > 1) {

        cart[index].quantity =
            currentQuantity - 1;

    }


    saveCart();

    displayCart();
}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeCartItem(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    displayCart();
}


/* =========================================
   DISPLAY CHECKOUT ITEMS
========================================= */

function displayCheckoutItems() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;


    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    container.innerHTML = "";


    let subtotal = 0;


    /* EMPTY */

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="checkout-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <p>
                    Your shopping bag is empty.
                </p>

                <a href="index.html#collection">
                    SHOP NOW
                </a>

            </div>

        `;


        updateCheckoutTotals();

        return;
    }


    /* ITEMS */

    cart.forEach(item => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const div =
            document.createElement("div");


        div.className =
            "checkout-item";


        div.innerHTML = `

            <div class="checkout-item-info">

                <h3>
                    ${item.name || "Product"}
                </h3>


                ${
                    item.size
                    ? `
                        <span>
                            Size: ${item.size}
                        </span>
                    `
                    : ""
                }


                <span>
                    Quantity: ${quantity}
                </span>

            </div>


            <strong>
                ₦${itemTotal.toLocaleString()}
            </strong>

        `;


        container.appendChild(div);

    });


    updateCheckoutTotals();
}


/* =========================================
   CHECKOUT TOTALS
========================================= */

function updateCheckoutTotals() {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            (Number(item.price) || 0) *
            (Number(item.quantity) || 1);

    });


    const delivery =
        cart.length > 0
        ? STANDARD_DELIVERY
        : 0;


    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const deliveryElement =
        document.getElementById(
            "deliveryFee"
        );


    const totalElement =
        document.getElementById(
            "grandTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            "₦" + subtotal.toLocaleString();

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
            ? "Free"
            : "₦" + delivery.toLocaleString();

    }


    if (totalElement) {

        totalElement.textContent =
            "₦" + total.toLocaleString();

    }


    updateCartCount();
}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href =
        "login.html";
}


/* =========================================
   PAGE START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

        displayCheckoutItems();

    }
);