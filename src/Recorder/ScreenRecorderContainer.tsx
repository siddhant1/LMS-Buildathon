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
      <div>
        {this.state.isRecording && <ScreenRecorder />}

        <video controls width="1250">
          <source
            src={localStorage.getItem("video_screen_url") || ""}
            type="video/webm"
          />
        </video>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <div>
            <img
              src="../assets/images/recordicon.PNG"
              style={{ width: 63, height: 40, marginLeft: 20 }}
              alt=""
            />
          </div>
          <div>
            <button onClick={this.toggleRecording} style={{ marginTop: 10 }}>
              {this.state.isRecording ? "Stop " : "Start "}Recording
            </button>
          </div>
          <div>
            <img
              src="../assets/images/save.PNG"
              style={{ width: 102, height: 40, marginLeft: 20 }}
              alt=""
            />
          </div>
          <div>
            <img
              src="../assets/images/rerecord.PNG"
              style={{ width: 102, height: 40, marginLeft: 20 }}
              alt=""
            />
          </div>
          <div>
            <img
              src="../assets/images/time.PNG"
              style={{ width: 102, height: 35, marginLeft: 20 }}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
