```markdown
# 🚀 DongDev Portfolio & Blog Ecosystem

Welcome to the central monorepo of **DongDev Notes**, an all-in-one personal portfolio and technical blog platform. This repository showcases an array of web development mini-projects alongside a performance-optimized, serverless blog interface built using a clean vanilla engineering approach.

---

## 🌟 Architecture & Features

This project bypasses heavy framework overhead by relying purely on modern **Vanilla Tech Stack (HTML5, CSS3, JavaScript)** paired with serverless edge architecture:

* **Modular Portfolio Showcases:** Houses individual, independent mini-applications ranging from arcade logic (Blackjack) to educational utilities (Passenger Counter) and hardware-software interfaces (Arduino).
* **Decoupled Asset Management:** Scalable asset directory structure split into dedicated material subdirectories to isolate graphics and media configurations per project.
* **Scoped LocalStorage Comment System:** * Orchestrated centrally by `/script/blog.js`.
    * Dynamically parsing the unique routing slugs from `window.location.pathname` to construct separate key-value structures, keeping comment sections fully isolated across different posts without overlapping data.
* **Serverless Notifications (Web3Forms API Integration):** Sends automated, instantaneous email logs straight to the admin's inbox whenever a reader drops a comment.
* **Front-End Guardrails:** * Fully sanitized user input strings via a custom HTML-escaping mechanism to protect the client DOM from Cross-Site Scripting (XSS) injection vectors.
    * Integrated spam-bot barriers using explicit `h-captcha` verification triggers.

---

## 📂 True Project Architecture

```text
├── .vscode/                     # Local IDE workspace preferences
├── .gitignore                   # Version control exclusions
├── index.html                   # Core portfolio homepage & landing index
├── README.md                    # System documentation
│
├── asset/                       # Decoupled media bundles per entity
│   ├── Arduino-materials/
│   ├── blackjack-materials/
│   ├── blog-materials/
│   ├── businesscard-materials/
│   ├── counting-app-materials/
│   ├── GIFt-materials/
│   ├── google-materials/
│   ├── index-materials/
│   └── space-materials/
│
├── blog/                        # Technical writing collection
│   ├── edge-ai.html             # Edge AI deep dives
│   ├── index.html               # Main blog listing hub
│   ├── openclaw-part1.html      # OpenClaw implementation documentation
│   ├── smart-home.html          # IoT & automation concepts
│   └── top-scorer.html          # "Lightning Strikes Twice" editorial
│
├── projects/                    # Specialized mini-applications
│   ├── AI.html
│   ├── arduino.html
│   ├── blackjack.html
│   ├── businesscard.html
│   ├── GIFt.html
│   ├── google.com.html
│   ├── passenger-counter.html
│   └── space.html
│
├── script/                      # Client-side behavioral logic
│   ├── blackjack.js
│   ├── blog.js                  # Global comment system core engine
│   ├── index.js                 # Global main utilities
│   └── pc.js
│
└── styles/                      # Scoped presentation layers
    ├── AI-styles.css
    ├── arduinostyles.css
    ├── bcstyles.css
    ├── blackjack.css
    ├── blogstyles.css           # Typography, layout, and comments styles for the blog
    ├── GIFt-styles.css
    ├── googlestyles.css
    ├── pc-styles.css
    ├── spacestyles.css
    └── styles.css               # Core global landing page styles

```

---

## 🛠 Local Deployment & Tweaks

### 1. Running Locally

Since this is a client-side architecture, no node dependencies are required. Clone the repo and run via any local server module:

```bash
# Clone the repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

# If you have VS Code, simply right-click index.html and select 'Open with Live Server'

```

### 2. Form Notification Configuration

To handle form submissions safely without data corruption on accented strings (avoiding email encoding mojibake), map your form fields using plain alphanumeric names:

* Ensure `<input type="hidden" id="web3FormsKey" value="YOUR_KEY_HERE">` is populated with your active token inside the target HTML files.
* **Pro-Tip:** Use standard alphanumeric keys for field naming (e.g., `name="Visitor_Name"`, `name="Message_Body"`) so third-party email parsers process your system headers properly.

---

## 📝 Roadmap & Current Highlights

* **AI Agents:** Deploying standalone OpenClaw setups inside cloud instances (AWS EC2) locked down behind private overlay networks (Tailscale networks + loopback bindings).
* **Academic Memoirs:** Analyzing core study strategies through data-driven personal reflection posts.
* **Interactive Labs:** Continuously extending the `/projects/` sub-tier with pure JavaScript-driven interactive application mechanics.

---

## 📄 License

Maintained under personal codebase copyrights by **DongDev Notes**. Feel free to fork, study, or refactor these modules for your own portfolio. If this multi-project directory layout provides inspiration for your work, drop a **⭐ Star** on the repository!

---

*Built with precision by DongDev in 2026.*
