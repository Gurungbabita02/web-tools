"use client";
import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import { RiDownloadLine } from "react-icons/ri";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const canvasRef = useRef(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrImage(url);
    } catch (err) {
      console.error("QR generation failed:", err);
    }
  };

  const downloadQR = (format) => {
    if (!qrImage) return;
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `qrcode.${format}`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          QR Code Generator
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Generate QR codes for URLs, text, phone numbers, or anything
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          {/* Left - Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Enter Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:outline-none"
              placeholder="https://example.com or any text..."
            />

            {/* Size */}
            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min={100}
                max={600}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div className="flex gap-6 mt-4">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  QR Color
                </label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={generateQR}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition"
            >
              Generate QR Code
            </button>
          </div>

          {/* Right - Preview */}
          <div className="flex flex-col items-center justify-center">
            {qrImage ? (
              <>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
                  <img
                    src={qrImage}
                    alt="Generated QR Code"
                    ref={canvasRef}
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => downloadQR("png")}
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <RiDownloadLine /> Download PNG
                  </button>
                </div>
              </>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-16 text-center">
                <p className="text-gray-400 text-lg">
                  Your QR code will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
