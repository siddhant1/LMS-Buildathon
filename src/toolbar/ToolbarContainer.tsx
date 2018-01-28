import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';

// export interface ToolbarContainerProps extends JSX.IntrinsicAttributes {
//   colors: string[]
//   selectedColor?: string
//   weights: number[]
//   selectedWeight?: number
//   setColor: Function
//   setWeight: Function
//   undo: Function
//   redo: Function
//   clear: Function
// }


// duck
import { setColor, setWeight } from './ducks/toolbar';
import { undoAction, redoAction, emptyAction } from '../canvas/ducks/canvas';


class ToolbarContainer extends Component<any, {}> {
  render() {
    const { children, ...props} = this.props;
    return <Toolbar {...props} />
  }
}


function mapStateToProps(state: any, props: any) {
  const colors = state.toolbar.get('colors');
  const weights = state.toolbar.get('weights');
  const selectedColor = state.toolbar.get('selectedColor');
  const selectedWeight = state.toolbar.get('selectedWeight');
  return {
    colors,
    weights,
    selectedColor,
    selectedWeight
  };
}


function mapDispatchToProps(dispatch: any, props: any) {
  return {
    setColor: (color: string) => {
      dispatch(setColor(color));
    },
    setWeight: (weight: number) => {
      dispatch(setWeight(weight));
    },
    undo: () => {
      dispatch(undoAction());
    },
    redo: () => {
      dispatch(redoAction());
    },
    clear: () => {
      dispatch(emptyAction());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
