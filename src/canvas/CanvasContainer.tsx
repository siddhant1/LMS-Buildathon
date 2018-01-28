import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './Canvas';


import { addSnapShot } from './ducks/canvas';

/**
 * Root app component whenever the app starts.
 * @class CanvasContainer
 * @extends React.Component
 * @example <Canvas />
 */
class CanvasContainer extends Component<any, any> {
  render() {
    return (
      <Canvas {...this.props} />
    )
  }
}


function mapStateToProps(state: any, props: any) {
  const selectedColor = state.toolbar.get('selectedColor');
  const selectedWeight = state.toolbar.get('selectedWeight');
  const version = state.canvas.get('version');
  const snapshots = state.canvas.get('snapshots');
  return {
    version,
    snapshots,
    selectedColor,
    selectedWeight
  };
}


function mapDispatchToProps(dispatch: any, props: any) {
  console.log(arguments);
  return {
    addSnapShot: (snapshot: string) => {
      dispatch(addSnapShot(snapshot));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
