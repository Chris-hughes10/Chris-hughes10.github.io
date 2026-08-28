# Chris Hughes - Personal Blog & Portfolio

A Quarto-based blog showcasing blog posts and projects by Chris Hughes, Principal Machine Learning Engineer/Scientist Manager at Microsoft.

**Live Site:** `https://chris-hughes10.github.io/blog/` (or `https://chris-hughes10.github.io/` after repo rename)

## 🚀 Quick Start with Dev Container

This repository includes a dev container with Quarto CLI pre-installed for easy development.

### Option 1: VS Code / GitHub Codespaces
1. Open this repository in VS Code
2. When prompted, click "Reopen in Container"
3. Wait for the container to build (~1-2 minutes)
4. Open terminal and run:
   ```bash
   cd myblog
   quarto preview
   ```
5. Your blog will open at `http://localhost:4200` with live reload!

### Option 2: Manual Setup (without dev container)
If you prefer not to use the dev container:

1. Install Quarto CLI: https://quarto.org/docs/get-started/
2. Clone this repository
3. Navigate to the myblog directory:
   ```bash
   cd myblog
   quarto preview
   ```

## 📁 Project Structure

```
blog/
├── .devcontainer/          # Dev container configuration
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       └── publish.yml     # GitHub Actions workflow for auto-publishing
├── myblog/                 # Main blog directory
│   ├── _quarto.yml         # Quarto configuration
│   ├── index.qmd           # Homepage
│   ├── about.qmd           # About page
│   ├── posts/              # Blog posts
│   │   └── externals/
│   │       └── metadata.yml  # External blog post links (Medium, etc.)
│   ├── projects/           # Projects
│   │   ├── metadata.yml    # Project metadata (GitHub repos)
│   │   └── *.qmd           # Individual project pages
│   ├── profile.jpg         # Profile image
│   ├── styles.css          # Custom styles
│   ├── theme.scss          # Light theme
│   ├── theme-dark.scss     # Dark theme
│   └── collapsible.js      # Collapsible sections script
└── README.md               # This file
```

## ✍️ Adding Content

### Adding a Blog Post (External Link)

To add a Medium or external blog post, edit `myblog/posts/externals/metadata.yml`:

```yaml
- path: https://medium.com/@chris.p.hughes10/your-article-url
  title: "Your Article Title"
  subtitle: "A brief description"
  date: "2024-12-29"
  reading-time: 10
```

### Adding a Project

To add a GitHub project, edit `myblog/projects/metadata.yml`:

```yaml
- path: https://github.com/yourusername/project-name
  title: "Project Name"
  subtitle: "Short tagline"
  description: "Detailed description of what the project does"
  date: "2024-12-29"
  reading-time: 5
```

### Adding a Full Blog Post (Hosted on Site)

1. Create a new `.qmd` file in `myblog/posts/`:
   ```bash
   cd myblog/posts
   touch my-new-post.qmd
   ```

2. Add front matter:
   ```yaml
   ---
   title: "My New Post"
   subtitle: "A great subtitle"
   date: "2024-12-29"
   categories: [machine-learning, python]
   ---

   Your content here...
   ```

## 🎨 Customization

### Updating Profile
- Replace `myblog/profile.jpg` with your photo
- Update `myblog/about.qmd` with your bio

### Changing Social Links
Edit `myblog/_quarto.yml`:
```yaml
navbar:
  right:
    - about.qmd
    - icon: github
      href: https://github.com/yourusername
    - icon: linkedin
      href: https://www.linkedin.com/in/yourprofile
```

### Themes
- Light theme: `myblog/theme.scss`
- Dark theme: `myblog/theme-dark.scss`
- Custom CSS: `myblog/styles.css`

## 🔄 Publishing

### Automatic Publishing (Recommended)
Pushes to the `main` or `master` branch automatically trigger a GitHub Actions workflow that:
1. Builds the Quarto site
2. Publishes to the `gh-pages` branch
3. Makes it available at your GitHub Pages URL

### Manual Publishing
From the `myblog` directory:
```bash
quarto publish gh-pages
```

## ⚙️ GitHub Pages Setup

After merging your first PR:

1. Go to repository **Settings** → **Pages**
2. Under "Source", select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
3. Click **Save**
4. Your site will be live at `https://yourusername.github.io/blog/`

### Optional: Clean URL
To get `https://yourusername.github.io/` instead:
1. Go to **Settings** → **General**
2. Rename repository to `yourusername.github.io`
3. Update the GitHub Pages settings

## 🛠️ Useful Commands

```bash
# Preview site locally (with live reload)
quarto preview

# Build the site
quarto render

# Check Quarto version
quarto --version

# Clean build artifacts
quarto clean
```

## 📝 Workflow

1. **Edit content** - Add blog posts or projects
2. **Preview locally** - `quarto preview` to see changes
3. **Commit changes** - `git add . && git commit -m "Add new post"`
4. **Push to GitHub** - `git push`
5. **Auto-publish** - GitHub Actions builds and deploys automatically

## 🔗 Links

- **Medium:** [@chris.p.hughes10](https://medium.com/@chris.p.hughes10)
- **GitHub:** [@Chris-hughes10](https://github.com/Chris-hughes10)
- **LinkedIn:** [chris-hughes1](https://www.linkedin.com/in/chris-hughes1/)

## 📄 License

Feel free to use this template for your own blog!
