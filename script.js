<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Audio Recorder</title>
</head>
<body>

  <h2>🎤 Audio Recorder</h2>

  <button id="startBtn">Start Recording</button>
  <button id="stopBtn" disabled>Stop Recording</button>

  <h3>Playback:</h3>
  <audio id="audioPlayback" controls></audio>

  <br><br>
  <a id="downloadLink" style="display:none;">Download Recording</a>

  <script>
    let mediaRecorder;
    let audioChunks = [];

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const audioPlayback = document.getElementById('audioPlayback');
    const downloadLink = document.getElementById('downloadLink');

    startBtn.onclick = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      audioChunks = [];

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        audioPlayback.src = audioUrl;

        downloadLink.href = audioUrl;
        downloadLink.download = 'recording.webm';
        downloadLink.style.display = 'block';
        downloadLink.innerText = 'Download Recording';
      };

      startBtn.disabled = true;
      stopBtn.disabled = false;
    };

    stopBtn.onclick = () => {
      mediaRecorder.stop();
      startBtn.disabled = false;
      stopBtn.disabled = true;
    };
  </script>

</body>
</html>
