import React from 'react';

class ScreenRecorder extends React.Component {
  state = { imageUploaded: false };
  componentDidMount() {
    if (
      !navigator.getDisplayMedia &&
      (!navigator.mediaDevices as any).getDisplayMedia
    ) {
      const error = 'Your browser does NOT supports getDisplayMedia API.';
      document.querySelector('video').style.display = 'none';
      document.getElementById('btn-start-recording').style.display = 'none';
      document.getElementById('btn-stop-recording').style.display = 'none';
      throw new Error(error);
    }
    this.captureScreen((screen: any) => {
      this.keepStreamActive(screen);
      this.captureCamera((camera: any) => {
        this.keepStreamActive(camera);
        screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
        camera.width = 320;
        camera.height = 240;
        camera.top = screen.height - camera.height;
        camera.left = screen.width - camera.width;
        // eslint-disable-next-line
        var recorder = (window as any).RecordRTC([screen, camera], {
          type: 'video',
          mimeType: 'video/webm',
          previewStream: function(s: any) {
            document.querySelector('video').muted = false;
            document.querySelector('video').srcObject = s;
            console.log(this);
          }
        });
        recorder.startRecording();
        (window as any).stopCallback = function() {
          // (window as any).stopCallback = null;
          recorder.stopRecording(function() {
            const blob = recorder.getBlob();
            console.log(URL.createObjectURL(blob));
            document.querySelector('video').srcObject = null;
            document.querySelector('video').src = URL.createObjectURL(blob);
            document.querySelector('video').muted = false;
            [screen, camera].forEach(function(stream) {
              stream.getTracks().forEach(function(track: any) {
                track.stop();
              });
            });
          });
        };
      });
    });
  }

  invokeGetDisplayMedia = (success: any, error: any) => {
    var displaymediastreamconstraints = {
      video: true
    };
    if ((navigator.mediaDevices as any).getDisplayMedia) {
      (navigator.mediaDevices as any)
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    } else {
      navigator
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    }
  };

  captureScreen = (callback:any) => {
    this.invokeGetDisplayMedia(
      (screen:any) => {
        this.addStreamStopListener(screen, function() {
          if ((window as any).stopCallback) {
            (window as any).stopCallback();
          }
        });
        callback(screen);
      },
      function(error:any) {
        console.error(error);
        alert(
          'Unable to capture your screen. Please check console logs.\n' + error
        );
      }
    );
  };

  captureCamera = (cb:any) => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(cb);
  };
  keepStreamActive = (stream:any) => {
    var video = document.createElement('video');
    video.muted = true;
    video.srcObject = stream;
    video.style.display = 'none';
    (document.body || document.documentElement).appendChild(video);
  };

  addStreamStopListener = (stream:any, callback:any) => {
    stream.addEventListener(
      'ended',
      function() {
        callback();
        callback = function() {};
      },
      false
    );
    stream.addEventListener(
      'inactive',
      function() {
        callback();
        callback = function() {};
      },
      false
    );
    stream.getTracks().forEach(function(track:any) {
      track.addEventListener(
        'ended',
        function() {
          callback();
          callback = function() {};
        },
        false
      );
      track.addEventListener(
        'inactive',
        function() {
          callback();
          callback = function() {};
        },
        false
      );
    });
  };
  render() {
    return (
      <>
        <video
          controls
          autoPlay
          playsInline
          style={{ width: '40%', display: 'none' }}
        />
      </>
    );
  }
}

export default ScreenRecorder;
