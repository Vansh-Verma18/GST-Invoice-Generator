# Testing Checklist

## Before Deployment Testing

### Functionality Tests

#### Homepage (/)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Gradient text renders properly
- [ ] Feature cards are visible
- [ ] "Start Creating Invoice" button works
- [ ] "Create Invoice Now" button works
- [ ] All links navigate correctly

#### Invoice Generator (/generator)
- [ ] Page loads without errors
- [ ] All form fields are editable
- [ ] Can enter invoice number and date
- [ ] Can enter business details (name, GSTIN, address)
- [ ] Can enter customer details (name, GSTIN, address)
- [ ] Can add product/service items
- [ ] Can remove product items (when more than 1)
- [ ] GST rate dropdown works (5%, 12%, 18%, 28%)
- [ ] Calculations update in real-time
- [ ] "Add Item" button works
- [ ] Invoice summary shows correct totals

#### About Page (/about)
- [ ] Page loads without errors
- [ ] All sections display correctly
- [ ] Links work properly
- [ ] Developer information is visible

### Calculation Tests

Test Case 1: Single Item
- Product: Web Development
- Quantity: 1
- Rate: ₹10,000
- GST: 18%
- Expected CGST: ₹900
- Expected SGST: ₹900
- Expected Total: ₹11,800

Test Case 2: Multiple Items
- Item 1: ₹10,000 @ 18% GST
- Item 2: ₹5,000 @ 12% GST
- Expected Subtotal: ₹15,000
- Expected Total CGST: ₹900 + ₹300 = ₹1,200
- Expected Total SGST: ₹900 + ₹300 = ₹1,200
- Expected Grand Total: ₹17,400

### PDF Generation Tests
- [ ] "Download Invoice PDF" button is enabled
- [ ] Clicking button downloads a PDF file
- [ ] PDF filename includes invoice number
- [ ] PDF contains all invoice details
- [ ] PDF has proper formatting
- [ ] PDF table displays all products
- [ ] PDF calculations match screen calculations
- [ ] PDF includes business details
- [ ] PDF includes customer details

### Mandatory Requirements Tests
- [ ] Button labeled "Built for Digital Heroes" exists in navigation
- [ ] Button links to https://digitalheroesco.com
- [ ] Full name "Vansh Sharma" is visible in footer
- [ ] Email "vanshsharma@example.com" is visible in footer
- [ ] Email is clickable (mailto link)
- [ ] Digital Heroes link also in footer

### Responsive Design Tests

#### Desktop (1920x1080)
- [ ] Navigation bar displays properly
- [ ] All content is readable
- [ ] Forms are properly aligned
- [ ] No horizontal scroll

#### Tablet (768x1024)
- [ ] Navigation adjusts correctly
- [ ] Forms stack appropriately
- [ ] Buttons are touch-friendly
- [ ] Text is readable

#### Mobile (375x667)
- [ ] Navigation is mobile-friendly
- [ ] Forms are usable
- [ ] All buttons are accessible
- [ ] No content overflow
- [ ] Touch targets are adequate

### UI/UX Tests
- [ ] Dark theme displays correctly
- [ ] Glassmorphism effects work
- [ ] Purple/blue gradients render properly
- [ ] Hover effects work on buttons
- [ ] Input fields have focus states
- [ ] Placeholders are visible
- [ ] Error states (if any) display correctly

### Cross-Browser Tests
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

## After Deployment Testing

### Vercel Deployment
- [ ] Site is accessible via Vercel URL
- [ ] All pages load correctly
- [ ] No 404 errors
- [ ] Static assets load
- [ ] PDF download works on live site
- [ ] No console errors in browser

### GitHub Repository
- [ ] Repository is public
- [ ] README is complete
- [ ] All files are committed
- [ ] .gitignore excludes node_modules
- [ ] Repository description is set

### Final Verification
- [ ] Test complete user flow: landing → generator → create invoice → download PDF
- [ ] Verify all mandatory requirements one final time
- [ ] Check mobile experience on real device
- [ ] Confirm no paid subscriptions were used
- [ ] Take screenshots for portfolio

## Common Issues & Solutions

**Issue**: npm install fails
- Run: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run: `npm install` again

**Issue**: Dev server won't start
- Check if port 3000 is already in use
- Run on different port: `npm run dev -- -p 3001`

**Issue**: PDF not downloading
- Check browser console for errors
- Ensure jspdf packages are installed
- Test in different browser

**Issue**: Styles not loading
- Restart dev server
- Clear browser cache
- Check tailwind.config.js paths

## Performance Checks
- [ ] Page load time < 3 seconds
- [ ] PDF generation < 2 seconds
- [ ] No unnecessary re-renders
- [ ] Images (if any) are optimized

## Accessibility Checks
- [ ] Proper heading hierarchy
- [ ] Form labels are associated
- [ ] Color contrast is adequate
- [ ] Keyboard navigation works
- [ ] Links have descriptive text
