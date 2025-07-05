# Random Component Children - Figma Plugin

A Figma plugin that creates randomized variations of selected components with a modern React-based UI.

## Features

- **Multiple Instances**: Create 1-100 randomized copies of any selected component
- **Smart Randomization**: Applies variations to position, rotation, opacity, scale, colors, and component properties
- **Modern React UI**: Clean, responsive interface built with React and TypeScript
- **Grid Layout**: Automatically arranges instances in an optimal grid pattern

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── App.tsx          # Main React component
│   │   └── App.css          # Component styles
│   └── index.tsx            # React entry point
├── dist/                    # Built files
├── code.js                  # Figma plugin logic
├── ui.html                  # HTML entry point
├── manifest.json            # Plugin manifest
├── webpack.config.js        # Webpack configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the UI:
   ```bash
   npm run build:ui
   ```

3. For development with auto-rebuild:
   ```bash
   npm run dev
   ```

### Build Commands
- `npm run build` - Build both plugin and UI for production
- `npm run build:ui` - Build only the React UI
- `npm run build:plugin` - Build only the plugin logic
- `npm run dev` - Development mode with watch

## What Gets Randomized

- **Position**: Random offsets within a reasonable range
- **Rotation**: Random rotation between -45° and 45°
- **Opacity**: Random opacity between 30% and 100%
- **Scale**: Random scaling between 70% and 130%
- **Colors**: Random fill colors for shapes
- **Component Properties**: Boolean and text properties
- **Text Size**: Font size variations for text nodes (±20%)

## Usage

1. Select a component, frame, or any node in Figma
2. Run the "Random Component Children" plugin
3. Specify the number of instances (1-100)
4. Click "Generate Random Children"
5. The plugin will create randomized copies arranged in a grid pattern

## Technical Details

- Built with React 18 and TypeScript
- Uses Webpack for bundling
- Figma Plugin API for canvas manipulation
- Responsive CSS with Inter font family