const fs = require('fs');
const path = require('path');

// Create a simple HTML file with React CDN instead of bundled React
const simpleHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Random Component Children</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 280px;
      margin: 0 auto;
    }
    
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
      text-align: center;
    }
    
    .description {
      font-size: 12px;
      color: #666;
      line-height: 1.4;
      margin: 0;
      text-align: center;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .input-label {
      font-size: 12px;
      font-weight: 500;
      color: #333;
    }
    
    .input-field {
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 12px;
      background: white;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    
    .input-field:focus {
      outline: none;
      border-color: #007AFF;
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
    }
    
    .button-group {
      display: flex;
      gap: 8px;
    }
    
    .button {
      flex: 1;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .button-primary {
      background: #007AFF;
      color: white;
    }
    
    .button-primary:hover {
      background: #0056CC;
    }
    
    .button-secondary {
      background: #e5e5e5;
      color: #333;
    }
    
    .button-secondary:hover {
      background: #d4d4d4;
    }
    
    .features {
      font-size: 11px;
      color: #888;
      background: #fff;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }
    
    .features ul {
      margin: 0;
      padding-left: 16px;
    }
    
    .features li {
      margin-bottom: 4px;
    }
  </style>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
  <div id="react-page"></div>
  
  <script>
    const { useState } = React;
    const { createRoot } = ReactDOM;
    
    function App() {
      const [instanceCount, setInstanceCount] = useState(5);
      
      const handleGenerate = () => {
        if (instanceCount < 1 || instanceCount > 100) {
          alert('Please enter a number between 1 and 100');
          return;
        }
        
        parent.postMessage({ 
          pluginMessage: { 
            type: 'create-random-children', 
            numInstances: instanceCount 
          } 
        }, '*');
      };
      
      const handleCancel = () => {
        parent.postMessage({ 
          pluginMessage: { 
            type: 'cancel' 
          } 
        }, '*');
      };
      
      const handleInputChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setInstanceCount(value);
      };
      
      return React.createElement('div', { className: 'container' }, [
        React.createElement('h1', { className: 'title', key: 'title' }, 'Random Component Children'),
        
        React.createElement('p', { className: 'description', key: 'desc' }, 
          'Select a component or frame, specify the number of instances, then click "Generate" to create randomized copies with varied properties.'
        ),
        
        React.createElement('div', { className: 'features', key: 'features' }, [
          React.createElement('strong', { key: 'strong' }, 'What gets randomized:'),
          React.createElement('ul', { key: 'ul' }, [
            React.createElement('li', { key: 'li1' }, 'Position and rotation'),
            React.createElement('li', { key: 'li2' }, 'Opacity and scale'),
            React.createElement('li', { key: 'li3' }, 'Fill colors'),
            React.createElement('li', { key: 'li4' }, 'Component properties'),
            React.createElement('li', { key: 'li5' }, 'Text size (for text nodes)')
          ])
        ]),
        
        React.createElement('div', { className: 'input-group', key: 'input' }, [
          React.createElement('label', { 
            htmlFor: 'instanceCount', 
            className: 'input-label',
            key: 'label'
          }, 'Number of instances:'),
          React.createElement('input', {
            type: 'number',
            id: 'instanceCount',
            className: 'input-field',
            value: instanceCount,
            min: '1',
            max: '100',
            onChange: handleInputChange,
            key: 'input-field'
          })
        ]),
        
        React.createElement('div', { className: 'button-group', key: 'buttons' }, [
          React.createElement('button', {
            className: 'button button-primary',
            onClick: handleGenerate,
            key: 'generate'
          }, 'Generate Random Children'),
          React.createElement('button', {
            className: 'button button-secondary',
            onClick: handleCancel,
            key: 'cancel'
          }, 'Cancel')
        ])
      ]);
    }
    
    const container = document.getElementById('react-page');
    const root = createRoot(container);
    root.render(React.createElement(App));
  </script>
</body>
</html>`;

// Write the simple HTML to dist folder
fs.writeFileSync(path.join(__dirname, 'dist', 'ui.html'), simpleHTML);

console.log('✅ Simple React UI created in dist/ui.html');