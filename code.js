
// code.js (Main plugin logic)
figma.showUI(__html__, { width: 300, height: 200 });

// Function to get random value within range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to randomize component properties
function randomizeComponent(node, index) {
  // Random position offset
  var offsetX = randomInRange(-100, 100);
  var offsetY = randomInRange(-100, 100);
  node.x += offsetX;
  node.y += offsetY;

  // Random rotation (if supported)
  if (node.rotation !== undefined) {
    node.rotation = randomInRange(-Math.PI / 4, Math.PI / 4); // -45 to 45 degrees
  }

  // Random opacity
  if (node.opacity !== undefined) {
    node.opacity = randomInRange(0.3, 1);
  }

  // Random scale (if it's a frame or component)
  if (node.resize && node.width !== undefined && node.height !== undefined) {
    var scale = randomInRange(0.7, 1.3);
    try {
      node.resize(node.width * scale, node.height * scale);
    } catch (e) {
      // Some nodes might not be resizable
      console.log('Could not resize node:', e);
    }
  }

  // Random fill color (for shapes with fills)
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    var fills = node.fills.slice(); // Create a copy
    for (var i = 0; i < fills.length; i++) {
      if (fills[i].type === 'SOLID') {
        fills[i] = {
          type: 'SOLID',
          color: {
            r: Math.random(),
            g: Math.random(),
            b: Math.random()
          }
        };
      }
    }
    node.fills = fills;
  }

  // If it's a text node, randomize some text properties
  if (node.type === 'TEXT') {
    figma.loadFontAsync(node.fontName).then(function() {
      if (node.fontSize !== undefined) {
        var currentSize = node.fontSize;
        node.fontSize = currentSize * randomInRange(0.8, 1.2);
      }
    });
  }

  // Randomize component properties if it's an instance
  if (node.type === 'INSTANCE') {
    var instance = node;
    
    // Get all component properties
    var componentProperties = instance.componentProperties;
    
    for (var key in componentProperties) {
      if (componentProperties.hasOwnProperty(key)) {
        var property = componentProperties[key];
        try {
          if (property.type === 'BOOLEAN') {
            var props = {};
            props[key] = Math.random() > 0.5;
            instance.setProperties(props);
          } else if (property.type === 'TEXT') {
            var randomTexts = ['Hello', 'World', 'Random', 'Text', 'Demo'];
            var props = {};
            props[key] = randomTexts[Math.floor(Math.random() * randomTexts.length)];
            instance.setProperties(props);
          }
          // For variant properties, we'd need to know the available options
          // This is more complex and would require examining the main component
        } catch (e) {
          console.log('Could not set property:', key, e);
        }
      }
    }
  }
}

// Main function to create random children
function createRandomChildren() {
  var selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('Please select a component or frame first');
    return;
  }

  var selectedNode = selection[0];
  
  // Create 5 duplicates
  for (var i = 0; i < 5; i++) {
    try {
      var duplicate = selectedNode.clone();
      
      // Position duplicates in a rough grid
      var offsetX = (i % 3) * 150;
      var offsetY = Math.floor(i / 3) * 150;
      duplicate.x = selectedNode.x + offsetX + 50;
      duplicate.y = selectedNode.y + offsetY + 50;
      
      // Add some randomization to the positioning
      duplicate.x += randomInRange(-25, 25);
      duplicate.y += randomInRange(-25, 25);
      
      // Apply random modifications
      randomizeComponent(duplicate, i);
      
      // Add to the same parent
      if (selectedNode.parent) {
        selectedNode.parent.appendChild(duplicate);
      }
      
    } catch (error) {
      console.error('Error creating duplicate:', error);
      figma.notify('Error creating duplicate ' + (i + 1) + ': ' + error);
    }
  }
  
  figma.notify('Created 5 random component children!');
}

// Listen for messages from UI
figma.ui.onmessage = function(msg) {
  if (msg.type === 'create-random-children') {
    createRandomChildren();
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
