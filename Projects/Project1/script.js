/**
 * DevStack Hub - Full Stack Development Articles & Technology Guide
 * Pure Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Data Store: Technologies & In-Depth Articles
     ========================================================================== */

  const TECHNOLOGIES_DATA = [
    {
      id: 'html5',
      name: 'HTML5',
      category: 'Frontend',
      query: 'HTML',
      icon: `<svg viewBox="0 0 24 24" fill="#e34f26"><path d="M12 2L3 5v12l9 5 9-5V5l-9-3zm6.5 5.5l-.6 6.8L12 16l-5.9-1.7-.3-3.8h2.3l.1 1.9 3.8 1.1 3.8-1.1.3-3.9H5.5L5 7.5h13.5z"/></svg>`
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'Frontend',
      query: 'CSS',
      icon: `<svg viewBox="0 0 24 24" fill="#1572b6"><path d="M12 2L3 5v12l9 5 9-5V5l-9-3zm6.5 5.5l-.6 6.8L12 16l-5.9-1.7-.3-3.8h2.3l.1 1.9 3.8 1.1 3.8-1.1.3-3.9H5.5L5 7.5h13.5z"/></svg>`
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Frontend',
      query: 'JavaScript',
      icon: `<svg viewBox="0 0 24 24" fill="#f7df1e"><rect width="24" height="24" rx="4" fill="#f7df1e"/><path d="M6 17.5c.8.5 1.7.8 2.6.8 1.5 0 2.4-.7 2.4-2.1v-7h2.2v7.1c0 2.6-1.6 3.8-4.4 3.8-1.3 0-2.4-.4-3.2-.9l.4-1.7zm8.3.1c.9.6 2 .9 3.1.9 1.6 0 2.5-.7 2.5-1.8 0-1-.6-1.6-2.1-2.1l-.8-.3c-2.1-.8-3.1-1.8-3.1-3.4 0-2.1 1.7-3.6 4.3-3.6 1.1 0 2.1.3 2.9.7l-.6 1.7c-.7-.4-1.5-.6-2.3-.6-1.3 0-2.1.7-2.1 1.6 0 .9.6 1.4 2 1.9l.8.3c2.3.9 3.3 1.9 3.3 3.6 0 2.3-1.8 3.8-4.7 3.8-1.3 0-2.6-.4-3.5-1l.2-1.7z" fill="#000000"/></svg>`
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Backend',
      query: 'Java',
      icon: `<svg viewBox="0 0 24 24" fill="#5382a1"><path d="M8.8 16.5s-.8.2.5.3c1.7.1 2.8.2 4.8-.2 0 0 .7.4 1.5.7-5.1 2.2-10.2-.4-6.8-.8zm-.5-2.5s-1 .3.4.4c2 .1 3.5.2 6.5-.3 0 0 .5.3 1.1.6-6.4 1.9-12.7-.2-8-.7zm4.9-5.9c.7.8.6 1.5.6 1.5s.8-1 1.5-1.7c1.7-1.7 1.9-3.2.7-4.4-1.2-1.3-3.1-1.3-4.8.4-.7.7-1.3 1.6-1.5 2.5 1.5-.7 2.8-.2 3.5 1.7zm-2.4 5.3c-2.4-.1-4.2-.6-3.8-1.7.3-.8 1.6-1.2 3.1-1.2 1.3 0 2.4.3 2.4.3s-.3-.3-.7-.5c-3.1 0-5.8 1.4-5 3 .6 1.2 3 1.8 6.7 1.3.6-.1 1.2-.3 1.7-.5-1.3-.2-3-.6-4.4-.7zm10.7 2.6c-.4 1.8-2.6 3.1-5.7 3.6.8-.5 1.3-1.2 1.3-1.9 0-.4-.2-.8-.6-1.2 3.1-.2 4.7-.4 5-.5z"/></svg>`
    },
    {
      id: 'springboot',
      name: 'Spring Boot',
      category: 'Backend',
      query: 'Spring Boot',
      icon: `<svg viewBox="0 0 24 24" fill="#6db33f"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Database',
      query: 'MySQL',
      icon: `<svg viewBox="0 0 24 24" fill="#00758f"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V13z"/></svg>`
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Tools',
      query: 'Git',
      icon: `<svg viewBox="0 0 24 24" fill="#f05032"><path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.8 2.8c.6-.2 1.3 0 1.8.4.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3 0 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.6-1.2-.4-1.8L12.5 11v5.2c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V10.8c-.2-.1-.4-.3-.6-.5-.5-.5-.6-1.3-.3-1.9L7.3 5.6 2.4 10.5c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.5.6-1.5 0-2.1z"/></svg>`
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Tools',
      query: 'GitHub',
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`
    },
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'Tools',
      query: 'VS Code',
      icon: `<svg viewBox="0 0 24 24" fill="#007acc"><path d="M17.6 2.1l-8 7.4-4.8-3.7-2.8 1.4v9.6l2.8 1.4 4.8-3.7 8 7.4 4.4-2.1V4.2l-4.4-2.1zm-13.6 8l3.1 2.4-3.1 2.4V10.1zm14 8.7L10.5 12 18 5.2v13.6z"/></svg>`
    },
    {
      id: 'postman',
      name: 'Postman',
      category: 'Tools',
      query: 'Postman',
      icon: `<svg viewBox="0 0 24 24" fill="#ff6c37"><circle cx="12" cy="12" r="10"/><path d="M12 7l4 5-4 5-4-5 4-5z" fill="#ffffff"/></svg>`
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Tools',
      query: 'Docker',
      icon: `<svg viewBox="0 0 24 24" fill="#2496ed"><path d="M13.98 11.08h-2.12v-2.1h2.12v2.1zm-2.6 0h-2.12v-2.1h2.12v2.1zm-2.6 0H6.66v-2.1h2.12v2.1zm7.8 0h-2.12v-2.1h2.12v2.1zm-2.6-2.58h-2.12v-2.1h2.12v2.1zm-2.6 0h-2.12v-2.1h2.12v2.1zm7.8 2.58h-2.12v-2.1h2.12v2.1zm4.74 1.34c-.38-.26-1.28-.35-2.03-.22-.1-.8-.58-1.5-1.34-1.92l-.46-.26-.3.42c-.44.62-.64 1.38-.56 2.14-.84.44-1.84.5-2.76.18H1.64c-.46 1.48-.3 3.08.44 4.46 1.22 2.28 3.58 3.76 6.16 3.86 6.06.24 11.24-3.78 12.38-9.4.66.02 1.34-.14 1.94-.48l.42-.24-.46-.54z"/></svg>`
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      query: 'TypeScript',
      icon: `<svg viewBox="0 0 24 24" fill="#3178c6"><rect width="24" height="24" rx="4" fill="#3178c6"/><path d="M5.5 10.5h6.5v2.2H9.8v6.8H7.2v-6.8H5.5v-2.2zm13.1 3.8c-.3-.8-.9-1.4-1.8-1.7-.6-.2-1.4-.4-2.2-.6-.6-.1-1-.3-1.3-.5-.3-.2-.4-.5-.4-.9 0-.4.2-.8.6-1 .4-.3 1-.4 1.7-.4.6 0 1.2.1 1.7.4.4.2.8.6 1 .9l1.8-1.4c-.5-.7-1.1-1.2-1.9-1.6-.8-.4-1.7-.6-2.8-.6-1.5 0-2.8.4-3.7 1.2-.9.8-1.3 1.9-1.3 3.1 0 1 .3 1.8.9 2.5.6.6 1.4 1.1 2.5 1.4.7.2 1.3.4 1.7.5.4.1.7.3.9.5.2.2.3.5.3.8 0 .5-.2.9-.6 1.2-.4.3-1.1.5-1.9.5-.9 0-1.7-.2-2.3-.6-.6-.4-1.1-1-1.3-1.7l-1.9 1.3c.4 1 1.1 1.8 2.1 2.4 1 .6 2.2.9 3.6.9 1.6 0 3-.4 3.9-1.3.9-.9 1.4-2 1.4-3.4 0-1.1-.3-2-.9-2.7z" fill="#ffffff"/></svg>`
    }
  ];

  const ARTICLES_DATA = [
    {
      id: 'what-is-html-and-why-is-it-important',
      title: 'What is HTML and Why is it Important?',
      category: 'frontend',
      categoryLabel: 'Frontend',
      readTime: '6 min read',
      date: 'May 14, 2026',
      author: 'Sophia Chen',
      authorRole: 'Senior Frontend Architect',
      excerpt: 'Discover why HyperText Markup Language (HTML) is the indispensable backbone of the modern web, how semantic elements boost accessibility, and best practices for modern web architecture.',
      technologies: ['HTML5', 'Semantic Web', 'Accessibility', 'SEO'],
      likes: 142,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="htmlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#c2410c"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <circle cx="40" cy="90" r="30" fill="url(#htmlGrad)" opacity="0.2"/>
          <text x="180" y="70" fill="#f8fafc" font-family="monospace" font-size="28" font-weight="bold" text-anchor="middle">&lt;!DOCTYPE html&gt;</text>
          <rect x="50" y="95" width="260" height="24" rx="6" fill="#334155"/>
          <text x="180" y="112" fill="#38bdf8" font-family="monospace" font-size="13" text-anchor="middle">&lt;header&gt; &lt;main&gt; &lt;article&gt; &lt;footer&gt;</text>
          <rect x="110" y="130" width="140" height="18" rx="4" fill="#ea580c" opacity="0.3"/>
          <text x="180" y="143" fill="#fdba74" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Semantic Structure</text>
        </svg>
      `,
      content: `
        <p><strong>HyperText Markup Language (HTML)</strong> represents the fundamental structural scaffolding of every single web application and site in existence. Without HTML, browsers would have no mechanism to parse, organize, or present information to users.</p>
        
        <h2>1. The Role of HTML in Full Stack Development</h2>
        <p>In modern web engineering, HTML is not merely about typing tags into a text file. It establishes the <em>Document Object Model (DOM)</em> tree, which JavaScript traverses and manipulates dynamically, and which CSS styles render visually on screen.</p>
        <p>When you build full stack applications—whether using server-rendered templates in Spring Boot or modern component-driven frontends—semantic HTML guarantees that your application remains accessible, search-engine indexable, and performant.</p>

        <h2>2. Why Semantic HTML Matters</h2>
        <p>Prior to HTML5, developers commonly nested generic <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> tags without meaningful semantic structure. Modern standards emphasize dedicated semantic tags that convey clear architectural meaning to browsers, search engines, and screen readers:</p>
        <ul>
          <li><code>&lt;header&gt;</code>: Top-level branding, navigational landmarks, and search inputs.</li>
          <li><code>&lt;nav&gt;</code>: Primary navigation links for accessibility tools.</li>
          <li><code>&lt;main&gt;</code>: Unique primary content of the document.</li>
          <li><code>&lt;article&gt;</code>: Self-contained composition intended for syndication or reuse.</li>
          <li><code>&lt;section&gt;</code>: Thematic grouping of content with an identifiable heading.</li>
          <li><code>&lt;footer&gt;</code>: Metadata, copyright, and secondary links.</li>
        </ul>

        <h2>3. Modern Semantic Code Example</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>index.html (HTML5 Boilerplate)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Mastering Semantic HTML5"&gt;
  &lt;title&gt;Semantic Web Architecture&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;nav aria-label="Main Navigation"&gt;
      &lt;a href="/"&gt;DevStack Hub&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;article&gt;
      &lt;h1&gt;Building Resilient Web Architectures&lt;/h1&gt;
      &lt;p&gt;Clean semantic markup enhances accessibility and SEO.&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2026 DevStack Hub. All rights reserved.&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Key Takeaways
          </div>
          <p>Always write valid semantic markup. Semantic HTML guarantees faster parsing speeds, top-tier SEO rankings, and seamless accessibility for users relying on assistive assistive screen readers.</p>
        </div>
      `
    },
    {
      id: 'understanding-css-for-modern-web-design',
      title: 'Understanding CSS for Modern Web Design',
      category: 'frontend',
      categoryLabel: 'Frontend',
      readTime: '8 min read',
      date: 'May 18, 2026',
      author: 'Marcus Vance',
      authorRole: 'UI/UX Design Systems Engineer',
      excerpt: 'Explore the modern CSS ecosystem: CSS Grid, Flexbox, Custom Properties (variables), container queries, and how to create clean, scalable design tokens without heavy frameworks.',
      technologies: ['CSS3', 'Flexbox', 'CSS Grid', 'Design Systems', 'Responsive UI'],
      likes: 198,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cssGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <rect x="40" y="40" width="120" height="100" rx="8" fill="#334155" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4"/>
          <text x="100" y="95" fill="#38bdf8" font-family="monospace" font-size="14" text-anchor="middle">display: grid</text>
          <rect x="180" y="40" width="140" height="45" rx="6" fill="url(#cssGrad)"/>
          <text x="250" y="68" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">var(--primary-color)</text>
          <rect x="180" y="95" width="140" height="45" rx="6" fill="#334155"/>
          <text x="250" y="122" fill="#94a3b8" font-family="monospace" font-size="12" text-anchor="middle">clamp(1rem, 2vw, 2rem)</text>
        </svg>
      `,
      content: `
        <p>Cascading Style Sheets (CSS) have evolved from simple presentation scripts into a comprehensive, high-performance styling engine capable of responsive layouts, smooth GPU-accelerated micro-animations, and fluid design systems.</p>

        <h2>1. The Foundation: CSS Custom Properties</h2>
        <p>CSS Custom Properties (often called CSS variables) allow you to declare centralized design tokens for colors, typography scales, spacing units, and elevations. They enable instant theming (such as light and dark mode toggles) without rewriting style blocks.</p>

        <h2>2. Modern Layout Mechanisms: Flexbox vs Grid</h2>
        <p>Understanding when to employ CSS Flexbox versus CSS Grid is the cornerstone of responsive web design:</p>
        <ul>
          <li><strong>CSS Flexbox:</strong> Ideal for one-dimensional layouts (a row of navbar links, a button with an icon and text, or a vertical stack of form fields).</li>
          <li><strong>CSS Grid:</strong> Engineered for two-dimensional layouts (complete page scaffolds, multi-column dashboard cards, or image galleries).</li>
        </ul>

        <h2>3. Responsive CSS System Example</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>style.css (Design System Tokens)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>:root {
  --primary-hue: 220;
  --color-primary: hsl(var(--primary-hue), 90%, 55%);
  --surface-bg: hsl(var(--primary-hue), 20%, 8%);
  --spacing-md: 1.5rem;
}

/* Fluid responsive grid without media queries */
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--spacing-md);
}

