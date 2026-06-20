# Setup Instructions

## Step 1: Personalize the Application

Before deploying, you need to update the application with your actual information.

### Update Your Name and Email

Replace the placeholder information in these files:

#### 1. app/layout.tsx (Footer section)
Find and replace:
- `Vansh Sharma` → Your full name
- `vanshsharma@example.com` → Your actual email address

#### 2. app/about/page.tsx (Developer Information section)
Find and replace:
- `Vansh Sharma` → Your full name
- `vanshsharma@example.com` → Your actual email address
- `github.com/yourusername` → Your actual GitHub profile URL

#### 3. README.md (Developer section)
Find and replace:
- `Vansh Sharma` → Your full name
- `vanshsharma@example.com` → Your actual email address
- `github.com/yourusername` → Your actual GitHub username/repo URL

## Step 2: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install:
- Next.js
- React
- TypeScript
- Tailwind CSS
- jsPDF and jsPDF-AutoTable

## Step 3: Test Locally

Start the development server:

```bash
npm run dev
```

Open your browser to `http://localhost:3000`

### Test the following:

1. **Homepage**: Check all sections load
2. **Generator Page**: 
   - Fill in all fields
   - Add multiple products
   - Verify calculations are correct
   - Download PDF and verify it looks good
3. **About Page**: Check information displays correctly
4. **Navigation**: Test all links work
5. **Responsive**: Resize browser to check mobile view
6. **Mandatory Elements**:
   - "Built for Digital Heroes" button in nav (links to digitalheroesco.com)
   - Your name in footer
   - Your email in footer (clickable mailto link)

## Step 4: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click "+" → "New repository"
3. Name it: `gst-invoice-generator`
4. Description: "Free online GST invoice generator with automatic CGST and SGST calculations"
5. Make it **Public** (mandatory requirement)
6. Do NOT initialize with README (we already have one)
7. Click "Create repository"

## Step 5: Push Code to GitHub

In your terminal, run these commands:

```bash
git init
git add .
git commit -m "Initial commit: GST Invoice Generator for Digital Heroes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gst-invoice-generator.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 6: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Sign in with your GitHub account (it's free)
4. Click "Add New" → "Project"
5. Import your `gst-invoice-generator` repository
6. Vercel will auto-detect Next.js settings - don't change anything
7. Click "Deploy"
8. Wait 2-3 minutes for deployment
9. Copy your live URL (looks like: `gst-invoice-generator-abc123.vercel.app`)

## Step 7: Verify Deployment

Visit your live Vercel URL and test:

- [ ] All pages load correctly
- [ ] Invoice generator works
- [ ] PDF downloads successfully
- [ ] "Built for Digital Heroes" button works and links correctly
- [ ] Your name and email are visible in footer
- [ ] Works on mobile (test on your phone)

## Step 8: Add to Your Portfolio

Use the information in `PORTFOLIO.md` to add this project to your portfolio website.

Include:
- Project title and description
- Live demo link (your Vercel URL)
- GitHub repository link
- Technologies used
- Screenshots (take screenshots of your deployed app)

## Step 9: Prepare Submission

Gather the following information:

1. **Live tool URL**: `https://your-app.vercel.app`
2. **GitHub repo**: `https://github.com/yourusername/gst-invoice-generator`
3. **Your full name**: [Your name]
4. **Your email**: [Your email]
5. **One-liner**: "GST Invoice Generator - I've used invoicing tools for freelance work but wanted something faster, simpler, and free without expensive subscriptions."
6. **Portfolio link**: [URL where you added this project]

## Troubleshooting

### Build fails on Vercel
- Check that all dependencies are in `dependencies`, not `devDependencies`
- Run `npm run build` locally first to catch errors
- Check Vercel logs for specific error messages

### PDF not downloading
- Ensure you're using HTTPS (not HTTP)
- Try a different browser
- Check browser console for errors

### Styles look broken
- Clear browser cache
- Check that Tailwind CSS is properly configured
- Restart dev server

### Port 3000 already in use
Run on a different port:
```bash
npm run dev -- -p 3001
```

## Important Reminders

✅ **Do NOT**:
- Buy any subscriptions
- Add credit card anywhere
- Use paid services
- Spend any money

✅ **Do**:
- Use free tiers only
- Replace placeholder email with your real email
- Make GitHub repo public
- Test everything before submitting
- Add to your portfolio

## Need Help?

If you encounter issues:
1. Check the `TESTING_CHECKLIST.md` file
2. Read the error messages carefully
3. Search the error on Google
4. Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
5. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)

## Verification Before Submission

Use this final checklist:

- [ ] Personal information updated (name, email)
- [ ] Tested locally - everything works
- [ ] Code pushed to public GitHub repo
- [ ] Deployed on Vercel (free tier)
- [ ] Live site tested - everything works
- [ ] "Built for Digital Heroes" button works
- [ ] Name and email visible on live site
- [ ] Added to portfolio
- [ ] ₹0 spent (no subscriptions purchased)
- [ ] Have all submission information ready

Good luck! 🚀
