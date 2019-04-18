import React from "react";
import ReactDOM from "react-dom";

interface State {
    recording:boolean,
    videos:String[]
}
const videoType = "video/webm";
export default class WebCamRecorder extends React.Component<any, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // show it to user
    (this as any).video.srcObject = stream;
    (this as any).video.play();
    // init recording
    (this as any).mediaRecorder = new (window as any).MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    (this as any).chunks = [];
    // listen for data from media recorder
    (this as any).mediaRecorder.ondataavailable = (e:any) => {
      if (e.data && e.data.size > 0) {
        (this as any).chunks.push(e.data);
      }
    };
  }

  startRecording(e:any) {
    e.preventDefault();
    // wipe old data chunks
    (this as any).chunks = [];
    // start recorder with 10ms buffer
    (this as any).mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e:any) {
    e.preventDefault();
    // stop the recorder
    (this as any).mediaRecorder.stop();
    // say that we're not recording
    (this as any).setState({ recording: false });
    // save the video to memory
    this.saveVideo();
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob((this as any).chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = (this as any).state.videos.concat([videoURL]);
    this.setState({ videos });
  }

  deleteVideo(videoURL:any) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter(v => v !== videoURL);
    this.setState({ videos });
  }

  render() {
    const { recording, videos } = this.state;
    return (
      <div className="camera">
        <video 
          style={{ width: 1000, marginLeft: 220 }}
          ref={v => {
            (this as any).video = v;
          }}
          
        >
          Video stream not available.
        </video>
        <div>
          {!recording && (
            <button onClick={e => this.startRecording(e)} style={{marginLeft: 220}}>Record</button>
          )}
          {recording && (
            <button onClick={e => this.stopRecording(e)} style={{marginLeft: 220}}>Stop</button>
          )}
        </div>
        <div>
          <h3>Recorded videos:</h3>
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video style={{width: 200}} controls src={videoURL.toString()} autoPlay loop />
              <div>
                <button onClick={() => this.deleteVideo(videoURL)}>Delete</button>
                <a href={videoURL.toString()}>Download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