/* Modern fluid typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.15;
}</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Best Practice Tip
          </div>
          <p>Prioritize native CSS features such as <code>clamp()</code>, <code>minmax()</code>, and CSS Custom Properties. They minimize layout shifts and eliminate the necessity of heavy utility frameworks.</p>
        </div>
      `
    },
    {
      id: 'javascript-fundamentals-for-beginners',
      title: 'JavaScript Fundamentals for Beginners',
      category: 'frontend',
      categoryLabel: 'Frontend',
      readTime: '10 min read',
      date: 'May 22, 2026',
      author: 'Elena Rostova',
      authorRole: 'Principal Web Developer',
      excerpt: 'Master modern JavaScript (ES6+): understand execution context, DOM manipulation, promises, async/await, closures, and modular programming patterns.',
      technologies: ['JavaScript', 'ES6+', 'Async/Await', 'DOM APIs', 'Promises'],
      likes: 310,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#facc15"/>
              <stop offset="100%" stop-color="#eab308"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <rect x="45" y="45" width="60" height="60" rx="8" fill="url(#jsGrad)"/>
          <text x="75" y="85" fill="#0f172a" font-family="sans-serif" font-size="28" font-weight="900" text-anchor="middle">JS</text>
          <text x="130" y="65" fill="#f8fafc" font-family="monospace" font-size="16" font-weight="bold">const fetchData = async () =&gt; {</text>
          <text x="150" y="90" fill="#38bdf8" font-family="monospace" font-size="14">  const res = await api.get();</text>
          <text x="150" y="115" fill="#4ade80" font-family="monospace" font-size="14">  return res.json();</text>
          <text x="130" y="140" fill="#f8fafc" font-family="monospace" font-size="16" font-weight="bold">};</text>
        </svg>
      `,
      content: `
        <p>JavaScript is the undisputed programming language of the web. It drives client-side interactivity, asynchronous network communication, real-time updates, and powers modern backend servers via Node.js.</p>

        <h2>1. Scope, Variables, and Immutability</h2>
        <p>Modern JavaScript has replaced outdated <code>var</code> declarations with block-scoped bindings:</p>
        <ul>
          <li><code>const</code>: Default to <code>const</code> for all variables whose identifier binding will not be reassigned.</li>
          <li><code>let</code>: Use when a variable must be reassigned over time (such as loop counters or accumulator states).</li>
        </ul>

        <h2>2. Asynchronous JavaScript: From Callbacks to Async/Await</h2>
        <p>JavaScript runs on a single-threaded event loop. Non-blocking asynchronous I/O is handled cleanly through Promises and the <code>async/await</code> syntax:</p>

        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>script.js (Modern Async/Await Pattern)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>// Clean asynchronous data fetching with robust error handling
async function loadDeveloperArticles(category) {
  try {
    const response = await fetch('/api/articles?category=' + encodeURIComponent(category));
    
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Failed to load articles:', error);
    return [];
  }
}</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Core Principle
          </div>
          <p>Understand how the JavaScript event loop and microtask queue operate. Master Array prototype methods (<code>map</code>, <code>filter</code>, <code>reduce</code>) to write pure, declarative code.</p>
        </div>
      `
    },
    {
      id: 'introduction-to-java-full-stack-development',
      title: 'Introduction to Java Full Stack Development',
      category: 'backend',
      categoryLabel: 'Backend',
      readTime: '11 min read',
      date: 'May 25, 2026',
      author: 'David K. Miller',
      authorRole: 'Enterprise Java Specialist',
      excerpt: 'Learn what constitutes a professional Java Full Stack developer, how the multi-tier enterprise architecture functions, and how Java connects with frontends and databases.',
      technologies: ['Java', 'Spring Boot', 'REST APIs', 'Full Stack Architecture', 'Maven'],
      likes: 275,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="javaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#1e40af"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#0f172a"/>
          <rect x="30" y="30" width="90" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="75" y="70" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Presentation</text>
          <text x="75" y="100" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">HTML/CSS/JS</text>
          
          <rect x="135" y="30" width="90" height="120" rx="8" fill="url(#javaGrad)"/>
          <text x="180" y="70" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Application</text>
          <text x="180" y="100" fill="#e0f2fe" font-family="monospace" font-size="10" text-anchor="middle">Java &amp; Spring</text>

          <rect x="240" y="30" width="90" height="120" rx="8" fill="#1e293b" stroke="#0d9488" stroke-width="1.5"/>
          <text x="285" y="70" fill="#2dd4bf" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Data Tier</text>
          <text x="285" y="100" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">MySQL DB</text>
        </svg>
      `,
      content: `
        <p>A <strong>Java Full Stack Developer</strong> possesses the comprehensive skillset required to design, implement, and maintain both the user-facing client application and the high-throughput server infrastructure.</p>

        <h2>1. The 3-Tier Enterprise Architecture</h2>
        <p>Modern enterprise applications are structured around three decoupled tiers:</p>
        <ul>
          <li><strong>Presentation Layer (Client):</strong> Handles user experience, responsive HTML5 layout, CSS styling, and client-side JavaScript interactions.</li>
          <li><strong>Business Logic Layer (Server):</strong> Implemented in Java with frameworks like Spring Boot to process rules, authentication, and orchestrate transactions.</li>
          <li><strong>Data Persistence Layer (Database):</strong> Relational databases like MySQL or PostgreSQL, accessed through JPA / Hibernate and JDBC connection pools.</li>
        </ul>

        <h2>2. Standard RESTful Controller in Java</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>ArticleController.java (Java Spring REST)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>package com.devstackhub.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/v1/articles")
@CrossOrigin(origins = "*")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity&lt;List&lt;Article&gt;&gt; getAllArticles(
            @RequestParam(defaultValue = "all") String category) {
        List&lt;Article&gt; results = articleService.findByCategory(category);
        return ResponseEntity.ok(results);
    }
}</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Career Roadmap
          </div>
          <p>Java Full Stack remains one of the highest-demand engineering profiles in enterprise banking, fintech, healthcare, and high-scale cloud platforms.</p>
        </div>
      `
    },
    {
      id: 'what-is-spring-boot',
      title: 'What is Spring Boot?',
      category: 'backend',
      categoryLabel: 'Backend',
      readTime: '9 min read',
      date: 'May 28, 2026',
      author: 'David K. Miller',
      authorRole: 'Enterprise Java Specialist',
      excerpt: 'Understand how Spring Boot revolutionized Java backend development with convention-over-configuration, embedded servers, automated dependency management, and production-ready actuators.',
      technologies: ['Spring Boot', 'Java', 'Dependency Injection', 'Maven', 'Microservices'],
      likes: 240,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#16a34a"/>
              <stop offset="100%" stop-color="#15803d"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <circle cx="60" cy="90" r="32" fill="url(#springGrad)"/>
          <text x="60" y="97" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="900" text-anchor="middle">SB</text>
          <text x="140" y="65" fill="#4ade80" font-family="monospace" font-size="15" font-weight="bold">@SpringBootApplication</text>
          <rect x="140" y="80" width="190" height="28" rx="6" fill="#334155"/>
          <text x="235" y="98" fill="#f8fafc" font-family="monospace" font-size="11" text-anchor="middle">Embedded Tomcat Engine</text>
          <rect x="140" y="118" width="190" height="28" rx="6" fill="#334155"/>
          <text x="235" y="136" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">Auto-Configuration Starters</text>
        </svg>
      `,
      content: `
        <p><strong>Spring Boot</strong> is an open-source, microservice-ready framework built on top of the traditional Spring ecosystem. It eliminates tedious XML boilerplate configurations through intelligent auto-configuration and sensible defaults.</p>

        <h2>1. Core Innovations of Spring Boot</h2>
        <ul>
          <li><strong>Standalone Deployment:</strong> Embedded Tomcat, Jetty, or Undertow containers eliminate the need to deploy complex WAR files to external application servers.</li>
          <li><strong>Starter Dependencies:</strong> Curated dependency bundles (like <code>spring-boot-starter-web</code> and <code>spring-boot-starter-data-jpa</code>) streamline build configuration.</li>
          <li><strong>Automatic Configuration:</strong> Automatically configures beans and database connections based on present JAR files.</li>
          <li><strong>Production-Ready Actuators:</strong> Built-in endpoints for health checks, metrics, and application telemetry.</li>
        </ul>

        <h2>2. Standalone Application Bootstrap</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>DevStackApplication.java (Java Spring Boot)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>package com.devstackhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevStackApplication {

    public static void main(String[] args) {
        // Launches the embedded web server and initializes DI container
        SpringApplication.run(DevStackApplication.class, args);
    }
}</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Summary
          </div>
          <p>Spring Boot enables developers to create production-grade, stand-alone Spring applications that "just run".</p>
        </div>
      `
    },
    {
      id: 'understanding-mysql-database',
      title: 'Understanding MySQL Database',
      category: 'database',
      categoryLabel: 'Databases',
      readTime: '7 min read',
      date: 'June 02, 2026',
      author: 'Tariq Al-Mansoor',
      authorRole: 'Database Reliability Engineer',
      excerpt: 'Master the fundamentals of MySQL: relational schema design, primary and foreign keys, SQL joins, indexing techniques, and ACID transaction safety.',
      technologies: ['MySQL', 'SQL', 'Databases', 'Relational Models', 'ACID'],
      likes: 185,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0d9488"/>
              <stop offset="100%" stop-color="#0f766e"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <ellipse cx="80" cy="50" rx="40" ry="16" fill="url(#dbGrad)"/>
          <path d="M40 50v40c0 8.8 17.9 16 40 16s40-7.2 40-16V50" fill="url(#dbGrad)" opacity="0.8"/>
          <path d="M40 90v40c0 8.8 17.9 16 40 16s40-7.2 40-16V90" fill="url(#dbGrad)" opacity="0.6"/>
          
          <rect x="150" y="40" width="170" height="30" rx="6" fill="#334155"/>
          <text x="235" y="60" fill="#2dd4bf" font-family="monospace" font-size="12" text-anchor="middle">SELECT * FROM articles</text>
          <rect x="150" y="80" width="170" height="30" rx="6" fill="#334155"/>
          <text x="235" y="100" fill="#38bdf8" font-family="monospace" font-size="12" text-anchor="middle">INNER JOIN authors</text>
          <rect x="150" y="120" width="170" height="30" rx="6" fill="#334155"/>
          <text x="235" y="140" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">ON articles.author_id</text>
        </svg>
      `,
      content: `
        <p><strong>MySQL</strong> is the world's most popular open-source Relational Database Management System (RDBMS). It stores structured data in tables consisting of rows and columns, enforcing data integrity through strict schemas and ACID compliance.</p>

        <h2>1. ACID Properties Explained</h2>
        <ul>
          <li><strong>Atomicity:</strong> Guarantees that all statements within a transaction succeed together or all rollback.</li>
          <li><strong>Consistency:</strong> Ensures data satisfies all constraints and foreign key references before and after execution.</li>
          <li><strong>Isolation:</strong> Prevents concurrent transactions from interfering with one another.</li>
          <li><strong>Durability:</strong> Ensures committed transactions survive hardware failures via persistent write-ahead logging (WAL).</li>
        </ul>

        <h2>2. Schema & Query Definition</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>schema.sql (MySQL Table &amp; Indexes)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>-- Create articles table with indexes
CREATE TABLE articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Query optimized with index
SELECT title, category, created_at 
FROM articles 
WHERE category = 'backend' 
ORDER BY created_at DESC 
LIMIT 10;</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Optimization Insight
          </div>
          <p>Always analyze queries with <code>EXPLAIN</code>. Proper B-tree indexes prevent full table scans and keep response times under 10ms even under heavy workloads.</p>
        </div>
      `
    },
    {
      id: 'getting-started-with-git-and-github',
      title: 'Getting Started with Git and GitHub',
      category: 'tools',
      categoryLabel: 'Developer Tools',
      readTime: '8 min read',
      date: 'June 05, 2026',
      author: 'Sophia Chen',
      authorRole: 'Senior Frontend Architect',
      excerpt: 'Unlock the complete Git workflow: branch management, commit hygiene, rebasing vs merging, pull request reviews, and collaborating seamlessly on GitHub.',
      technologies: ['Git', 'GitHub', 'Version Control', 'DevOps', 'CI/CD'],
      likes: 350,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f05032"/>
              <stop offset="100%" stop-color="#c2410c"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <line x1="50" y1="120" x2="310" y2="120" stroke="#475569" stroke-width="4"/>
          <circle cx="80" cy="120" r="10" fill="#38bdf8"/>
          <circle cx="180" cy="120" r="10" fill="#38bdf8"/>
          <circle cx="280" cy="120" r="10" fill="#38bdf8"/>
          
          <path d="M80 120 C110 60, 150 60, 180 60" fill="none" stroke="url(#gitGrad)" stroke-width="4"/>
          <circle cx="180" cy="60" r="10" fill="#f05032"/>
          <path d="M180 60 C210 60, 250 60, 280 120" fill="none" stroke="url(#gitGrad)" stroke-width="4"/>
          <text x="180" y="40" fill="#f8fafc" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">feature/branch</text>
          <text x="180" y="150" fill="#94a3b8" font-family="monospace" font-size="12" text-anchor="middle">main branch</text>
        </svg>
      `,
      content: `
        <p><strong>Git</strong> is a distributed version control system that tracks changes in source code during software development. <strong>GitHub</strong> is the cloud hosting platform that enables collaborative code reviews, automated CI/CD pipelines, and open-source contributions.</p>

        <h2>1. The Professional Git Workflow</h2>
        <ol>
          <li><strong>Clone repository:</strong> <code>git clone &lt;repo-url&gt;</code></li>
          <li><strong>Create isolated branch:</strong> <code>git checkout -b feature/auth-module</code></li>
          <li><strong>Stage changes:</strong> <code>git add .</code></li>
          <li><strong>Commit with conventional messages:</strong> <code>git commit -m "feat(auth): add JWT login verification"</code></li>
          <li><strong>Push to remote:</strong> <code>git push origin feature/auth-module</code></li>
          <li><strong>Open Pull Request (PR):</strong> Review diffs and merge via GitHub.</li>
        </ol>

        <h2>2. Essential Terminal Commands</h2>
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>Terminal (Git Commands)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code># Check active repository status
git status

# Create and switch to a feature branch
git switch -c feature/new-article-layout

# Stage and commit with clear descriptive message
git add .
git commit -m "feat: implement responsive article modal reader"

# Sync with remote main branch via rebase
git fetch origin
git rebase origin/main

# Push feature branch to GitHub
git push -u origin feature/new-article-layout</code></pre>
        </div>

        <div class="takeaway-box">
          <div class="takeaway-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Professional Rule
          </div>
          <p>Never commit credentials, API keys, or large binary files. Always configure a comprehensive <code>.gitignore</code> at the root of your project.</p>
        </div>
      `
    },
    {
      id: 'mastering-vs-code-for-full-stack-productivity',
      title: 'Mastering VS Code for Full Stack Productivity',
      category: 'tools',
      categoryLabel: 'Developer Tools',
      readTime: '6 min read',
      date: 'June 08, 2026',
      author: 'Marcus Vance',
      authorRole: 'UI/UX Design Systems Engineer',
      excerpt: 'Transform Visual Studio Code into the ultimate development cockpit: essential extensions, custom keybindings, multi-cursor editing, and integrated debugging.',
      technologies: ['VS Code', 'Productivity', 'Developer Tools', 'Debugging'],
      likes: 165,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <rect x="40" y="30" width="280" height="120" rx="8" fill="#0f172a" stroke="#007acc" stroke-width="1.5"/>
          <rect x="40" y="30" width="50" height="120" rx="8" fill="#1e293b"/>
          <circle cx="65" cy="50" r="8" fill="#007acc"/>
          <circle cx="65" cy="75" r="8" fill="#475569"/>
          <circle cx="65" cy="100" r="8" fill="#475569"/>
          <text x="110" y="70" fill="#38bdf8" font-family="monospace" font-size="13">Ctrl + Shift + P</text>
          <text x="110" y="95" fill="#94a3b8" font-family="monospace" font-size="12">&gt; Format Document (Prettier)</text>
          <text x="110" y="120" fill="#4ade80" font-family="monospace" font-size="12">&gt; Debug: Start Debugging (F5)</text>
        </svg>
      `,
      content: `
        <p><strong>Visual Studio Code</strong> is the premier code editor utilized by over 70% of professional software engineers worldwide. Its lightweight architecture and extensive marketplace empower full-stack developers to build, test, and debug in one unified workspace.</p>

        <h2>1. Top Extensions for Full Stack Developers</h2>
        <ul>
          <li><strong>Prettier:</strong> Automated, opinionated code formatting on save.</li>
          <li><strong>ESLint:</strong> Real-time syntax and style linting for JavaScript and TypeScript.</li>
          <li><strong>Extension Pack for Java / Spring Boot Tools:</strong> Intelligent code completion, refactoring, and maven execution.</li>
          <li><strong>GitLens:</strong> Supercharge Git with inline blame, commit graphs, and repository navigation.</li>
        </ul>

        <h2>2. Power Keybindings to Memorize</h2>
        <ul>
          <li><code>Ctrl + P</code> (Cmd + P): Quick open files by name.</li>
          <li><code>Ctrl + Shift + P</code> (Cmd + Shift + P): Universal command palette.</li>
          <li><code>Alt + Click</code> (Option + Click): Multi-cursor editing.</li>
          <li><code>Ctrl + ~</code>: Toggle integrated terminal.</li>
        </ul>
      `
    },
    {
      id: 'api-testing-and-automation-with-postman',
      title: 'API Testing & Automation with Postman',
      category: 'tools',
      categoryLabel: 'Developer Tools',
      readTime: '7 min read',
      date: 'June 12, 2026',
      author: 'Elena Rostova',
      authorRole: 'Principal Web Developer',
      excerpt: 'Learn how to construct REST requests, manage environment variables, write automated assertion scripts in JavaScript, and generate complete API documentation with Postman.',
      technologies: ['Postman', 'REST APIs', 'Automation', 'HTTP', 'Testing'],
      likes: 210,
      illustrationSvg: `
        <svg viewBox="0 0 360 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="postmanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff6c37"/>
              <stop offset="100%" stop-color="#ea580c"/>
            </linearGradient>
          </defs>
          <rect width="360" height="180" rx="12" fill="#1e293b"/>
          <circle cx="70" cy="90" r="32" fill="url(#postmanGrad)"/>
          <text x="70" y="97" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="900" text-anchor="middle">API</text>
          
          <rect x="130" y="45" width="60" height="26" rx="4" fill="#16a34a"/>
          <text x="160" y="63" fill="#ffffff" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">GET</text>
          <text x="200" y="63" fill="#f8fafc" font-family="monospace" font-size="12">/api/v1/articles</text>
          
          <rect x="130" y="85" width="190" height="26" rx="4" fill="#334155"/>
          <text x="225" y="102" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">Status: 200 OK (24ms)</text>

          <rect x="130" y="120" width="190" height="26" rx="4" fill="#334155"/>
          <text x="225" y="137" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">PASS: Status code is 200</text>
        </svg>
      `,
      content: `
        <p><strong>Postman</strong> is the leading API development and collaboration platform. It allows engineers to design, mock, test, and document RESTful and GraphQL APIs efficiently.</p>

        <h2>1. Automated Assertions in Postman</h2>
        <p>Postman includes a powerful JavaScript test runner that executes assertions after every HTTP response:</p>
        
        <div class="code-block-wrap">
          <div class="code-block-header">
            <span>Postman (Tests Tab)</span>
            <button class="copy-code-btn" onclick="window.devStackHub.copyCode(this)">Copy Code</button>
          </div>
          <pre><code>// Verify HTTP Status Code
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

// Verify JSON payload structure
pm.test("Response contains articles array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
    pm.expect(jsonData.length).to.be.greaterThan(0);
});</code></pre>
        </div>
      `
    }
  ];

  /* ==========================================================================
     2. Application State & Storage
     ========================================================================== */
  const state = {
    theme: localStorage.getItem('devstack_theme') || 'dark',
    currentCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    bookmarkedIds: JSON.parse(localStorage.getItem('devstack_bookmarks') || '[]'),
    likedArticleIds: JSON.parse(localStorage.getItem('devstack_likes') || '[]'),
    activeArticleModalId: null
  };

  /* ==========================================================================
     3. DOM Element References
     ========================================================================== */
  const DOM = {
    html: document.documentElement,
    scrollProgressBar: document.getElementById('scrollProgressBar'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    mobileDrawerBackdrop: document.getElementById('mobileDrawerBackdrop'),
    closeDrawerBtn: document.getElementById('closeDrawerBtn'),
    bookmarksBtn: document.getElementById('bookmarksBtn'),
    bookmarkCountBadge: document.getElementById('bookmarkCountBadge'),
    bookmarksDrawer: document.getElementById('bookmarksDrawer'),
    closeBookmarksBtn: document.getElementById('closeBookmarksBtn'),
    bookmarksList: document.getElementById('bookmarksList'),
    quickSearchBtn: document.getElementById('quickSearchBtn'),
    techGrid: document.getElementById('techGrid'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    sortSelect: document.getElementById('sortSelect'),
    categoryTabs: document.getElementById('categoryTabs'),
    filterStatus: document.getElementById('filterStatus'),
    filterStatusText: document.getElementById('filterStatusText'),
    resetFilterBtn: document.getElementById('resetFilterBtn'),
    articlesGrid: document.getElementById('articlesGrid'),
    noResultsState: document.getElementById('noResultsState'),
    emptyResetBtn: document.getElementById('emptyResetBtn'),
    contactForm: document.getElementById('contactForm'),
    formSuccessMessage: document.getElementById('formSuccessMessage'),
    sendAnotherBtn: document.getElementById('sendAnotherBtn'),
    articleModal: document.getElementById('articleModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    modalBottomCloseBtn: document.getElementById('modalBottomCloseBtn'),
    modalLikeBtn: document.getElementById('modalLikeBtn'),
    modalLikeCount: document.getElementById('modalLikeCount'),
    modalBookmarkBtn: document.getElementById('modalBookmarkBtn'),
    modalShareBtn: document.getElementById('modalShareBtn'),
    modalArticleBody: document.getElementById('modalArticleBody'),
    modalFooterAuthor: document.getElementById('modalFooterAuthor'),
    toastContainer: document.getElementById('toastContainer'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    countAll: document.getElementById('countAll'),
    countFrontend: document.getElementById('countFrontend'),
    countBackend: document.getElementById('countBackend'),
    countDatabase: document.getElementById('countDatabase'),
    countTools: document.getElementById('countTools')
  };

  /* ==========================================================================
     4. Initialization & Event Bindings
     ========================================================================== */
  function init() {
    applyTheme(state.theme);
    renderTechGrid();
    updateCategoryCounts();
    renderArticles();
    updateBookmarkBadge();
    setupEventListeners();
  }

  /* ==========================================================================
     5. Theme Management (Dark & Light)
     ========================================================================== */
  function applyTheme(theme) {
    state.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    localStorage.setItem('devstack_theme', theme);
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
  }

  /* ==========================================================================
     6. Technology Badges Grid
     ========================================================================== */
  function renderTechGrid() {
    if (!DOM.techGrid) return;
    DOM.techGrid.innerHTML = TECHNOLOGIES_DATA.map(tech => `
      <div class="tech-card" data-query="${escapeHtml(tech.query)}" role="button" tabindex="0" title="View ${escapeHtml(tech.name)} articles">
        <div class="tech-icon-wrap">
          ${tech.icon}
        </div>
        <span class="tech-name">${escapeHtml(tech.name)}</span>
        <span class="tech-category-label">${escapeHtml(tech.category)}</span>
      </div>
    `).join('');
  }

  /* ==========================================================================
     7. Category Counting & Filtering Logic
     ========================================================================== */
  function updateCategoryCounts() {
    if (!DOM.countAll) return;
    const total = ARTICLES_DATA.length;
    const frontendCount = ARTICLES_DATA.filter(a => a.category === 'frontend').length;
    const backendCount = ARTICLES_DATA.filter(a => a.category === 'backend').length;
    const dbCount = ARTICLES_DATA.filter(a => a.category === 'database').length;
    const toolsCount = ARTICLES_DATA.filter(a => a.category === 'tools').length;

    DOM.countAll.textContent = total;
    DOM.countFrontend.textContent = frontendCount;
    DOM.countBackend.textContent = backendCount;
    DOM.countDatabase.textContent = dbCount;
    DOM.countTools.textContent = toolsCount;
  }

  function getFilteredArticles() {
    let list = [...ARTICLES_DATA];

    // Filter by Category
    if (state.currentCategory !== 'all') {
      list = list.filter(item => item.category === state.currentCategory);
    }

    // Filter by Search Query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const excerptMatch = item.excerpt.toLowerCase().includes(q);
        const catMatch = item.categoryLabel.toLowerCase().includes(q);
        const techMatch = item.technologies.some(t => t.toLowerCase().includes(q));
        const authorMatch = item.author.toLowerCase().includes(q);
        return titleMatch || excerptMatch || catMatch || techMatch || authorMatch;
      });
    }

    // Sort Articles
    if (state.sortBy === 'latest') {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (state.sortBy === 'readtime') {
      list.sort((a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10));
    } else if (state.sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Featured: default order with higher like counts prioritized
      list.sort((a, b) => b.likes - a.likes);
    }

    return list;
  }

  function renderArticles() {
    if (!DOM.articlesGrid) return;
    const articles = getFilteredArticles();

    // Update filter status bar
    updateFilterStatusBar(articles.length);

    if (articles.length === 0) {
      DOM.articlesGrid.innerHTML = '';
      DOM.noResultsState.style.display = 'block';
      return;
    }

    DOM.noResultsState.style.display = 'none';

    DOM.articlesGrid.innerHTML = articles.map(article => {
      const isSaved = state.bookmarkedIds.includes(article.id);
      const isLiked = state.likedArticleIds.includes(article.id);
      const likeCount = article.likes + (isLiked ? 1 : 0);

      return `
        <article class="article-card" data-id="${article.id}">
          <div class="card-media-wrap">
            <span class="card-category-tag cat-${article.category}">${escapeHtml(article.categoryLabel)}</span>
            <button class="card-bookmark-btn ${isSaved ? 'saved' : ''}" 
                    onclick="event.stopPropagation(); window.devStackHub.toggleBookmark('${article.id}')"
                    title="${isSaved ? 'Remove from saved' : 'Save article'}" 
                    aria-label="Save ${escapeHtml(article.title)}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <div class="card-svg-illustration">
              ${article.illustrationSvg}
            </div>
          </div>

          <div class="card-content">
            <div class="card-meta-top">
              <span>${escapeHtml(article.date)}</span>
              <span>•</span>
              <span class="card-read-time">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${escapeHtml(article.readTime)}
              </span>
            </div>

            <h3 class="card-title" onclick="window.devStackHub.openArticleModal('${article.id}')">${escapeHtml(article.title)}</h3>
            <p class="card-excerpt">${escapeHtml(article.excerpt)}</p>

            <div class="card-tech-chips">
              ${article.technologies.slice(0, 3).map(tech => `<span class="tech-chip">${escapeHtml(tech)}</span>`).join('')}
            </div>

            <div class="card-footer">
              <div class="card-author">
                <div class="author-avatar">${escapeHtml(article.author.charAt(0))}</div>
                <span class="author-name">${escapeHtml(article.author)}</span>
              </div>
              <button class="card-read-more-btn" onclick="window.devStackHub.openArticleModal('${article.id}')">
                <span>Read More</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateFilterStatusBar(resultsCount) {
    if (!DOM.filterStatus) return;
    const hasFilter = state.currentCategory !== 'all' || state.searchQuery.trim() !== '';

    if (hasFilter) {
      DOM.filterStatus.style.display = 'flex';
      let text = `Showing <strong>${resultsCount}</strong> article${resultsCount === 1 ? '' : 's'}`;
      if (state.currentCategory !== 'all') {
        text += ` in <strong>${state.currentCategory.toUpperCase()}</strong>`;
      }
      if (state.searchQuery.trim()) {
        text += ` matching "<em>${escapeHtml(state.searchQuery)}</em>"`;
      }
      DOM.filterStatusText.innerHTML = text;
    } else {
      DOM.filterStatus.style.display = 'none';
    }
  }

  /* ==========================================================================
     8. Dynamic Article Modal Reader
     ========================================================================== */
  function openArticleModal(articleId) {
    const article = ARTICLES_DATA.find(a => a.id === articleId);
    if (!article || !DOM.articleModal) return;

    state.activeArticleModalId = articleId;
    const isSaved = state.bookmarkedIds.includes(article.id);
    const isLiked = state.likedArticleIds.includes(article.id);
    const likeCount = article.likes + (isLiked ? 1 : 0);

    // Update Modal Action Buttons
    if (DOM.modalLikeBtn) {
      DOM.modalLikeBtn.classList.toggle('liked', isLiked);
      DOM.modalLikeCount.textContent = likeCount;
    }
    if (DOM.modalBookmarkBtn) {
      DOM.modalBookmarkBtn.classList.toggle('saved', isSaved);
      DOM.modalBookmarkBtn.querySelector('.action-btn-text').textContent = isSaved ? 'Saved' : 'Save';
    }

    // Build Modal Body Content
    DOM.modalArticleBody.innerHTML = `
      <div class="modal-header-meta">
        <span class="modal-cat-pill cat-${article.category}">${escapeHtml(article.categoryLabel)}</span>
        <h1 class="modal-title" id="modalArticleTitle">${escapeHtml(article.title)}</h1>
        <div class="modal-byline">
          <span>By <strong>${escapeHtml(article.author)}</strong> (${escapeHtml(article.authorRole)})</span>
          <span>•</span>
          <span>Published on ${escapeHtml(article.date)}</span>
          <span>•</span>
          <span>${escapeHtml(article.readTime)}</span>
        </div>
      </div>

      <div class="modal-hero-banner">
        ${article.illustrationSvg}
      </div>

      <div class="article-prose">
        ${article.content}
      </div>

      <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
        <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem;">Related Technologies:</h4>
        <div class="card-tech-chips">
          ${article.technologies.map(tech => `
            <span class="tech-chip" style="font-size: 0.8125rem; padding: 4px 10px; cursor: pointer;" onclick="window.devStackHub.filterByTech('${escapeHtml(tech)}')">${escapeHtml(tech)}</span>
          `).join('')}
        </div>
      </div>
    `;

    // Modal Author Footer
    if (DOM.modalFooterAuthor) {
      DOM.modalFooterAuthor.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="author-avatar" style="width: 38px; height: 38px; font-size: 0.9375rem;">${escapeHtml(article.author.charAt(0))}</div>
          <div>
            <div style="font-size: 0.9375rem; font-weight: 700;">${escapeHtml(article.author)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(article.authorRole)}</div>
          </div>
        </div>
      `;
    }

    if (typeof DOM.articleModal.showModal === 'function') {
      DOM.articleModal.showModal();
    } else {
      DOM.articleModal.setAttribute('open', '');
    }

    DOM.articleModal.scrollTop = 0;
    DOM.modalArticleBody.scrollTop = 0;
  }

  function closeArticleModal() {
    if (!DOM.articleModal) return;
    if (typeof DOM.articleModal.close === 'function') {
      DOM.articleModal.close();
    } else {
      DOM.articleModal.removeAttribute('open');
    }
    state.activeArticleModalId = null;
  }

  /* ==========================================================================
     9. Bookmarking & Likes Engine
     ========================================================================== */
  function toggleBookmark(articleId) {
    const idx = state.bookmarkedIds.indexOf(articleId);
    let isNowSaved = false;
    if (idx > -1) {
      state.bookmarkedIds.splice(idx, 1);
      showToast('Article removed from bookmarks', 'info');
    } else {
      state.bookmarkedIds.push(articleId);
      isNowSaved = true;
      showToast('Article saved to bookmarks!', 'success');
    }
    localStorage.setItem('devstack_bookmarks', JSON.stringify(state.bookmarkedIds));
    updateBookmarkBadge();
    renderBookmarksList();
    renderArticles();

    // Sync modal if active
    if (state.activeArticleModalId === articleId && DOM.modalBookmarkBtn) {
      DOM.modalBookmarkBtn.classList.toggle('saved', isNowSaved);
      DOM.modalBookmarkBtn.querySelector('.action-btn-text').textContent = isNowSaved ? 'Saved' : 'Save';
    }
  }

  function updateBookmarkBadge() {
    const count = state.bookmarkedIds.length;
    if (!DOM.bookmarkCountBadge) return;
    if (count > 0) {
      DOM.bookmarkCountBadge.textContent = count;
      DOM.bookmarkCountBadge.style.display = 'block';
    } else {
      DOM.bookmarkCountBadge.style.display = 'none';
    }
  }

  function renderBookmarksList() {
    if (!DOM.bookmarksList) return;
    const saved = ARTICLES_DATA.filter(a => state.bookmarkedIds.includes(a.id));

    if (saved.length === 0) {
      DOM.bookmarksList.innerHTML = `
        <div style="text-align:center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem;">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <p style="font-size: 0.875rem;">No saved articles yet.<br>Click the bookmark icon on any card to save it for later.</p>
        </div>
      `;
      return;
    }

    DOM.bookmarksList.innerHTML = saved.map(item => `
      <div class="bookmark-item">
        <div class="bookmark-thumb">
          <span class="cat-pill pill-${item.category}"></span>
        </div>
        <div class="bookmark-info">
          <h4 class="bookmark-title" onclick="window.devStackHub.openArticleModal('${item.id}'); window.devStackHub.closeBookmarksDrawer();">${escapeHtml(item.title)}</h4>
          <div class="bookmark-meta">
            <span>${escapeHtml(item.categoryLabel)}</span>
            <span>•</span>
            <span>${escapeHtml(item.readTime)}</span>
            <button class="bookmark-remove-btn" onclick="window.devStackHub.toggleBookmark('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function toggleLikeCurrentArticle() {
    if (!state.activeArticleModalId) return;
    const id = state.activeArticleModalId;
    const idx = state.likedArticleIds.indexOf(id);
    const article = ARTICLES_DATA.find(a => a.id === id);
    if (!article) return;

    let isLiked = false;
    if (idx > -1) {
      state.likedArticleIds.splice(idx, 1);
    } else {
      state.likedArticleIds.push(id);
      isLiked = true;
      showToast('Thanks for your feedback!', 'success');
    }
    localStorage.setItem('devstack_likes', JSON.stringify(state.likedArticleIds));

    const totalLikes = article.likes + (isLiked ? 1 : 0);
    DOM.modalLikeBtn.classList.toggle('liked', isLiked);
    DOM.modalLikeCount.textContent = totalLikes;
  }

  /* ==========================================================================
     10. Contact Form Real-time Validation
     ========================================================================== */
  function validateContactField(input) {
    const errorSpan = document.getElementById(input.name + 'Error');
    let isValid = true;
    let errorMsg = '';

    if (input.name === 'name') {
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your name.';
      } else if (input.value.trim().length < 2) {
        isValid = false;
        errorMsg = 'Name must be at least 2 characters.';
      }
    } else if (input.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your email address.';
      } else if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        errorMsg = 'Please enter a valid email (e.g. name@domain.com).';
      }
    } else if (input.name === 'message') {
      if (!input.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your message.';
      } else if (input.value.trim().length < 15) {
        isValid = false;
        errorMsg = 'Message must be at least 15 characters long.';
      }
    }

    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorSpan) errorSpan.textContent = '';
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (errorSpan) errorSpan.textContent = errorMsg;
    }

    return isValid;
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('submitBtn');

    const v1 = validateContactField(nameInput);
    const v2 = validateContactField(emailInput);
    const v3 = validateContactField(messageInput);

    if (!v1 || !v2 || !v3) {
      showToast('Please fix the errors in the form before submitting.', 'info');
      return;
    }

    // Simulate sending submission
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      DOM.contactForm.style.display = 'none';
      DOM.formSuccessMessage.style.display = 'flex';
      showToast('Message sent successfully!', 'success');
      DOM.contactForm.reset();
      nameInput.classList.remove('is-valid');
      emailInput.classList.remove('is-valid');
      messageInput.classList.remove('is-valid');
      document.getElementById('charCount').textContent = '0 / 500';
    }, 800);
  }

  /* ==========================================================================
     11. Toast Notifications & Helpers
     ========================================================================== */
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${escapeHtml(message)}</span>
    `;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  function copyCode(btn) {
    const wrap = btn.closest('.code-block-wrap');
    if (!wrap) return;
    const code = wrap.querySelector('pre code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = original, 2000);
      showToast('Code snippet copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy code', 'info');
    });
  }

  function filterByTech(techName) {
    closeArticleModal();
    if (DOM.searchInput) {
      DOM.searchInput.value = techName;
      state.searchQuery = techName;
      DOM.clearSearchBtn.style.display = 'flex';
      renderArticles();
      const articlesSection = document.getElementById('articles');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     12. Global Event Listeners & Interactions
     ========================================================================== */
  function setupEventListeners() {
    // Theme Toggle
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Scroll Progress & Back to Top
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (DOM.scrollProgressBar) {
        DOM.scrollProgressBar.style.width = scrolled + '%';
      }

      if (DOM.backToTopBtn) {
        if (winScroll > 300) {
          DOM.backToTopBtn.classList.add('visible');
        } else {
          DOM.backToTopBtn.classList.remove('visible');
        }
      }
    });

    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile Drawer Navigation
    if (DOM.mobileMenuBtn) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.mobileDrawer.classList.add('active');
        DOM.mobileDrawerBackdrop.classList.add('active');
      });
    }

    function closeMobileMenu() {
      DOM.mobileDrawer.classList.remove('active');
      DOM.mobileDrawerBackdrop.classList.remove('active');
    }

    if (DOM.closeDrawerBtn) DOM.closeDrawerBtn.addEventListener('click', closeMobileMenu);
    if (DOM.mobileDrawerBackdrop) DOM.mobileDrawerBackdrop.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        closeMobileMenu();
        const cat = link.getAttribute('data-cat');
        if (cat) {
          setActiveCategory(cat);
        }
      });
    });

    // Bookmarks Drawer
    if (DOM.bookmarksBtn) {
      DOM.bookmarksBtn.addEventListener('click', () => {
        renderBookmarksList();
        DOM.bookmarksDrawer.classList.add('active');
        DOM.mobileDrawerBackdrop.classList.add('active');
      });
    }

    function closeBookmarksDrawer() {
      DOM.bookmarksDrawer.classList.remove('active');
      DOM.mobileDrawerBackdrop.classList.remove('active');
    }

    if (DOM.closeBookmarksBtn) DOM.closeBookmarksBtn.addEventListener('click', closeBookmarksDrawer);

    // Quick Search Shortcut (Press '/' to focus search)
    if (DOM.quickSearchBtn) {
      DOM.quickSearchBtn.addEventListener('click', () => {
        const articlesSection = document.getElementById('articles');
        if (articlesSection) articlesSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => DOM.searchInput.focus(), 300);
      });
    }

    window.addEventListener('keydown', (e) => {
      // Focus search on '/' if not currently in an input
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const articlesSection = document.getElementById('articles');
        if (articlesSection) articlesSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => DOM.searchInput.focus(), 200);
      }
      // ESC key to close modal or drawers
      if (e.key === 'Escape') {
        if (DOM.articleModal && DOM.articleModal.hasAttribute('open')) {
          closeArticleModal();
        }
        closeMobileMenu();
        closeBookmarksDrawer();
      }
    });

    // Category Tabs Filtering
    if (DOM.categoryTabs) {
      DOM.categoryTabs.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const category = tab.getAttribute('data-category');
          setActiveCategory(category);
        });
      });
    }

    function setActiveCategory(cat) {
      state.currentCategory = cat;
      DOM.categoryTabs.querySelectorAll('.cat-tab').forEach(t => {
        const isMatch = t.getAttribute('data-category') === cat;
        t.classList.toggle('active', isMatch);
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      renderArticles();
    }

    // Category links in Navbar & Domain Cards
    document.querySelectorAll('.category-nav-link, .domain-btn, .footer-cat-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = btn.getAttribute('data-cat') || btn.getAttribute('data-category');
        if (cat) {
          setActiveCategory(cat);
          const articlesSec = document.getElementById('articles');
          if (articlesSec) articlesSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Footer Tech links
    document.querySelectorAll('.footer-tech-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tech = link.getAttribute('data-tech');
        if (tech) filterByTech(tech);
      });
    });

    // Tech Grid card clicks
    if (DOM.techGrid) {
      DOM.techGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.tech-card');
        if (card) {
          const query = card.getAttribute('data-query');
          filterByTech(query);
        }
      });
    }

    // Search Input Real-time Filter
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
        }
        renderArticles();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderArticles();
      });
    }

    // Sort Dropdown
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderArticles();
      });
    }

    // Reset Filter Button
    function resetAllFilters() {
      state.currentCategory = 'all';
      state.searchQuery = '';
      if (DOM.searchInput) DOM.searchInput.value = '';
      if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
      DOM.categoryTabs.querySelectorAll('.cat-tab').forEach(t => {
        const isAll = t.getAttribute('data-category') === 'all';
        t.classList.toggle('active', isAll);
      });
      renderArticles();
    }

    if (DOM.resetFilterBtn) DOM.resetFilterBtn.addEventListener('click', resetAllFilters);
    if (DOM.emptyResetBtn) DOM.emptyResetBtn.addEventListener('click', resetAllFilters);

    // Modal Close Triggers
    if (DOM.closeModalBtn) DOM.closeModalBtn.addEventListener('click', closeArticleModal);
    if (DOM.modalBottomCloseBtn) DOM.modalBottomCloseBtn.addEventListener('click', closeArticleModal);

    // Close modal on outside backdrop click
    if (DOM.articleModal) {
      DOM.articleModal.addEventListener('click', (e) => {
        const rect = DOM.articleModal.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
          closeArticleModal();
        }
      });
    }

    // Modal Actions (Like, Bookmark, Share)
    if (DOM.modalLikeBtn) DOM.modalLikeBtn.addEventListener('click', toggleLikeCurrentArticle);
    if (DOM.modalBookmarkBtn) {
      DOM.modalBookmarkBtn.addEventListener('click', () => {
        if (state.activeArticleModalId) toggleBookmark(state.activeArticleModalId);
      });
    }

    if (DOM.modalShareBtn) {
      DOM.modalShareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Article URL copied to clipboard!', 'success');
          });
        } else {
          showToast('Article link ready to share', 'info');
        }
      });
    }

    // Contact Form Real-time Validation
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener('submit', handleContactSubmit);

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const charCount = document.getElementById('charCount');

      if (nameInput) nameInput.addEventListener('blur', () => validateContactField(nameInput));
      if (emailInput) emailInput.addEventListener('blur', () => validateContactField(emailInput));
      if (messageInput) {
        messageInput.addEventListener('input', (e) => {
          if (charCount) charCount.textContent = `${e.target.value.length} / 500`;
          if (e.target.value.length >= 15) {
            validateContactField(messageInput);
          }
        });
        messageInput.addEventListener('blur', () => validateContactField(messageInput));
      }
    }

    if (DOM.sendAnotherBtn) {
      DOM.sendAnotherBtn.addEventListener('click', () => {
        DOM.formSuccessMessage.style.display = 'none';
        DOM.contactForm.style.display = 'flex';
      });
    }
  }

  /* ==========================================================================
     13. Public API Namespace for inline callbacks
     ========================================================================== */
  window.devStackHub = {
    openArticleModal,
    closeArticleModal,
    toggleBookmark,
    closeBookmarksDrawer: () => {
      DOM.bookmarksDrawer.classList.remove('active');
      DOM.mobileDrawerBackdrop.classList.remove('active');
    },
    filterByTech,
    copyCode,
    handleNewsletterSubmit: (form) => {
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Subscribed! Welcome to the Developer Digest.', 'success');
        input.value = '';
      }
    }
  };

  // Run initial boot when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
