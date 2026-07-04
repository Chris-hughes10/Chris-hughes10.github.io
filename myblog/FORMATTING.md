# Article Formatting Guide

Guidelines for formatting articles in this blog. Follow these conventions to ensure consistency across posts.

## Markdown Button

### When to Include
- **Include** on technical/native Quarto posts where readers benefit from seeing raw markdown
- **Include** on long-form technical articles (evals, methodology, deep dives)
- **Exclude** on shorter pieces, opinion pieces, or posts without substantial code blocks

### How to Add
Add the source-button marker right after the YAML frontmatter:

```markdown
---
title: "Your Title"
...
---

::: {.source-button}
:::

Your article starts here...
```

The button will appear as a small 📝 icon that opens a modal with the full markdown source (copy only, no download).

## Spacing and List Formatting

### Bullet Lists
**Always include a blank line** between introductory text and the start of a bullet list when the intro ends with a colon:

```markdown
This is the intro text:

- First item
- Second item
```

**Not like this:**
```markdown
This is the intro text:
- First item
- Second item
```

### Multiple Bullet Lists
When you have several bullet lists in sequence, ensure a blank line between the closing of one list and the start of another.

### Numbered Lists
Same rule applies—blank line after intro text ending with a colon.

## Header Images

### Placement
- Header images should appear immediately after the YAML frontmatter (before the markdown button marker or article text)
- Use `![](headline.png)` syntax

### Metadata
- Always include `image: headline.png` in the YAML frontmatter for post previews/thumbnails
- This is separate from the inline image in the body

## Code Blocks

- Use triple backticks with language specified: ` ```python `, ` ```javascript `, etc.
- Ensure blank lines before and after code blocks
- For long code examples, consider breaking into logical sections with explanatory text between

## Typography

- Use smart dashes where appropriate: em-dashes (—) for pauses, hyphens (-) for compound words
- Use curly quotes (" " and ' ') not straight quotes
- Preserve code formatting in inline code with backticks

## Metadata (YAML Frontmatter)

Required fields:
```yaml
---
title: "Article Title"
subtitle: "Optional subtitle"
date: "YYYY-MM-DD"
categories: [Category1, Category2]
description: "One-line description for preview"
image: headline.png
---
```

Optional fields:
- `reading-time: N` — Estimated reading time in minutes
- `author: Name` — If not the default

## File Organization

- Each post lives in its own directory: `posts/[slug]/`
- Main content: `posts/[slug]/index.qmd`
- Images: stored alongside `index.qmd` in the same directory
- Use descriptive filenames for images

## Links

- Internal links: Use relative paths from the post's location
  - Example: `[Link text](../../writing/other-post/)`
- External links: Use full URLs
  - Example: `[Link text](https://example.com)`

## Blockquotes

For highlighted sections or callouts:
```markdown
> **Key insight.** This is the important part. Keep it concise and impactful.
```

## Tables

- Use Markdown table syntax for simple tables
- Ensure proper alignment of pipes and dashes
- Include header row

## When in Doubt

- Check recent posts in the same category for consistency
- Prioritize readability over strict adherence to rules
- Test in preview to see how it renders
