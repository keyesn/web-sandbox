# Color Theory for Web App Design

Understanding how to choose and organize colors in web applications effectively.

## What Makes a Good Color Scheme?

A good color scheme:

- **Readable** - Text has sufficient contrast against backgrounds
- **Semantic** - Colors convey meaning (red = error, green = success)
- **Accessible** - Works for colorblind users and screen readers
- **Maintainable** - Clear naming makes future changes easy
- **Consistent** - Same colors used for same purposes throughout

---

## Core Color Concepts

### 1. **Contrast Ratio**

Contrast is the difference in brightness between text and background. It directly affects readability.

**WCAG Standards:**

- **AA (acceptable)**: 4.5:1 for body text, 3:1 for large text
- **AAA (enhanced)**: 7:1 for body text, 4.5:1 for large text

**Example:**

```text
Light text (#e8e8e8) on dark background (#0a0a0a) = High contrast ✅
Light text (#e8e8e8) on light background (#f5f5f5) = Low contrast ❌
```

**Rule of thumb:** Dark backgrounds need light text, light backgrounds need dark text.

### 2. **Semantic Colors**

Semantic colors **convey meaning** without words. Users expect:

| Color      | Meaning             | Use Case                                   |
| ---------- | ------------------- | ------------------------------------------ |
| **Blue**   | Primary/information | Main buttons, links, navigation            |
| **Green**  | Success/safe        | Checkmarks, success messages, "OK" buttons |
| **Red**    | Error/danger        | Error messages, delete buttons, alerts     |
| **Orange** | Warning/caution     | Warnings, confirmations, temporary alerts  |
| **Gray**   | Neutral/secondary   | Secondary text, disabled buttons, dividers |

**Example:**

```javascript
// Good: Colors match expected meaning
--color-primary: #4a9eff;    // Blue for actions
--color-success: #51cf66;    // Green for success
--color-accent: #ff6b6b;     // Red for errors
```

### 3. **Color Naming**

Poor naming makes code unmaintainable:

```css
/* ❌ Bad: What do these colors mean? */
--color1: #5fffff;
--color2: #ff87af;
--color3: #87ff87;

/* ✅ Good: Semantic names explain purpose */
--color-primary: #4a9eff;      // Used for main actions
--color-accent: #ff6b6b;       // Used for alerts/errors
--color-success: #51cf66;      // Used for success states
```

Semantic names make code self-documenting. Anyone reading `color-primary` immediately understands it's for main UI actions.

---

## The Monochromatic Approach (WebSandbox)

WebSandbox uses a **simplified monochromatic approach** with semantic base colors:

### Base Colors

```css
--color-primary: #4a9eff;        /* Primary action color (blue) */
--color-accent: #ff6b6b;         /* Accent/alerts (red) */
--color-success: #51cf66;        /* Success state (green) */
--color-warning: #ffa94d;        /* Warning state (orange) */
--color-neutral: #666;           /* Neutral/secondary text */
```

### Theme Layering

Themes (dark/light) then **layer these base colors** with semantic use:

```css
/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: #0a0a0a;         /* Main background */
  --bg-secondary: #1a1a1a;       /* Cards, panels */
  --text-primary: #e8e8e8;       /* Main text */
  --text-secondary: #b0b0b0;     /* Secondary text */
  --border-color: #333;          /* Borders */
}

/* Light Mode */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666;
  --border-color: #ddd;
}
```

**Benefits:**

- ✅ Only 5 base colors + 5 theme colors = 10 variables total
- ✅ Easy to maintain and modify
- ✅ Clear purpose for each color
- ✅ Scales to both dark and light themes

---

## Color Psychology

Colors evoke **emotional responses**. Use them strategically:

### Blue

- **Feels**: Calm, professional, trustworthy
- **Use for**: Primary actions, links, navigation
- **Avoid**: Don't overuse on dark backgrounds (hard to read)

### Green

- **Feels**: Safe, positive, growth
- **Use for**: Success messages, confirmations, "go" actions
- **Note**: ~8% of men are colorblind to red-green; use icons too

### Red

- **Feels**: Urgent, dangerous, attention-needed
- **Use for**: Errors, alerts, destructive actions
- **Caution**: Can feel aggressive; don't use for neutral information

### Orange

- **Feels**: Warmth, caution, energy
- **Use for**: Warnings, secondary actions
- **Good for**: Less alarming than red, more noticeable than yellow

### Gray

