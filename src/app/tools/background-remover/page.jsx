"use client";
import React, { useState, useRef } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";

const BackgroundRemover = () => {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tolerance, setTolerance] = useState(30);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputImage(event.target.result);
      setOutputImage(null);
    };
    reader.readAsDataURL(file);
  };

  const removeBackground = () => {
    if (!inputImage) return;
    setLoading(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample the background color from the top-left corner
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate color distance from the background color
        const distance = Math.sqrt(
          (r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2
        );

        if (distance < tolerance) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setOutputImage(canvas.toDataURL("image/png"));
      setLoading(false);
    };
    img.src = inputImage;
  };

  const downloadImage = () => {
    if (!outputImage) return;
    const a = document.createElement("a");
    a.href = outputImage;
    a.download = "removed-bg.png";
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Background Remover
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Remove background from images instantly - works best with solid
          colored backgrounds
        </p>

        {/* Upload Area */}
        {!inputImage && (
          <div className="bg-[#ECF3FF] border border-dashed border-sky-400 rounded-2xl mt-8">
            <label
              htmlFor="bg-file"
              className="flex justify-center items-center flex-col py-16 cursor-pointer"
            >
              <AiOutlineCloudUpload className="text-5xl text-blue-500" />
              <h3 className="text-gray-600 text-xl mt-3">
                Click or Drag your image here
              </h3>
              <p className="text-gray-400 mt-1">Supports PNG, JPG, WEBP</p>
              <input
                id="bg-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}

        {/* Controls */}
        {inputImage && !outputImage && (
          <div className="mt-6 text-center">
            <div className="max-w-md mx-auto mb-4">
              <label className="block text-gray-600 font-medium mb-2">
                Tolerance: {tolerance} (higher = removes more)
              </label>
              <input
                type="range"
                min={5}
                max={150}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={removeBackground}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Remove Background"}
            </button>
          </div>
        )}

        {/* Preview */}
        {inputImage && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Original */}
            <div>
              <h3 className="font-medium text-gray-600 mb-3 text-center">
                Original
              </h3>
              <div className="border rounded-xl overflow-hidden">
                <img
                  src={inputImage}
                  alt="Original"
                  className="w-full object-contain max-h-[400px]"
                />
              </div>
            </div>

            {/* Result */}
            <div>
              <h3 className="font-medium text-gray-600 mb-3 text-center">
                Result
              </h3>
              <div
                className="border rounded-xl overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }}
              >
                {outputImage ? (
                  <img
                    src={outputImage}
                    alt="Background Removed"
                    className="w-full object-contain max-h-[400px]"
                  />
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-gray-400">
                    Click &quot;Remove Background&quot; to see result
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Download */}
        {outputImage && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              <RiDownloadLine /> Download PNG
            </button>
            <button
              onClick={() => {
                setInputImage(null);
                setOutputImage(null);
              }}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Upload New Image
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default BackgroundRemover;
