import React, { ReactNode } from 'react';

import './Toolbar.scss';

/**
 * Toolbar component handles all the app controls such as color selection,
 * weight, undo, redo, clean, etc.
 * @class Toolbar
 * @example <Toolbar colors={[]} weights={[]} setColor={() => void} setWeight={() => void} undo={() => void} clear={() => void}/>
 */
const Toolbar = (props: any) => {

  console.log('Props !', props);

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
        { colors.map( (color: any) => {
          let className = 'toolbar-button color-item';
          if (color === selectedColor) {
            className += ' selected';
          }
          return (<li key={color} className={className} style={{backgroundColor: color}} onClick={setColor.bind(null, color)}>&nbsp;</li>)
        }) }
      </ul>
      <h3>Select weight</h3>
      <ul id='#weight-picker'>
        { weights.map( (weight: any) => {
          let className = 'toolbar-button weight-item';
            if (weight === selectedWeight) {
              className += ' selected';
            }
          return (<li key={weight} className={className} onClick={setWeight.bind(null, weight)}><span style={{borderBottomWidth: weight}}></span></li>)
        }) }
      </ul>
      <h3>Undo, redo & clear</h3>
      <a id='toolbar-undo' className='toolbar-button edit-item' onClick={() => undo()}>{'&olarr;'}</a>
      <a id='toolbar-redo' className='toolbar-button edit-item' onClick={() => redo()}>{'&orarr;'}</a>
      <a id='toolbar-clear' className='toolbar-button edit-item' onClick={() => clear()}>{'&times;'}</a>
    </aside>
    )
}

export default Toolbar;