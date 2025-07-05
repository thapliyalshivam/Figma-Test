const fs = require('fs');
const path = require('path');

// Read the generated files
const uiHTML = fs.readFileSync(path.join(__dirname, 'dist', 'ui.html'), 'utf8');
const uiJS = fs.readFileSync(path.join(__dirname, 'dist', 'ui.js'), 'utf8');

// Replace script src with inline script
const inlinedHTML = uiHTML.replace(
  /<script[^>]*src="ui\.js"[^>]*><\/script>/g,
  `<script>${uiJS}</script>`
);

// Write the inlined HTML back
fs.writeFileSync(path.join(__dirname, 'dist', 'ui.html'), inlinedHTML);

console.log('✅ JavaScript inlined into ui.html');