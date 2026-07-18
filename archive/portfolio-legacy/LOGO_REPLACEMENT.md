# Logo Replacement Guide

## Current Status
The portfolio currently uses **placeholder SVG logos** for Linio and Liverpool in the TrustSignals component.

## Files to Replace

### 1. Linio Logo
- **Current**: `/public/logos/linio.svg` (placeholder)
- **Location in code**: `components/TrustSignals.tsx`

### 2. Liverpool Logo
- **Current**: `/public/logos/liverpool.svg` (placeholder)
- **Location in code**: `components/TrustSignals.tsx`

## How to Replace

### Option A: SVG Format (Recommended)

1. **Get the logos**:
   - Request high-resolution logos from Linio and Liverpool
   - Or download from official brand guidelines
   - Ensure you have permission to use them

2. **Convert to SVG** (if needed):
   ```bash
   # If you have PNG/JPG, convert to SVG
   # Use online tool: https://convertio.co/png-svg/
   # Or use Inkscape/Adobe Illustrator
   ```

3. **Optimize SVG**:
   ```bash
   # Install SVGO
   npm install -g svgo
   
   # Optimize
   svgo linio-original.svg -o public/logos/linio.svg
   svgo liverpool-original.svg -o public/logos/liverpool.svg
   ```

4. **Replace files**:
   ```bash
   # Simply replace the files in /public/logos/
   cp your-linio-logo.svg public/logos/linio.svg
   cp your-liverpool-logo.svg public/logos/liverpool.svg
   ```

### Option B: WebP/PNG Format

If you only have raster images:

1. **Optimize images**:
   ```bash
   # Convert to WebP
   npx sharp-cli --input linio-logo.png --output public/logos/linio.webp --format webp --quality 90
   npx sharp-cli --input liverpool-logo.png --output public/logos/liverpool.webp --format webp --quality 90
   ```

2. **Update TrustSignals component**:
   ```typescript
   // In components/TrustSignals.tsx
   // Change from:
   logo: '/logos/linio.svg'
   // To:
   logo: '/logos/linio.webp'
   ```

## Logo Specifications

### Recommended Sizes
- **Width**: 120-200px
- **Height**: 40-80px (maintain aspect ratio)
- **Format**: SVG (preferred) or WebP
- **Color**: Grayscale or monochrome (component applies grayscale filter)

### Brand Guidelines
- **Linio**: Check [Linio Brand Guidelines](https://www.linio.com.mx/)
- **Liverpool**: Check [Liverpool Brand Guidelines](https://www.liverpool.com.mx/)

## Testing After Replacement

1. **Visual check**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Scroll to TrustSignals section
   ```

2. **Verify sizing**:
   - Logos should be similar size
   - Should fit within the card
   - Should look good in both light and dark mode

3. **Check performance**:
   ```bash
   npm run build
   # Verify bundle size hasn't increased significantly
   ```

## Commit Changes

```bash
# Add new logos
git add public/logos/

# Commit
git commit -m "feat: replace placeholder logos with official brand assets"

# Push
git push
```

## Alternative: Keep Placeholders

If you don't have access to official logos yet:

1. **Use company names instead**:
   - Update `TrustSignals.tsx` to show text instead of images
   - Example: "Linio México" and "Servicios Liverpool"

2. **Use generic icons**:
   - Use building/company icons from a library
   - Example: Heroicons, Lucide Icons

## Dark Mode Considerations

The current implementation applies a grayscale filter that transitions to full color on hover:

```css
filter: grayscale(100%)
hover: filter: grayscale(0%)
```

This works well with:
- ✅ Colored logos (will show color on hover)
- ✅ Monochrome logos (will remain consistent)
- ⚠️ White logos (may be invisible in light mode)

If you have white logos, update the CSS in `TrustSignals.tsx`:

```typescript
className="filter-none dark:filter-invert"
```

## Need Help?

If you encounter issues:
1. Check image format is supported (SVG, WebP, PNG, JPG)
2. Verify file paths are correct
3. Check file permissions
4. Clear Next.js cache: `rm -rf .next`
5. Rebuild: `npm run build`

---

**Quick Checklist:**
- [ ] Obtained official logos
- [ ] Converted to SVG or WebP
- [ ] Optimized file size
- [ ] Replaced files in `/public/logos/`
- [ ] Tested in browser
- [ ] Checked both light and dark mode
- [ ] Committed and pushed changes
- [ ] Verified on deployed site
