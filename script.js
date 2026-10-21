
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Casual Sneakers",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Classic Backpack",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Sunglasses",
        category: "Accessories",
        price: 699,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Everyday Handbag",
        category: "Accessories",
        price: 1199,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartSection = document.getElementById("cartSection");

document.getElementById("year").textContent =
    new Date().getFullYear();

function displayProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function (product) {
        const matchesName = product.name.toLowerCase().includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    productList.innerHTML = "";

    document.getElementById("noProducts").classList.toggle(
        "hidden",
        filteredProducts.length > 0
    );

    filteredProducts.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";
        image.onerror = function () {
            image.style.display = "none";
        };

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("p");
        category.className = "category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "₹" + product.price.toLocaleString("en-IN");

        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", function () {
            addToCart(product.id);
        });

        info.append(category, name, price, addButton);
        card.append(image, info);
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = products.find(function (item) {
            return item.id === productId;
        });

        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(function (product) {
            return product.id !== productId;
        });
    }

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    document.getElementById("cartCount").textContent = totalQuantity;
    document.getElementById("cartTotal").textContent =
        totalPrice.toLocaleString("en-IN");

    cart.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("div");
        const itemName = document.createElement("p");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("strong");
        itemPrice.textContent =
            "₹" + (item.price * item.quantity).toLocaleString("en-IN");

        details.append(itemName, itemPrice);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minusButton = document.createElement("button");
        minusButton.textContent = "−";
        minusButton.setAttribute("aria-label", "Decrease quantity");
        minusButton.addEventListener("click", function () {
            changeQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.setAttribute("aria-label", "Increase quantity");
        plusButton.addEventListener("click", function () {
            changeQuantity(item.id, 1);
        });

        controls.append(minusButton, quantity, plusButton);
        row.append(details, controls);
        cartItems.appendChild(row);
    });
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

document.getElementById("cartButton").addEventListener("click", function () {
    cartSection.classList.toggle("hidden");

    if (!cartSection.classList.contains("hidden")) {
        cartSection.scrollIntoView({ behavior: "smooth" });
    }
});

document.getElementById("closeCart").addEventListener("click", function () {
    cartSection.classList.add("hidden");
});

document.getElementById("clearCart").addEventListener("click", function () {
    cart = [];
    displayCart();
});

document.getElementById("checkoutButton").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some products first.");
        return;
    }

    alert(
        "Demo checkout successful! Your total is ₹" +
        document.getElementById("cartTotal").textContent
    );

    cart = [];
    displayCart();
    cartSection.classList.add("hidden");
});

displayProducts();
displayCart();
