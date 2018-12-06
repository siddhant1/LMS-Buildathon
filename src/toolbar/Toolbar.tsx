import React from 'react';
import classNames from 'classnames';
import './Toolbar.scss';

/**
 * Toolbar component handles all the app controls such as color selection,
 * weight, undo, redo, clean, etc.
 * @class Toolbar
 * @example <Toolbar colors={[]} weights={[]} setColor={() => void} setWeight={() => void} undo={() => void} clear={() => void}/>
 */
const Toolbar = (props: any): JSX.Element => {
  const {
    colors,
    selectedColor,
    weights,
    selectedWeight,
    setColor,
    setWeight,
    undo,
    redo,
    clear
  } = props;

  return (
    <aside id='toolbar'>
      <h3>Select a color</h3>
      <ul id='color-picker'>
        {colors.map((color: any) => {
          const className = classNames('toolbar-button', 'color-item', { selected: color === selectedColor })
          return (
            <li
              key={color}
              className={className}
              style={{ backgroundColor: color }}
              onClick={() => setColor(color)}>
              &nbsp;
            </li>
          );
        })}
      </ul>
      <h3>Select weight</h3>
      <ul id='#weight-picker'>
        {weights.map((weight: any, index: number) => {
          const className = classNames('toolbar-button', 'weight-item', { selected: weight === selectedWeight });
          return (
            <li
              key={`menu-item-${index}`}
              className={className}
              onClick={() => setWeight(weight)}>
              <span style={{ borderBottomWidth: weight }}></span>
            </li>
          )
        })}
      </ul>
      <h3>Undo, redo & clear</h3>
      <a id='toolbar-undo' className='toolbar-button edit-item' onClick={() => undo()}>↺</a>
      <a id='toolbar-redo' className='toolbar-button edit-item' onClick={() => redo()}>↻</a>
      <a id='toolbar-clear' className='toolbar-button edit-item' onClick={() => clear()}>×</a>
    </aside>
  )
}

export default Toolbar;
