import React, { Component } from 'react';
import Toolbar from '../toolbar/ToolbarContainer';
import Canvas from '../canvas/CanvasContainer';

import './App.scss';

/**
 * Root app component whenever the app starts.
 * @class App
 * @extends React.Component
 * @example <App />
 */
class App extends Component {
  /**
   * @method render
   * @returns JSX.Element[]
   */
  render() {
    return [
      <Toolbar key='toolbar' />,
      <Canvas key='canvas' />
    ];
  }
}

export default App
