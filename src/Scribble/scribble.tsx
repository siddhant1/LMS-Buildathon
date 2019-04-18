import React from "react";
import Canvas from "../canvas/CanvasContainer";
import Toolbar from "../toolbar/ToolbarContainer";

class Scribble extends React.Component {
  render() {
    return (
      <>
        <Toolbar key="toolbar" />
        <Canvas key="canvas" />
      </>
    );
  }
}

export default Scribble;
