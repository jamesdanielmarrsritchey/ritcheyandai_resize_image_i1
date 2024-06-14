function resizeImageDataWithAspectRatio(sourceImageId, targetImageId, newSize) {
  const sourceImage = document.getElementById(sourceImageId);
  const targetImage = document.getElementById(targetImageId);

  if (!sourceImage || !targetImage) {
    console.error('Source or target image element not found');
    return;
  }

  const processImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Determine if the image is landscape or portrait
    const isLandscape = sourceImage.width > sourceImage.height;
    let newWidth, newHeight;

    if (isLandscape) {
      newWidth = newSize;
      newHeight = (sourceImage.height / sourceImage.width) * newWidth;
    } else {
      newHeight = newSize;
      newWidth = (sourceImage.width / sourceImage.height) * newHeight;
    }

    // Set canvas size to the new dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the source image into the canvas, resizing it in the process
    ctx.drawImage(sourceImage, 0, 0, newWidth, newHeight);

    // Convert the canvas to a data URL and set it as the source of the target image
    targetImage.src = canvas.toDataURL();
  };

  // Ensure the source image is loaded before processing
  if (sourceImage.complete) {
    processImage();
  } else {
    sourceImage.onload = processImage;
  }
}

/*
Example:

window.onload = function() {
    const element = document.querySelector("#myElement");
    if (element) {
        resizeImageDataWithAspectRatio('sourceImageId', 'targetImageId', 512);
    }
};

OnClick Example: 

document.querySelector("#myButton").addEventListener("click", function() {
    const element = document.querySelector("#myElement");
    if (element) {
        resizeImageDataWithAspectRatio('sourceImageId', 'targetImageId', 512);
    }
});

*/