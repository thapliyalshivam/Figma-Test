import React, { useState } from 'react';
import './App.css';

const App = () => {
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

  return (
    <div className="container">
      <h1 className="title">Random Component Children</h1>
      
      <p className="description">
        Select a component or frame, specify the number of instances, then click "Generate" to create randomized copies with varied properties.
      </p>
      
      <div className="features">
        <strong>What gets randomized:</strong>
        <ul>
          <li>Position and rotation</li>
          <li>Opacity and scale</li>
          <li>Fill colors</li>
          <li>Component properties</li>
          <li>Text size (for text nodes)</li>
        </ul>
      </div>
      
      <div className="input-group">
        <label htmlFor="instanceCount" className="input-label">
          Number of instances:
        </label>
        <input
          type="number"
          id="instanceCount"
          className="input-field"
          value={instanceCount}
          min="1"
          max="100"
          onChange={handleInputChange}
        />
      </div>
      
      <div className="button-group">
        <button className="button button-primary" onClick={handleGenerate}>
          Generate Random Children
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default App;