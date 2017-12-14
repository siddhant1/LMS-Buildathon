import DefaultComponent from '../shared/DefaultComponent';
import DrawingService from '../shared/DrawingService';

import './ToolbarComponent.scss';


/**
 * Toolbar component handles all the app controls such as color selection,
 * weight, undo, redo, clean, etc.
 * @class ToolbarComponent
 * @extends DefaultComponent
 * @uses DrawingService
 * @example new ToolbarComponent(document.getElementById('toolbar'), drawingService);
 */
export default class ToolbarComponent extends DefaultComponent {

  /**
   * @prop {number[]} weights - array of weight numbers
   * @public
   */
  weights: number[] = [1, 2, 4, 6];


  /**
   * @prop {string[]} colors - array of hex color strings
   * @public
   */
  colors: string[] = [
    '#F63E2C', '#EC075C', '#9908A5', '#682BB5', '#3C48C1', '#45B052', '#019688', '#01BAD4',
    '#00A4F5', '#0F90F2', '#88C54B', '#CDDD3F', '#FEEE39', '#FEC224', '#FA9B1C', '#000000',
    '#5F7C8C', '#9D9D9D', '#7A5447', '#FF5406'];


  /**
   * Represents an ToolbarComponent
   * @constructor
   * @param {HTMLElement} $element - dom element whenever all starts
   * @param {DrawingService} drawingService - 'injected' service
   */
  constructor($element: HTMLElement, public drawingService: DrawingService) {
    super($element);
    this.render();
  }


  /**
   * Get the component template
   * @public
   * @return {String}
  */
  getTemplate(): string {
    return `
    <h3>Select a color</h3>
    <ul id="color-picker"></ul>
    <h3>Select weight</h3>
    <ul id="weight-picker"></ul>
    <h3>Undo, redo & clear</h3>
    <a id="toolbar-undo" class="toolbar-button edit-item">&olarr;</a>
    <a id="toolbar-redo" class="toolbar-button edit-item">&orarr;</a>
    <a id="toolbar-clear" class="toolbar-button edit-item">&times;</a>`;
  }


  /**
   * Selects the color and re-renders the color-picker menu
   * @public
   * @uses DrawingService
   * @param {String} color
   */
  selectColor(color: string) {
    this.drawingService.selectedColor = color;
    this.mapChild('#color-picker', this.generateColors());
  }


  /**
   * Map the colors and create a list of elements, binding the events for each element
   * @public
   * @uses DrawingService
   * @example <li class="toolbar-button color-item selected" style="background-color: rgb(69, 176, 82);"></li>
   * @returns {HTMLLIElement[]}
   */
  generateColors(): HTMLLIElement[] {
    return this.colors.map((color: string) => {
      const li: HTMLLIElement = document.createElement('li');
      li.classList.add('toolbar-button', 'color-item');
      if (color === this.drawingService.selectedColor) {
        li.classList.add('selected');
      }
      li.style.backgroundColor = color;
      li.onclick = this.selectColor.bind(this, color);
      return li;
    });
  }


  /**
   * Selects the weight and re-render the weight-picker menu
   * @public
   * @uses DrawingService
   * @param {Number} weight
   */
  selectWeight(weight: number) {
    this.drawingService.selectedWeight = weight;
    this.mapChild('#weight-picker', this.generateWeights());
  }


  /**
   * Map the weights and create a list of elements, binding the events for each element
   * @public
   * @uses DrawingService
   * @example <li class="toolbar-button weight-item selected"><span style="border-bottom-width: 2px;"></span></li>
   * @returns {HTMLLIElement[]}
   */
  generateWeights(): HTMLLIElement[] {
    return this.weights.map((weight: number) => {
      const li: HTMLLIElement = document.createElement('li');
      li.classList.add('toolbar-button', 'weight-item');
      if (weight === this.drawingService.selectedWeight) {
        li.classList.add('selected');
      }
      const span: HTMLSpanElement = document.createElement('span');
      span.style.borderBottomWidth = `${weight}px`;
      li.appendChild(span);
      li.onclick = this.selectWeight.bind(this, weight);
      return li;
    });
  }


  /**
   * Builds the component childs, color menu, weight menu,
   * and bind the events for undo, redo and clear buttons
   * @public
   * @uses DrawingService
   */
  buildChilds() {
    this.mapChild('#color-picker', this.generateColors());
    this.mapChild('#weight-picker', this.generateWeights());

    this.clickElement('#toolbar-undo', () => this.drawingService.emitter.emit('undo'))
    this.clickElement('#toolbar-redo', () => this.drawingService.emitter.emit('redo'))
    this.clickElement('#toolbar-clear', () => this.drawingService.emitter.emit('clear'));
  }
}
