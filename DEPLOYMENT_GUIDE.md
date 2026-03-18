# 🚀 Quick Start & Deployment Guide

## ⚡ Quick Start (Local Testing)

### Step 1: Open the Website Locally
```bash
# Navigate to the project directory
cd /workspaces/website

# Open index.html in your default browser (on Linux)
xdg-open index.html

# Or use Python to serve it (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### Step 2: Test Functionality
1. **Browse Products**: Scroll through the product catalog
2. **Add to Cart**: Click "Add to Cart" with quantities
3. **View Cart**: Click the cart button in navigation
4. **Checkout**: Fill the checkout form and proceed
5. **Payment**: Click "Simulate Payment Success" for demo
6. **Confirm**: View order confirmation page

## 🌐 Deploy to Your Domain (pandeyfurnitures.in)

### Step 1: Choose Your Hosting

#### 🥇 Recommended: Shared Hosting for .in Domains
- **Providers**: HostingRaja, Bluehost India, GoDaddy, Hostinger
- **Cost**: ₹200-500/month
- **Best for**: Beginners, established businesses
- **Includes**: Free SSL, Email, Backups

#### 🟢 Alternative: Netlify (Free for Static Sites)
- **Cost**: Free with basic features
- **Setup**: 5 minutes with GitHub
- **Best for**: Quick launch, no backend

#### 🟦 Alternative: Vercel (Free for Static Sites)
- **Cost**: Free tier available
- **Setup**: Very easy
- **Best for**: Fast performance, modern deployment

---

## 📝 Method 1: Deploy via Shared Hosting (Easiest)

### 1. Purchase Hosting
- Visit HostingRaja.in, Bluehost.com, or similar
- Select a plan with your domain
- Complete purchase and setup

### 2. Access cPanel
- Hosting provider sends login details
- Visit: `https://your-domain.com:2083`
- Login with provided credentials

### 3. Upload Files (Via cPanel File Manager)
1. In cPanel, find "File Manager"
2. Navigate to `public_html` folder
3. Click "Upload"
4. Select all files from your project:
   - `index.html`
   - `checkout.html`
   - `payment-gateway.html`
   - `order-success.html`
   - `styles.css`
   - `checkout-styles.css`
   - `script.js`
   - `checkout.js`
   - `payment-gateway.js`
   - `order-success.js`

### 4. Verify Domain DNS
- Make sure domain nameservers point to your hosting
- Usually done automatically if purchased together

### 5. Test Your Website
- Visit `https://pandeyfurnitures.in`
- Test all features (add to cart, checkout, etc.)
- Check SSL certificate (green padlock)

#### Common Webhost Instructions:
- **HostingRaja**: Use FTP or File Manager → Upload to public_html
- **Bluehost**: Use File Manager → public_html folder
- **Hostinger**: Use File Manager → Upload files
- **GoDaddy**: Use File Manager → htdocs folder

---

## 🔧 Method 2: Deploy via Netlify (Fastest)

### 1. Push to GitHub
```bash
cd /workspaces/website
git add .
git commit -m "Pandey Furnitures - Initial deployment"
git push origin main
```

### 2. Connect to Netlify
1. Visit [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Netlify to access your repos
5. Select this repository
6. Netlify auto-deploys with each push!

### 3. Add Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `pandeyfurnitures.in`
4. Follow instructions to update DNS:
   - Go to your domain registrar
   - Update nameservers to Netlify's nameservers
   - Wait 24-48 hours for DNS propagation

### 4. Enable SSL (Automatic)
- Netlify auto-generates SSL certificate
- Your site is now on HTTPS!

---

## ⚙️ Method 3: Deploy via Vercel

### 1. Deploy with Vercel CLI
```bash
npm install -g vercel
cd /workspaces/website
vercel deploy
```

### 2. Add Custom Domain
1. In Vercel dashboard, go to Settings
2. Add `pandeyfurnitures.in`
3. Follow DNS configuration
4. Done! SSL is automatic

---

## 🔒 After Deployment

### 1. Update Contact Information
Edit `index.html` and add your actual details:
```html
<p>Email: your-email@pandeyfurnitures.in | Phone: +91-XXXXXXXXXX</p>
```

### 2. Configure Payment Gateway
Edit `payment-gateway.js` to integrate real payments:
- Sign up for Razorpay/PayU
- Add API credentials
- Replace demo payment handler

### 3. Test Payment Flow
1. Add product to cart
2. Proceed to checkout
3. Fill customer details
4. Click "Proceed to Payment"
5. Complete payment (or test in demo mode)

### 4. Set Up Email Notifications (Optional)
You'll need a backend service. Options:
- Firebase Functions (free tier)
- AWS Lambda
- Supabase
- Your own Node.js/PHP backend

---

## 🎨 Customization Checklist

- [ ] Update business name throughout
- [ ] Add actual phone number
- [ ] Set up email address
- [ ] Modify product list (add your items)
- [ ] Change primary color (if needed)
- [ ] Add business logo (if available)
- [ ] Update shipping address
- [ ] Configure payment gateway
- [ ] Set up SSL certificate
- [ ] Test on mobile devices

---

## 🛠️ Common Issues & Solutions

### Issue: Files Uploaded but Site Shows Blank
**Solution**:
- Ensure files are in `public_html` folder
- Clear browser cache (Ctrl+Shift+Del)
- Wait 5 minutes for server to process
- Check for file permission issues (chmod 644)

### Issue: Cart/Data Not Saving
**Solution**:
- Check if JavaScript is enabled in browser
- Clear localStorage: Open DevTools → Application → Clear
- Try in incognito/private mode
- Check browser console for errors (F12)

### Issue: Domain Not Redirecting
**Solution**:
- DNS changes take 24-48 hours
- Verify nameservers are correct at registrar
- Try accessing via IP address (if provided by host)
- Contact hosting support if still not working

### Issue: "Not Secure" Warning
**Solution**:
- Ensure SSL is enabled on hosting
- Use HTTPS:// in URL
- May take 24 hours for SSL to fully activate
- Try clearing browser cache

---

## 📞 Getting Help

### If you need help:

1. **Hosting Issues**: Contact hosting provider support
2. **Domain Issues**: Contact domain registrar
3. **Code Issues**: Check browser console (F12)
4. **Deployment Help**:
   - Netlify Support: support@netlify.com
   - Vercel Support: help@vercel.com

### For Payment Gateway Integration help, refer to:
- Razorpay: https://razorpay.com/docs
- PayU: https://payu.in/support
- CCAvenue: https://www.ccavenue.com/contact-us.html

---

## 📊 File Sizes & Performance

All files are lightweight and static:
- HTML files: ~2-5 KB each
- CSS files: ~15 KB combined
- JavaScript files: ~5 KB combined
- **Total**: ~30 KB (very fast loading)

This means:
- ✅ Instant loading times
- ✅ Works on slow internet
- ✅ Mobile-friendly
- ✅ Excellent SEO

---

## 🎯 Next Steps After Launch

1. **Monitor Traffic**: Set up Google Analytics
2. **Collect Feedback**: Ask customers for reviews
3. **Add Products**: Keep catalog updated
4. **Promote**: Share on social media
5. **Improve**: Add features based on feedback

---

## 💡 Advanced Features (Optional)

Want to add more features later?
- Product search functionality
- Wishlist feature
- Customer reviews
- Discount codes
- Admin dashboard
- Email notifications
- SMS notifications

---

**Your website is ready to launch! 🎉**

For questions: contact@pandeyfurnitures.in

**Happy selling!** 🛍️
