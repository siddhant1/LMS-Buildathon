import DefaultComponent from '../shared/DefaultComponent';
import DrawingService from '../shared/DrawingService';
import { PaperScope, Tool, ToolEvent, Path, Layer } from 'paper';

import './CanvasComponent.scss';


/**
 * Root app component whenever the app starts.
 * @class CanvasComponent
 * @extends DefaultComponent
 * @example new ToolbarComponent(document.getElementById('toolbar'), drawingService);
 */
export default class CanvasComponent extends DefaultComponent {

  /**
   * @prop {string[]} snapshots - array of string snapshots (history)
   * @public
   */
  snapshots: string[] = [];

  /**
   * @prop {number} version - numeral version of the snapshots starting at 0
   * @public
   */
  version = 0;


  /**
   * @prop {PaperScope} paper - paper project instance
   * @public
   */
  paper: PaperScope;


  /**
   * @prop {Tool} tool - handles the mouse events in the canvas.
   * @public
   */
  tool: Tool;


  /**
   * @prop {Path} path - drawing path, all new points while mouse drag will be added to this path
   * @public
   */
  path: Path;


  /**
   * Represents a CanvasComponent
   * @constructor
   * @param {HTMLElement} $element - dom element whenever all starts
   * @param {DrawingService} drawingService - 'injected' service
   */
  constructor($element: HTMLElement, public drawingService: DrawingService) {
    super($element);
    this.initialize();
    this.drawingService.emitter.on('undo', this.undoAction.bind(this));
    this.drawingService.emitter.on('redo', this.redoAction.bind(this));
    this.drawingService.emitter.on('clear', this.clearAction.bind(this));
  }


  /**
   * Move the version back and forth in time
   * @public
   * @param {Boolean} forward
   */
  moveVersion(forward: boolean = false) {
    this.emptyCanvas();
    if (forward) {
      this.version++;
    } else {
      this.version--;
    }
    this.paper.project.importJSON(this.snapshots[this.version]);
  }


  /**
   * Move the version back in time
   * @public
   */
  undoAction(): void {
    if (this.version === 0) {
      return;
    }
    this.moveVersion();
  }


  /**
   * Move the version forward in time
   * @public
   */
  redoAction(): void {
    if (this.version === this.snapshots.length - 1) {
      return;
    }
    this.moveVersion(true);
  }


  /**
   * Erase the canvas removing all draws
   * @public
   */
  emptyCanvas(): void {
    this.paper.project.activeLayer.removeChildren();
    this.paper.view.draw();
  }


  /**
   * Erase the canvas and the history
   * @public
   */
  clearAction(): void {
    this.emptyCanvas();
    this.snapshots = [];
    this.version = 0;
  }


  /**
   * Canvas mouse down callback: creates a new Path and
   * setup the weight and color in order to begin the draw.
   * @uses ToolEvent
   * @uses Path
   * @param {ToolEvent} event
   * @public
   */
  mouseDown(event: ToolEvent): void {
    this.path = new Path({
      strokeColor: this.drawingService.selectedColor,
      strokeWidth: this.drawingService.selectedWeight,
      strokeCap: 'round',
      strokeJoin: 'round',
    });
    this.path.add(event.point);
  }


  /**
   * Canvas mouse drag callback: adds points to the current
   * path while user moves the cursor.
   * @uses ToolEvent
   * @uses Path
   * @param {ToolEvent} event
   * @public
   */
  mouseDrag(event: ToolEvent): void {
    this.path.add(event.point);
    this.path.smooth();
  }


  /**
   * Canvas mouse up callback: stores the current version to 'snapshots'
   * from our current version of the draw.
   * @param {ToolEvent} event
   * @public
   */
  mouseUp(event: ToolEvent): void {
    this.snapshots.splice(this.version + 1, this.snapshots.length - this.version, this.paper.project.exportJSON());
    this.version = this.snapshots.length - 1;
    if (this.version < 0) {
      this.version = 0;
    }
  }


  /**
   * Initializes the Paper.js in the current canvas element, and assigns
   * the mouse events to handle the drawings.
   * @uses PaperScope
   * @uses Path
   * @uses Tool
   * @public
   */
  initialize(): void {
    this.paper = new PaperScope();
    this.paper.install(window);
    this.paper.setup('canvas');
    this.tool = new Tool();

    this.tool.onMouseDown = this.mouseDown.bind(this);
    this.tool.onMouseDrag = this.mouseDrag.bind(this);
    this.tool.onMouseUp = this.mouseUp.bind(this);
  }
}
