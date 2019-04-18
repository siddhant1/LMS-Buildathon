import React from "react";
import ScreenRecorder from "./screenRecorder";

export default class ScreenRecorderContainer extends React.Component {
  state = { isRecording: false };
  toggleRecording = () => {
    this.setState({ isRecording: !this.state.isRecording }, () => {
      if (!this.state.isRecording) {
        (window as any).stopCallback();
      }
    });
  };
  render() {
    return (
      <>
        <button onClick={this.toggleRecording}>
          {this.state.isRecording ? "Stop " : "Start "}Recording
        </button>
        {this.state.isRecording && <ScreenRecorder />}
      </>
    );
  }
}
