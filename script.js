let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartText = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");

// Custom Notification Function (Alert ki jagah)
function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#e0336c" : "#4CAF50"; // Red for error, Green for success
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

function showCart() {
    let total = 0;
    cart.forEach(item => total += item.price);
    cartText.textContent = "Cart: " + cart.length + " | Rs. " + total;
    renderCart();
    updateCards();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function groupCart() {
    const counts = {};
    cart.forEach(item => {
        if (counts[item.name]) {
            counts[item.name].qty += 1;
        } else {
            counts[item.name] = { price: item.price, qty: 1 };
        }
    });
    return counts;
}

function renderCart() {
    cartItems.innerHTML = "";
    const counts = groupCart();
    let total = 0;

    for (const name in counts) {
        const lineTotal = counts[name].price * counts[name].qty;
        total += lineTotal;

        const row = document.createElement("p");
        row.textContent = `${counts[name].qty} x ${name} = Rs. ${lineTotal}`;
        cartItems.appendChild(row);
    }
    cartTotal.textContent = "Total: Rs. " + total;
}

function addOne(name, price) {
    cart.push({ name: name, price: price });
    saveCart();
    showCart();
}

function removeOne(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) cart.splice(index, 1);
    saveCart();
    showCart();
}

function updateCards() {
    const counts = groupCart();
    document.querySelectorAll(".product-card").forEach(card => {
        const addBtn = card.querySelector(".add-btn");
        const controls = card.querySelector(".qty-controls");
        const name = addBtn.dataset.name;

        let qty = counts[name] ? counts[name].qty : 0;
        card.querySelector(".qty").textContent = qty;

        if (qty > 0) {
            addBtn.classList.add("hidden");
            controls.classList.remove("hidden");
        } else {
            addBtn.classList.remove("hidden");
            controls.classList.add("hidden");
        }
    });
}

showCart();

document.getElementById("clear-btn").addEventListener("click", function () {
    cart = [];
    saveCart();
    showCart();
    showToast("Cart cleared!");
});

document.getElementById("order-btn").addEventListener("click", async function () {
    if (cart.length === 0) {
        showToast("Your cart is empty!", true);
        return;
    }

    const counts = groupCart();
    let orderItems = [];
    let message = "Hello Sweet Crumbs! I would like to order:\n";
    let total = 0;

    for (const name in counts) {
        const lineTotal = counts[name].price * counts[name].qty;
        orderItems.push({ name: name, qty: counts[name].qty });
        message += `- ${counts[name].qty} x ${name} (Rs. ${lineTotal})\n`;
        total += lineTotal;
    }

    message += `Total: Rs. ${total}`;
    
    const btn = this;
    btn.textContent = "Processing...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: orderItems })
        });

        const data = await response.json();

        if (response.ok) {
            showToast("Order sent to server successfully!");
            // Ab WhatsApp link open karein
            const url = "https://wa.me/923447550794?text=" + encodeURIComponent(message);
            window.open(url, "_blank");
            
            // Order confirm hone ke baad cart clear karein
            cart = [];
            saveCart();
            showCart();
        } else {
            showToast(data.message || "Failed to process order.", true);
        }
    } catch (error) {
        showToast("Server is not reachable. Please check your internet.", true);
    } finally {
        btn.textContent = "Send Order";
        btn.disabled = false;
    }
});
// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !isExpanded);
    });
}