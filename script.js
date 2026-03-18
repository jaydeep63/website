// Sample products for the hardware shop
const products = [
    {
        id: 1,
        name: "Wood Treatment Polish",
        description: "Premium wood polish for furniture",
        price: 299.99,
        emoji: "🧴"
    },
    {
        id: 2,
        name: "Stainless Steel Handles",
        description: "Modern cabinet and drawer handles",
        price: 149.99,
        emoji: "🔧"
    },
    {
        id: 3,
        name: "Wood Screws Set",
        description: "High-quality assorted wood screws",
        price: 199.99,
        emoji: "🪛"
    },
    {
        id: 4,
        name: "Hinges Collection",
        description: "Heavy-duty furniture hinges",
        price: 249.99,
        emoji: "⚙️"
    },
    {
        id: 5,
        name: "Sandpaper Assortment",
        description: "Various grit sizes for wood finishing",
        price: 129.99,
        emoji: "📄"
    },
    {
        id: 6,
        name: "Wood Glue",
        description: "Professional-grade wood adhesive",
        price: 179.99,
        emoji: "🧴"
    },
    {
        id: 7,
        name: "Furniture Paint",
        description: "Durable furniture enamel paint",
        price: 349.99,
        emoji: "🎨"
    },
    {
        id: 8,
        name: "Drawer Slides",
        description: "Smooth-operating metal drawer slides",
        price: 289.99,
        emoji: "📦"
    },
    {
        id: 9,
        name: "Wood Stain",
        description: "Rich color wood stain for finishing",
        price: 219.99,
        emoji: "🎭"
    },
    {
        id: 10,
        name: "Furniture Feet",
        description: "Modern furniture leg replacements",
        price: 159.99,
        emoji: "🦶"
    },
    {
        id: 11,
        name: "Nails Assortment",
        description: "Mixed size finishing and framing nails",
        price: 99.99,
        emoji: "📍"
    },
    {
        id: 12,
        name: "Veneer Sheet",
        description: "Premium wood veneer for furniture",
        price: 399.99,
        emoji: "📜"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
});

// Display products on the page
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <div class="product-quantity">
                    <label for="qty-${product.id}">Qty:</label>
                    <input
                        type="number"
                        id="qty-${product.id}"
                        class="quantity-input"
                        value="1"
                        min="1"
                        max="100"
                    >
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    const product = products.find(p => p.id === productId);

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();

    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Update cart display in sidebar
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPriceSpan.textContent = '0.00';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }

    document.querySelector('.checkout-btn').disabled = false;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                <div class="cart-item-quantity">Subtotal: ₹${itemTotal.toFixed(2)}</div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    totalPriceSpan.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');

    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Store cart data in sessionStorage for checkout page
    sessionStorage.setItem('checkoutCart', JSON.stringify(cart));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Show notification
function showNotification(message) {
    // Create a temporary notification (you can enhance this later)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
