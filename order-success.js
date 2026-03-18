// Get order ID from URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

// Initialize success page
document.addEventListener('DOMContentLoaded', function() {
    displayOrderDetails();
    displayOrderItems();
});

// Display order details
function displayOrderDetails() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || {};

    document.getElementById('order-id').textContent = orderId || lastOrder.orderId || 'N/A';
    document.getElementById('order-amount').textContent = '₹' + (lastOrder.amount || '0.00');

    // Format date
    const orderDate = new Date(lastOrder.paymentTimestamp);
    const formattedDate = orderDate.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('order-time').textContent = formattedDate;
}

// Display order items
function displayOrderItems() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || {};
    const items = lastOrder.items || [];

    if (items.length === 0) {
        document.getElementById('order-items-section').style.display = 'none';
        return;
    }

    document.getElementById('order-items-section').style.display = 'block';
    const orderItemsDiv = document.getElementById('order-items');
    orderItemsDiv.innerHTML = '';

    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-qty">x${item.quantity}</span>
            <span class="item-price">₹${itemTotal.toFixed(2)}</span>
        `;
        orderItemsDiv.appendChild(orderItem);
    });
}

// Download invoice (simple text file for now)
function downloadInvoice() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || {};

    let invoiceText = 'PANDEY FURNITURES - ORDER INVOICE\n';
    invoiceText += '=====================================\n\n';
    invoiceText += `Order ID: ${orderId || lastOrder.orderId}\n`;
    invoiceText += `Date: ${new Date(lastOrder.paymentTimestamp).toLocaleString('en-IN')}\n`;
    invoiceText += `Customer: ${lastOrder.customerName || 'N/A'}\n`;
    invoiceText += `Email: ${lastOrder.email || 'N/A'}\n\n`;

    invoiceText += 'ITEMS:\n';
    invoiceText += '-----\n';
    (lastOrder.items || []).forEach(item => {
        invoiceText += `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });

    invoiceText += '\n-----\n';
    invoiceText += `Total: ₹${lastOrder.amount}\n`;
    invoiceText += `Payment Status: ${lastOrder.paymentStatus}\n\n`;

    invoiceText += 'SHIPPING ADDRESS:\n';
    invoiceText += `${lastOrder.shippingAddress.fullName}\n`;
    invoiceText += `${lastOrder.shippingAddress.address}\n`;
    invoiceText += `${lastOrder.shippingAddress.city}, ${lastOrder.shippingAddress.state} ${lastOrder.shippingAddress.postalCode}\n`;
    invoiceText += `Phone: ${lastOrder.shippingAddress.phone}\n\n`;

    invoiceText += 'Thank you for your purchase!\n';
    invoiceText += 'Contact: contact@pandeyfurnitures.in\n';

    // Create blob and download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceText));
    element.setAttribute('download', `Invoice-${orderId || lastOrder.orderId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    console.log('Invoice downloaded successfully');
}
