# Deployment Guide

## Deploy to Vercel (Free)

### Step 1: Push to GitHub

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial commit - GST Invoice Generator"
```

2. Create a new repository on GitHub (public)

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/gst-invoice-generator.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account (free)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment to complete
8. Your app is live! Copy the URL (format: `yourapp.vercel.app`)

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

## Testing Before Deployment

Run locally to test:
```bash
npm install
npm run dev
```

Open http://localhost:3000 and test:
- ✓ All pages load (Home, Generator, About)
- ✓ Invoice form accepts input
- ✓ Calculations are correct
- ✓ PDF downloads successfully
- ✓ "Built for Digital Heroes" button links to digitalheroesco.com
- ✓ Name and email are visible in footer
- ✓ Responsive on mobile

## Troubleshooting

**Issue**: Build fails on Vercel
- Solution: Check package.json dependencies are correct
- Ensure all imports are valid
- Check for TypeScript errors locally first

**Issue**: PDF not generating
- Solution: Ensure jspdf and jspdf-autotable are in dependencies (not devDependencies)

**Issue**: Styling looks broken
- Solution: Ensure tailwind.config.js includes all content paths
- Check postcss.config.js is present

## Post-Deployment Checklist

- [ ] Live URL works
- [ ] All pages load correctly
- [ ] Invoice generation works
- [ ] PDF download works
- [ ] "Built for Digital Heroes" button works
- [ ] Name and email visible
- [ ] Mobile responsive
- [ ] GitHub repo is public
- [ ] README is updated with live URL

## Submission

Submit the following:
1. Live tool URL (Vercel): `https://yourapp.vercel.app`
2. GitHub repo link (public): `https://github.com/yourusername/gst-invoice-generator`
3. Full name: Vansh Sharma
4. Email: vanshsharma@example.com
5. One-liner: GST Invoice Generator - I've used similar tools for freelance invoicing but wanted something faster and free
6. Portfolio link showing this project
