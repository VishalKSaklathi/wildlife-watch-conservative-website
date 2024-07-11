// Function to start the webcam
async function startCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const output = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();

        // Load MobileNet model
        const model = await mobilenet.load();

        // Function to classify the image from the webcam feed
        async function classifyImage() {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const predictions = await model.classify(canvas);
            const topPrediction = predictions[0].className;
            output.textContent = `Identified Animal: ${topPrediction}`;
        }

        // Start classifying image from the webcam feed every 2 seconds
        setInterval(classifyImage, 2000);

    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}

// Start the webcam when the page loads
startCamera();