- **Feels**: Neutral, disabled, secondary
- **Use for**: Secondary text, inactive buttons, borders
- **Tip**: Never use pure gray (#808080); adjust by theme

---

## Contrast Checklist

Before deploying colors, verify contrast:

### Light Text on Dark Background

```css
text-primary (#e8e8e8) on bg-primary (#0a0a0a)
Contrast: 14.5:1 ✅ Excellent

text-secondary (#b0b0b0) on bg-primary (#0a0a0a)
Contrast: 7.1:1 ✅ Good
```

### Dark Text on Light Background

```css
text-primary (#1a1a1a) on bg-primary (#ffffff)
Contrast: 16.1:1 ✅ Excellent

text-secondary (#666) on bg-primary (#ffffff)
Contrast: 5.9:1 ✅ Good
```

### Action Colors

```css
primary (#4a9eff) on dark bg (#0a0a0a)
Contrast: 5.2:1 ✅ Good

success (#51cf66) on dark bg (#0a0a0a)
Contrast: 3.2:1 ⚠️ Borderline (use only for large elements)

accent/error (#ff6b6b) on dark bg (#0a0a0a)
Contrast: 4.9:1 ✅ Good
```

**Testing Tool:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify your colors.

---

## Color Accessibility

### 1. **Colorblindness**

~8% of males, ~0.5% of females have color vision deficiency. Most common: red-green blindness.

**Solutions:**

- Don't rely on color alone; add icons, text, or patterns
- Test with colorblind simulators (search "color blindness simulator")
- Use sufficient contrast even when colors look similar

**Bad:**

```html
<button style="background: red">Delete</button>  <!-- Red alone isn't enough -->
```

**Good:**

```html
<button style="background: red">🗑️ Delete</button>  <!-- Icon + color -->
```

### 2. **High Contrast Mode**

Some users enable OS-level high contrast modes (Windows High Contrast). Test with these enabled.

### 3. **Screen Readers**

Screen readers don't convey color. Always include:

- Semantic HTML
- ARIA labels
- Alternative text

---

## Practical Guidelines

### Do's

✅ **Use semantic colors consistently** - Red always means error/danger

✅ **Check contrast ratios** - Use tools; don't guess

✅ **Test both light and dark modes** - Colors may differ in appearance

✅ **Include non-color indicators** - Icons, text, patterns alongside colors

✅ **Document your palette** - Create a color guide (this doc!)

### Don'ts

❌ **Don't use pure black/white** - Too harsh; use off-black (#0a0a0a) and off-white (#f5f5f5)

❌ **Don't rely on color alone** - Add icons or text for meaning

❌ **Don't use too many colors** - Limit to 5-8 total

❌ **Don't assume colors will display the same on all screens** - Test across devices

❌ **Don't forget colorblind users** - Test with a simulator

---

## WebSandbox Color Palette

### Base Colors

```css
--color-primary: #4a9eff;      /* Blue: Main actions */
--color-accent: #ff6b6b;       /* Red: Errors/alerts */
--color-success: #51cf66;      /* Green: Success */
--color-warning: #ffa94d;      /* Orange: Warnings */
--color-neutral: #666;         /* Gray: Secondary */
```

### Dark Mode

```css
--bg-primary: #0a0a0a;         /* Near-black background */
--bg-secondary: #1a1a1a;       /* Dark gray for cards */
--text-primary: #e8e8e8;       /* Near-white text */
--text-secondary: #b0b0b0;     /* Light gray text */
--border-color: #333;          /* Dark borders */
```

### Light Mode

```css
--bg-primary: #ffffff;         /* White background */
--bg-secondary: #f5f5f5;       /* Light gray for cards */
--text-primary: #1a1a1a;       /* Near-black text */
--text-secondary: #666;        /* Gray text */
--border-color: #ddd;          /* Light borders */
```

### Usage Examples

```css
/* Primary action button */
.button-primary {
  background-color: var(--color-primary);
  color: white;
}

/* Error message */
.error-message {
  background-color: var(--color-accent);
  color: white;
}

/* Success message */
.success-message {
  background-color: var(--color-success);
  color: white;
}

/* Secondary text */
.text-secondary {
  color: var(--text-secondary);
}
```

---

## When to Expand Your Palette

Start with **5 base colors + 5 theme colors**. Expand only when needed:

- **At 10+ unique colors:** You might have too many; consolidate
- **Adding gradients:** Use base colors; avoid new colors
- **Multiple themes:** Use CSS variables to swap colors without changing HTML

Example:

```css
/* Reuse base colors for different purposes */
.link { color: var(--color-primary); }
.link:hover { color: var(--color-primary); opacity: 0.8; }  /* Darken instead of new color */
```

---

## Resources

### Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify contrast ratios
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/) - Test for colorblind accessibility
- [Coolors.co](https://coolors.co/) - Generate color schemes
- [Material Design Colors](https://material.io/design/color/) - Google's color system

### Reading

- [Understanding Web Accessibility](https://www.w3.org/WAI/fundamentals/) - WCAG guidelines
- [Color Contrast and Readability](https://blog.hubspot.com/website/web-safe-colors) - Best practices
- [Color Theory Basics](https://en.wikipedia.org/wiki/Color_theory) - Design fundamentals

---

## Summary

A good color scheme:

1. **Uses semantic naming** - Colors have clear purposes
2. **Maintains contrast** - Text is readable (4.5:1 minimum)
3. **Is consistent** - Same colors for same meanings
4. **Considers accessibility** - Works for colorblind users
5. **Supports themes** - Dark and light modes use same base colors

WebSandbox uses a **simplified monochromatic approach** with 5 base colors + 5 theme colors. This is maintainable, scalable, and educational—you can understand and modify the entire palette by reading a few lines of CSS.
