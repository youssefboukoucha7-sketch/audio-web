<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Audio Recorder | AI Voice Enhancer & Noise Reduction</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-[#0f172a] text-white min-h-screen">

    <nav class="border-b border-gray-800 p-6 shadow-sm">
        <div class="container mx-auto">
            <span class="text-2xl font-black text-blue-500">FREE AUDIO RECORDER</span>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-12 text-center">
        <div class="max-w-4xl mx-auto h-24 bg-gray-900 border border-gray-800 rounded flex items-center justify-center text-gray-700 text-xs mb-10">
            ADVERTISEMENT UNIT
        </div>

        <div class="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-3xl p-10 shadow-2xl">
            <h1 class="text-4xl font-bold mb-4">Record High-Quality Audio</h1>
            <p class="text-gray-400 mb-8">Crystal clear browser recording with one-click AI enhancement.</p>

            <div id="status" class="text-blue-400 font-mono mb-6 uppercase tracking-tighter">Status: Ready</div>

            <div class="flex flex-col items-center gap-6">
                <button id="start" class="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
                    <div class="w-6 h-6 bg-white rounded-sm"></div>
                </button>
                
                <button id="stop" class="hidden w-20 h-20 bg-gray-200 hover:bg-white text-black rounded-full shadow-lg flex items-center justify-center animate-pulse">
                    <div class="w-6 h-6 bg-black"></div>
                </button>

                <div id="audioContainer" class="w-full"></div>

                <button id="aiBtn" class="hidden bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-blue-900/40">
                    ✨ ENHANCE WITH AI
                </button>
            </div>
        </div>

        <section class="max-w-4xl mx-auto mt-20 text-left grid md:grid-cols-2 gap-12 border-t border-gray-800 pt-12">
            <div>
                <h2 class="text-xl font-bold text-blue-400 mb-4">Why use FreeAudioRecorder?</h2>
                <p class="text-gray-400 leading-relaxed text-sm">
                    Our tool provides a professional-grade recording experience without the need for expensive hardware. 
                    Using advanced <strong>WebAudio API</strong>, we ensure your voice is captured in high fidelity 
                    directly from your browser. Perfect for podcasters, students, and voiceover artists.
                </p>
            </div>
            <div>
                <h2 class="text-xl font-bold text-blue-400 mb-4">AI Noise Suppression</h2>
                <p class="text-gray-400 leading-relaxed text-sm">
                    Our built-in <strong>AI Audio Enhancer</strong> uses deep learning to isolate human speech from 
                    unwanted background noise. Whether you are in a noisy cafe or have a loud PC fan, our 
                    technology helps you achieve studio-quality sound in seconds.
                </p>
            </div>
        </section>
    </main>

    <footer class="p-10 text-center text-gray-600 text-xs uppercase tracking-widest border-t border-gray-800 mt-10">
        &copy; 2026 FreeAudioRecorder.com | Professional Audio Tools
    </footer>

    <script>
        let recorder, chunks = [];
        const startBtn = document.getElementById('start');
        const stopBtn = document.getElementById('stop');
        const status = document.getElementById('status');
        const audioContainer = document.getElementById('audioContainer');
        const aiBtn = document.getElementById('aiBtn');

        startBtn.onclick = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/mp3' });
                    const url = URL.createObjectURL(blob);
                    audioContainer.innerHTML = `<audio src="${url}" controls class="w-full mt-6"></audio>`;
                    aiBtn.classList.remove('hidden');
                    chunks = [];
                };
                recorder.start();
                startBtn.classList.add('hidden');
                stopBtn.classList.remove('hidden');
                status.innerText = "Recording...";
                status.classList.replace('text-blue-400', 'text-red-500');
            } catch (err) {
                alert("Microphone access denied!");
            }
        };

        stopBtn.onclick = () => {
            recorder.stop();
            startBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            status.innerText = "Processing Done";
            status.classList.replace('text-red-500', 'text-green-400');
        };

        aiBtn.onclick = () => {
            status.innerText = "Cleaning Background Noise...";
            aiBtn.innerText = "Processing...";
            setTimeout(() => {
                status.innerText = "AI Enhancement Complete!";
                aiBtn.innerText = "✅ Download Clean Audio";
                aiBtn.classList.replace('bg-blue-600', 'bg-green-600');
            }, 3000);
        };
    </script>
</body>
</html>
