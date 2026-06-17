```markdown
# 🚀 DongDev Portfolio & Blog Ecosystem
```

<p align="center">
  <img src=".github/top-banner-final.webp" alt="DongDev Portfolio Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white" alt="CSS3"/>  
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify">
</p>

```markdown

Welcome to the central monorepo of **DongDev**, an all-in-one personal portfolio and technical blog platform. This repository showcases an array of web development applications alongside a performance-optimized, serverless blog interface built using a clean vanilla engineering approach.

---

## 🌟 Architecture & Features

This project bypasses heavy framework overhead by relying purely on a modern **Vanilla Tech Stack (HTML5, CSS3, JavaScript)** paired with serverless edge architecture and AI integrations:

* **Modular Portfolio Showcases:** Houses individual, independent applications ranging from interactive multimedia (**Music App**), arcade logic (Blackjack), to educational utilities (Passenger Counter) and hardware-software interfaces (Arduino).
* **Intelligent AI Assistant (Gemini AI Chatbot):** Features a built-in smart assistant operating via Netlify Functions. It utilizes an advanced client-side architecture supporting automated core model fallbacks (`gemini-2.5-flash-lite` ➔ `gemini-2.5-flash` ➔ `gemini-3.5-flash`) to ensure unbroken, responsive conversations.
* **Persistent Global Dark/Light Mode:** A system-wide visual toggle with state management synchronized seamlessly through browser `localStorage` variables.
* **Decoupled Assets Management:** Scalable directory structure split into dedicated material folders to isolate graphics, custom stylesheets, and media configurations per entity.
* **Scoped LocalStorage Comment System:** Orchestrated centrally by `/script/blog.js`. It dynamically parses unique routing slugs from `window.location.pathname` to construct separate key-value structures, keeping comment sections fully isolated across different posts.
* **Serverless Notifications (Web3Forms API Integration):** Sends automated, instantaneous email logs straight to the admin's inbox whenever a reader drops a message through the contact form.

---

## 🔒 Front-End Guardrails & Security

To defend the system against exploitation and malicious bot traffic, the repository applies strict modern client-side security policies:

* **Anti-Spam & Bot Barriers (Cloudflare Turnstile & hCaptcha):** * The Gemini Chatbot is guarded by explicit **Cloudflare Turnstile** token verification layers to detect and counter unauthorized headless-browser requests and automated API abuse.
  * General contact forms deploy custom **hCaptcha** interactive puzzles before allowing data payloads to be transmitted.
* **Cross-Site Scripting (XSS) Sanitization:** Custom string-escaping helper utilities clean user input vectors before inserting text into the active client DOM.
* **Anti-Clickjacking Headers:** Explicit framing validation breaks out of external embedded frames by enforcing `window.top.location` synchronization.

---

## 📂 True Project Architecture

```text
├── .vscode/                     # Local IDE workspace preferences
├── .gitignore                   # Version control exclusions
├── index.html                   # Core portfolio homepage & landing index
├── README.md                    # System documentation
│
├── assets/                      # Decoupled media bundles per entity
│   ├── Arduino-materials/
│   ├── blackjack-materials/
│   ├── blog-materials/
│   ├── businesscard-materials/
│   ├── counting-app-materials/
│   ├── GIFt-materials/
│   ├── google-materials/
│   ├── index-materials/
│   ├── musics-materials/         # Assets specifically allocated for the Music App
│   └── space-materials/
│
├── blog/                        # Technical writing collection
│   ├── edge-ai.html             # Edge AI deep dives
│   ├── index.html               # Main blog listing hub
│   ├── lcd-applying.html        # Custom physical hardware interaction post
│   ├── openclaw-part1.html      # OpenClaw implementation documentation
│   ├── smart-home.html          # IoT & automation concepts
│   └── top-scorer.html          # "Lightning Strikes Twice" editorial
│
├── netlify/                     # Serverless edge function workflows
│   └── functions/
│       └── gemini.js            # Secure serverless gateway to Google Gemini APIs
│
├── projects/                    # Specialized mini-applications
│   ├── blackjack.html
│   ├── businesscard.html
│   ├── GIFt.html
│   ├── google.com.html
│   ├── music-app.html           # Core Music Player UI layout
│   ├── passenger-counter.html
│   └── space.html
│
├── script/                      # Client-side behavioral logic
│   ├── blackjack.js
│   ├── blog.js                  # Global comment system core engine
│   ├── index.js                 # Global landing, theme controller & chatbot UI logic
│   ├── music-app.js             # Native HTML5 Audio API orchestration layers
│   └── pc.js
│
└── styles/                      # Scoped presentation layers
    ├── bcstyles.css
    ├── blackjack.css
    ├── blogstyles.css           # Typography, layout, and comments styles for the blog
    ├── GIFt-styles.css
    ├── googlestyles.css
    ├── music-app.css            # Scoped design system for the Music App
    ├── pc-styles.css
    ├── spacestyles.css
    └── styles.css               # Core global landing page & theme layouts

```

``` markdown
# 🤖 Demo Chatbot & Dark Mode
```

![DongDev Chatbot Demo](.github/chatbot-gif.gif)

``` markdown
# 🎧 Music App User Interface
```
<p align="center">
  <img src="assets/index-materials/music-app.webp" alt="Music App User Interface" width="100%">
</p>

---

## 🛠 Local Deployment & Tweaks

### 1. Running Locally with Serverless Functions

To properly test both the client layout and the Gemini Chatbot back-end locally, it is recommended to run the project using the Netlify CLI:

```bash
# Install Netlify CLI globally (if not done yet)
npm install netlify-cli -g

# Start the local development server (simulates serverless functions)
netlify dev

```

*The ecosystem will spin up on `http://localhost:8888` by default.*

### 2. Form Notification Configuration

To handle form submissions safely without data corruption on accented strings, map your form fields using plain alphanumeric names:

* Ensure `<input type="hidden" id="web3FormsKey" value="YOUR_KEY_HERE">` is populated with your active token inside the target HTML files.
* **Turnstile Integration:** When developing locally, the code automatically defaults to Cloudflare's generic development sitekey (`1x00000000000000000000AA`). Ensure you map your live domain's Turnstile Sitekey inside `index.js` before deploying to server hosts.

---

## 📝 Roadmap & Current Highlights

* **AI Agents:** Deploying standalone OpenClaw setups inside cloud instances (AWS EC2) locked down behind private overlay networks (Tailscale networks + loopback bindings).
* **Interactive Labs:** Continuously extending the `/projects/` sub-tier with pure JavaScript-driven interactive application mechanics.
* **Performance Tuning:** Audit native script execution to keep global bundle delivery lightweight and lightning-fast.

---

## 📄 License

Maintained under personal codebase copyrights by Duong Phuong Dong (DongDev). This repository is public strictly for educational purposes, open source review, and portfolio demonstration. Code duplication, cloning, or redistribution for personal portfolio use is strictly prohibited under the attached LICENSE.

If this multi-project directory layout provides inspiration for your work, drop a ⭐ Star on the repository!

---

*Built with precision by DongDev in 2026.*

