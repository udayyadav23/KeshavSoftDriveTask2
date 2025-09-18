// Node.js script to render Handlebars templates to static HTML in dist folder
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Helper for eq (used in your templates)
handlebars.registerHelper('eq', (a, b) => a === b);

// Register all partials recursively from a directory
function registerPartials(dir, prefix = '') {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      registerPartials(fullPath, prefix + file + '/');
    } else if (file.endsWith('.hbs')) {
      const partialName = prefix + path.basename(file, '.hbs');
      const partialContent = fs.readFileSync(fullPath, 'utf8');
      handlebars.registerPartial(partialName, partialContent);
    }
  });
}

const templatesDir = path.join(__dirname, 'src/templates');
const distDir = path.join(__dirname, 'dist');
const assetsSrc = path.join(__dirname, 'src/assets');
const assetsDest = path.join(distDir, 'assets');

// Register all partials
registerPartials(templatesDir);

// List of main pages to render
const pages = [
  { template: 'index.hbs', output: 'index.html' },
  { template: 'about.hbs', output: 'about.html' },
  { template: 'contact.hbs', output: 'contact.html' }
];

// Ensure dist directory exists
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// Render each page
pages.forEach(page => {
  const templatePath = path.join(templatesDir, page.template);
  if (fs.existsSync(templatePath)) {
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    // Set page variable for navbar highlighting
    let pageName = page.output.replace('.html', '');
    if (pageName === 'index') pageName = 'home';
    const html = template({ page: pageName });
    fs.writeFileSync(path.join(distDir, page.output), html, 'utf8');
    console.log(`Rendered ${page.output}`);
  }
});

// Copy assets
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
if (fs.existsSync(assetsSrc)) {
  copyDir(assetsSrc, assetsDest);
  console.log('Assets copied to dist/assets');
}
