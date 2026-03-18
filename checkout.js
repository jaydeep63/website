// Load cart from sessionStorage
let checkoutCart = JSON.parse(sessionStorage.getItem('checkoutCart')) || [];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    if (checkoutCart.length === 0) {
        alert('Your cart is empty! Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    displayOrderSummary();
    calculateTotals();
});

// Display order summary
function displayOrderSummary() {
    const summaryItemsDiv = document.getElementById('summary-items');
    summaryItemsDiv.innerHTML = '';

    checkoutCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <div>
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">₹${itemTotal.toFixed(2)}</div>
        `;
        summaryItemsDiv.appendChild(summaryItem);
    });
}

// Calculate totals
function calculateTotals() {
    let subtotal = checkoutCart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Calculate shipping based on subtotal
    let shipping = 0;
    if (subtotal < 500) {
        shipping = 50;
    } else if (subtotal < 1000) {
        shipping = 70;
    } else if (subtotal < 5000) {
        shipping = 100;
    } else if (subtotal < 10000) {
        shipping = 150;
    }
    // Free shipping for orders above ₹10,000

    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = '₹' + subtotal.toFixed(2);
    document.getElementById('shipping').textContent = '₹' + shipping.toFixed(2);
    document.getElementById('grand-total').textContent = '₹' + total.toFixed(2);
}

// Handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('checkout-form'));
    const checkoutData = {
        customer: {
            fullName: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            postalCode: formData.get('postal_code')
        },
        paymentMethod: formData.get('payment_method'),
        cart: checkoutCart,
        subtotal: getSubtotal(),
        shipping: getShipping(),
        total: getTotal(),
        timestamp: new Date().toISOString(),
        orderId: generateOrderId()
    };

    // Store checkout data in sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // Redirect to payment gateway
    redirectToPaymentGateway(checkoutData);
}

// Get subtotal
function getSubtotal() {
    const subtotalText = document.getElementById('subtotal').textContent;
    return parseFloat(subtotalText.replace('₹', ''));
}

// Get shipping cost
function getShipping() {
    const shippingText = document.getElementById('shipping').textContent;
    return parseFloat(shippingText.replace('₹', ''));
}

// Get total
function getTotal() {
    const totalText = document.getElementById('grand-total').textContent;
    return parseFloat(totalText.replace('₹', ''));
}

// Generate unique order ID
function generateOrderId() {
    return 'PF' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Redirect to payment gateway
function redirectToPaymentGateway(checkoutData) {
    // Create query parameters from checkout data
    const params = new URLSearchParams({
        orderId: checkoutData.orderId,
        amount: checkoutData.total,
        email: checkoutData.customer.email,
        phone: checkoutData.customer.phone,
        customerName: checkoutData.customer.fullName
    });

    // Redirect to payment gateway page with parameters
    window.location.href = `payment-gateway.html?${params.toString()}`;
}
