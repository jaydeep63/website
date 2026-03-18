# Pandey Furnitures - Hardware Shop Website

A fully interactive, responsive hardware shop website built with HTML, CSS, and JavaScript.

## 🌐 Live Demo
This website is ready to be deployed to your domain: **pandeyfurnitures.in**

## ✨ Features

### 🛍️ Product Catalog
- **12 Pre-configured Hardware Products** (easily customizable)
- Product images with emojis (can be replaced with actual images)
- Detailed product descriptions
- Real-time pricing display

### 🛒 Shopping Cart
- **Add to Cart** functionality with quantity selection
- **Remove from Cart** options
- Cart persists in browser using localStorage
- Real-time cart count in navigation
- Responsive cart sidebar

### 📦 Checkout System
- **Customer Information Form** with validation:
  - Full name, email, phone
  - Complete shipping address
  - City, state, postal code
- **Shipping Cost Calculation**:
  - Order < ₹500: ₹50
  - ₹500-₹1000: ₹70
  - ₹1000-₹5000: ₹100
  - ₹5000-₹10000: ₹150
  - Free shipping for orders > ₹10,000
- **Payment Method Selection**:
  - Credit/Debit Card
  - UPI
  - Net Banking
  - Digital Wallet

### 💳 Payment Gateway Integration
- **Placeholder with Configuration Guide** for multiple gateways:
  - Razorpay (Recommended for India)
  - PayU
  - CCAvenue
  - Instamojo
- **Demo Mode** with "Simulate Payment Success" button
- Sample payment gateway integration code with comments

### ✅ Order Confirmation
- **Order Success Page** with complete order details
- **Unique Order IDs** generated for each order
- **Invoice Download** functionality
- Order history tracking

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet optimization
- Desktop full experience
- Touch-friendly buttons

## 📁 File Structure

```
/workspaces/website/
├── index.html                 # Main homepage
├── checkout.html              # Checkout page
├── payment-gateway.html       # Payment gateway placeholder
├── order-success.html         # Order confirmation page
├── styles.css                 # Main stylesheet
├── checkout-styles.css        # Checkout page stylesheet
├── script.js                  # Main functionality
├── checkout.js                # Checkout logic
├── payment-gateway.js         # Payment gateway logic
├── order-success.js           # Order confirmation logic
└── README.md                  # This file
```

## 🚀 Deployment to pandeyfurnitures.in

### Option 1: Deploy to Shared Hosting (Recommended for .in domains)

#### Using Bluehost, HostingRaja, or Similar Providers:

1. **Upload Files**:
   - Connect via FTP using FileZilla or similar
   - Upload all files to `public_html` folder
   - Or use cPanel File Manager

2. **DNS Configuration**:
   - Point your domain nameservers to the hosting provider
   - Or update DNS records if using external DNS
   - Wait 24-48 hours for propagation

3. **Verify**:
   - Visit `https://pandeyfurnitures.in`
   - Check SSL certificate is active
   - Test all functionality

### Option 2: Deploy to Netlify (Free & Easy)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Pandey Furnitures website"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to netlify.com
   - Connect your GitHub repo
   - Deploy automatically

3. **Add Custom Domain**:
   - In Netlify dashboard: Settings → Domain Management
   - Add `pandeyfurnitures.in`
   - Update DNS records to point to Netlify nameservers

### Option 3: Deploy to Vercel

1. **Push to GitHub**
2. **Use Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel deploy
   ```
3. **Add custom domain** in Vercel dashboard

### Option 4: Deploy to Your Own Server (cPanel/Linux)

1. **SSH into your server**:
   ```bash
   ssh user@your-server.com
   ```

2. **Upload files**:
   ```bash
   scp -r ./* user@your-server.com:/public_html/
   ```

3. **Verify permissions**:
   ```bash
   chmod 755 /public_html
   chmod 644 /public_html/*.html
   chmod 644 /public_html/*.css
   chmod 644 /public_html/*.js
   ```

## ⚙️ Customization Guide

### Change Business Information
Edit the following files and replace placeholders:

**index.html**:
- Update phone number: `+91-XXXXXXXXXX`
- Update email: `contact@pandeyfurnitures.in`

**All files**:
- Replace `Pandey Furnitures` with your business name
- Replace `🏪` emoji with your preferred emoji

### Add/Edit Products
Edit `script.js` in the `products` array:

```javascript
{
    id: 1,
    name: "Product Name",
    description: "Product description",
    price: 299.99,
    emoji: "🧴"
}
```

### Change Colors
Edit `styles.css` root variables:

```css
:root {
    --primary-color: #d4532f;      /* Main color */
    --secondary-color: #f5a623;    /* Secondary color */
    --dark-color: #2c3e50;         /* Dark background */
    --light-color: #ecf0f1;        /* Light background */
}
```

### Add Product Images
Replace emoji with actual images in `script.js`:

```javascript
// Instead of:
<div class="product-image">${product.emoji}</div>

// Use:
<img src="path/to/image.jpg" alt="${product.name}" class="product-image">
```

And add to CSS:
```css
.product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
```

## 💳 Configuring Real Payment Gateway

### For Razorpay (Recommended):

1. **Sign up**: https://razorpay.com
2. **Get API Keys**: Dashboard → API Keys
3. **Add to payment-gateway.html**:

```javascript
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

function initializeRazorpay() {
    const options = {
        key: 'YOUR_KEY_ID',
        amount: amount_in_paise,
        currency: 'INR',
        name: 'Pandey Furnitures',
        handler: function(response) {
            verifyPayment(response.razorpay_payment_id);
        }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}
```

For other gateways, see detailed integration code in `payment-gateway.js` comments.

## 📧 Email Notifications

To send order confirmation emails, you'll need:

1. **Backend Service** (Node.js, PHP, Python):
   - Receive order data from checkout
   - Send email via SMTP or SendGrid
   - Update order status

2. **Alternative**: Use Firebase or Supabase for serverless backend

3. **Email Service**: SendGrid, Mailgun, or AWS SES

## 🔒 Security Checklist

- [ ] Enable HTTPS/SSL certificate (automatic on Netlify/Vercel)
- [ ] Add CORS headers if using external API
- [ ] Validate form input on server-side
- [ ] Never store payment details in localStorage
- [ ] Use environment variables for API keys
- [ ] Implement rate limiting for API requests
- [ ] Regular security updates

## 🐛 Troubleshooting

### Cart not persisting?
- Check if localStorage is enabled in browser
- Clear browser cache and try again

### Payment not processing?
- Ensure payment gateway API is configured
- Check browser console for errors (F12)
- Verify API keys are correct

### Domain not loading?
- Wait 48 hours for DNS propagation
- Check DNS records are correct
- Verify SSL certificate is installed

## 📞 Support & Maintenance

### Regular Updates Needed:
- Update product inventory
- Adjust pricing
- Add new hardware items
- Monitor payment transactions

### Recommended Additives:
- Admin dashboard for order management
- Product inventory system
- Customer reviews
- Wishlist functionality
- Multi-language support

## 📊 Analytics & Tracking

Add Google Analytics:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

## 📝 License

This website is created for Pandey Furnitures. All rights reserved.

## 🎯 Next Steps

1. **Test Locally**: Open `index.html` in your browser
2. **Deploy**: Choose deployment option above
3. **Configure Payment**: Integrate real payment gateway
4. **Add Products**: Customize product list
5. **Launch**: Go live on pandeyfurnitures.in

---

**Questions?** Email: contact@pandeyfurnitures.in

**Last Updated**: March 18, 2026