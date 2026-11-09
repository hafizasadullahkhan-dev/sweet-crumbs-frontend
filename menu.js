// menuGrid yahan define karna zaroori hai
const menuGrid = document.querySelector("#menu-grid");

// API_BASE_URL config.js se aa raha hai
const API_URL = `${API_BASE_URL}/menu`;

async function loadMenu() {
    try {
        if (!menuGrid) return;
        menuGrid.innerHTML = '<p class="loading">Loading menu...</p>';

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const items = await res.json(); // Backend direct array bhej raha hai

        if (!Array.isArray(items)) throw new Error("Invalid menu data");
        displayMenu(items);
    } catch (err) {
        console.error("Menu loading error:", err);
        if (menuGrid) {
            menuGrid.innerHTML = '<p class="error">Sorry! Menu could not be loaded. Please refresh or try again later.</p>';
        }
    }
}

function displayMenu(items) {
    menuGrid.innerHTML = "";
    if (items.length === 0) {
        menuGrid.innerHTML = '<p class="empty">No menu items available.</p>';
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";

        const h3 = document.createElement("h3");
        h3.textContent = item.name;

        const desc = document.createElement("p");
        desc.textContent = item.description;

        const size = document.createElement("p");
        size.className = "size";
        size.textContent = item.size || "";

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `Rs. ${item.price}`;

        const addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.type = "button";
        addBtn.textContent = "Add to Cart";
        addBtn.dataset.name = item.name;
        addBtn.addEventListener("click", () => addOne(item.name, Number(item.price)));

        const controls = document.createElement("div");
        controls.className = "qty-controls hidden";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", `Remove one ${item.name}`);
        minus.addEventListener("click", () => removeOne(item.name));

        const qty = document.createElement("span");
        qty.className = "qty";
        qty.textContent = "0";

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", `Add one ${item.name}`);
        plus.addEventListener("click", () => addOne(item.name, Number(item.price)));

        controls.append(minus, qty, plus);
        card.append(img, h3, desc, size, price, addBtn, controls);
        menuGrid.appendChild(card);
    });

    updateCards();
}

// Start the app
loadMenu();