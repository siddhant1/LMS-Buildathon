import DrawingService from '../shared/DrawingService';
import DefaultComponent from '../shared/DefaultComponent';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import CanvasComponent from '../canvas/CanvasComponent';

import './AppComponent.scss';


/**
 * Root app component whenever the app starts.
 * @class AppComponent
 * @extends DefaultComponent
 * @example new AppComponent(document.getElementById('app'));
 */
export default class AppComponent extends DefaultComponent {

  /**
   * @prop {ToolbarComponent} toolbarComponent
   * @public
   */
  public toolbarComponent: ToolbarComponent;


  /**
   * @prop {CanvasComponent} canvasComponent
   * @public
   */
  public canvasComponent: CanvasComponent;


  /**
   * @prop {DrawingService} drawingService - service which will be injected on each component
   * @public
   */
  public drawingService: DrawingService;


  /**
   * Represents an AppComponent.
   * @constructor
   * @param {HTMLElement} $element - dom element whenever all starts
   */
  constructor($element: HTMLElement) {
    super($element);
    // manual dependency injection
    this.drawingService = new DrawingService();
    this.render();
  }


  /**
   * Get the component template
   * @public
   * @return {String}
   */
  getTemplate(): string {
    return `
    <aside id="toolbar"></aside>
    <canvas id="canvas"></canvas>`;
  }


  /**
   * Builds the component childs: toolbar component and canvas component
   * @uses ToolbarComponent
   * @uses CanvasComponent
   * @public
   */
  buildChilds(): void {
    const $toolbar: HTMLElement|null = this.$element.querySelector('#toolbar');
    const $canvas: HTMLElement|null = this.$element.querySelector('#canvas');
    if ($toolbar) {
      // tslint:disable-next-line:no-unused-expression
      this.toolbarComponent = new ToolbarComponent($toolbar, this.drawingService);
    }
    if ($canvas) {
      // tslint:disable-next-line:no-unused-expression
      this.canvasComponent = new CanvasComponent($canvas, this.drawingService);
    }
  }
}
