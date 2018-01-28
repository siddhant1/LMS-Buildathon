import React, { Component } from 'react';

// import DrawingService from '../shared/DrawingService';
// import DefaultComponent from '../shared/DefaultComponent';
import Toolbar from '../toolbar/ToolbarContainer';
import Canvas from '../canvas/CanvasContainer';
// import CanvasComponent from '../canvas/CanvasComponent';

import './App.scss';

/**
 * Root app component whenever the app starts.
 * @class App
 * @extends React.Component
 * @example <App />
 */
class App extends Component {


  /**
   * @prop {ToolbarComponent} toolbarComponent
   * @public
   */
  // public toolbarComponent: ToolbarComponent;


  /**
   * @prop {CanvasComponent} canvasComponent
   * @public
   */
  // public canvasComponent: CanvasComponent;


  /**
   * @prop {DrawingService} drawingService - service which will be injected on each component
   * @public
   */
  // public drawingService: DrawingService;


  /**
   * Represents an AppComponent.
   * @constructor
   * @param {HTMLElement} $element - dom element whenever all starts
   */
  // constructor($element: HTMLElement) {
  //   super($element);
  //   // manual dependency injection
  //   this.drawingService = new DrawingService();
  //   this.render();
  // }


  /**
   * Get the component template
   * @public
   * @return {String}
   */
  // getTemplate(): string {
  //   return `
  //   <aside id="toolbar"></aside>
  //   <canvas id="canvas"></canvas>`;
  // }


  render() {
    return [
      <Toolbar key='toolbar' />,
      <Canvas key='canvas' />
    ];
  }


  /**
   * Builds the component childs: toolbar component and canvas component
   * @uses ToolbarComponent
   * @uses CanvasComponent
   * @public
   */
  // buildChilds(): void {
  //   const $toolbar: HTMLElement|null = this.$element.querySelector('#toolbar');
  //   const $canvas: HTMLElement|null = this.$element.querySelector('#canvas');
  //   if ($toolbar) {
  //     // tslint:disable-next-line:no-unused-expression
  //     this.toolbarComponent = new ToolbarComponent($toolbar, this.drawingService);
  //   }
  //   if ($canvas) {
  //     // tslint:disable-next-line:no-unused-expression
  //     this.canvasComponent = new CanvasComponent($canvas, this.drawingService);
  //   }
  // }
}

export default App
