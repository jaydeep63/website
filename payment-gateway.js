// Get payment parameters from URL
const urlParams = new URLSearchParams(window.location.search);

// Initialize payment page
document.addEventListener('DOMContentLoaded', function() {
    displayPaymentDetails();
});

// Display payment details
function displayPaymentDetails() {
    document.getElementById('order-id').textContent = urlParams.get('orderId') || 'N/A';
    document.getElementById('customer-name').textContent = urlParams.get('customerName') || 'Guest';
    document.getElementById('customer-email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('payment-amount').textContent = '₹' + (urlParams.get('amount') || '0.00');
}

// Simulate payment success (for demo purposes)
function simulatePaymentSuccess() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '⏳ Processing...';
    btn.disabled = true;

    // Simulate payment processing delay
    setTimeout(() => {
        // Get order details from sessionStorage
        const checkoutData = JSON.parse(sessionStorage.getItem('checkoutData')) || {};

        // Create order confirmation data
        const orderConfirmation = {
            orderId: urlParams.get('orderId'),
            customerName: urlParams.get('customerName'),
            email: urlParams.get('email'),
            amount: urlParams.get('amount'),
            paymentStatus: 'SUCCESS',
            paymentTimestamp: new Date().toISOString(),
            items: checkoutData.cart || [],
            shippingAddress: checkoutData.customer || {}
        };

        // Store order confirmation
        localStorage.setItem('lastOrder', JSON.stringify(orderConfirmation));

        // Clear cart and checkout data
        localStorage.removeItem('cart');
        sessionStorage.removeItem('checkoutCart');
        sessionStorage.removeItem('checkoutData');

        // Redirect to success page
        window.location.href = `order-success.html?orderId=${urlParams.get('orderId')}`;
    }, 2000);
}

/**
 * CONFIGURATION GUIDE FOR PAYMENT GATEWAYS
 *
 * To integrate a real payment gateway, follow these steps:
 *
 * 1. RAZORPAY (Recommended for India):
 *    - Sign up at https://razorpay.com
 *    - Get your API Key from dashboard
 *    - Install Razorpay script: <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
 *    - Example integration:
 *
 *    function initializeRazorpay() {
 *        const options = {
 *            key: 'your_razorpay_key_id',
 *            amount: amount_in_paise,
 *            currency: 'INR',
 *            name: 'Pandey Furnitures',
 *            description: 'Hardware & Furniture Store',
 *            order_id: orderId,
 *            handler: function(response) {
 *                verifyPayment(response.razorpay_payment_id);
 *            }
 *        };
 *        const rzp1 = new Razorpay(options);
 *        rzp1.open();
 *    }
 *
 * 2. PAYU:
 *    - Sign up at https://www.payumoney.com
 *    - Get Merchant Key and Salt
 *    - Generate hash: SHA512(key|txnid|amount|productinfo|firstname|email|salt)
 *
 * 3. STRIPE (International):
 *    - Sign up at https://stripe.com
 *    - Use Stripe.js library
 *    - Handle payments server-side for security
 *
 * 4. INSTAMOJO:
 *    - Sign up at https://www.instamojo.com
 *    - Get API credentials
 *    - Create payment request and redirect to Instamojo
 *
 * BACKEND REQUIREMENT:
 *    - Always verify payments on your server
 *    - Never trust client-side payment confirmation
 *    - Store payment transaction details securely
 *    - Send order confirmation emails
 *
 * For more help: contact@pandeyfurnitures.in
 */
