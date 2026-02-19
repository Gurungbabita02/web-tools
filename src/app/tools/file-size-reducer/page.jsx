"use client";
import React, { useState, useCallback } from "react";
import ConversionComp from "@/app/components/ConversionComp";
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineCheck } from "react-icons/md";
import AdBanner from "@/app/components/AdBanner";
import SeoContent from "@/app/components/SeoContent";

const FileSizeReducerPage = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [status, setStatus] = useState("idle");
  const [quality, setQuality] = useState(0.5);
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);

  const clearHandler = () => {
    setErrorMsg("");
    setOriginalFile(null);
    setCompressedBlob(null);
    setStatus("idle");
    setProgress(0);
  };

  const compressPDF = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        setErrorMsg(
          `"${file.name}" is not a PDF file. Please upload a valid .pdf file.`
        );
        setOriginalFile(null);
        setCompressedBlob(null);
        setStatus("idle");
        return;
      }

      setErrorMsg("");
      setOriginalFile(file);
      setCompressedBlob(null);
      setStatus("compressing");
      setProgress(0);

      try {
        // Dynamically import to avoid SSR issues
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.js");
        const { jsPDF } = await import("jspdf");

        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;

        // Scale adapts to quality — lower quality = lower resolution = smaller file
        const scale = 1 + quality; // 0.1 → 1.1x, 0.5 → 1.5x, 0.9 → 1.9x

        const firstPage = await pdf.getPage(1);
        const firstViewport = firstPage.getViewport({ scale });

        const doc = new jsPDF({
          orientation:
            firstViewport.width > firstViewport.height
              ? "landscape"
              : "portrait",
          unit: "px",
          format: [firstViewport.width, firstViewport.height],
          compress: true,
        });

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");

          await page.render({ canvasContext: ctx, viewport }).promise;

          const imgData = canvas.toDataURL("image/jpeg", quality);

          if (i > 1) {
            doc.addPage(
              [viewport.width, viewport.height],
              viewport.width > viewport.height ? "landscape" : "portrait"
            );
          }

          doc.addImage(imgData, "JPEG", 0, 0, viewport.width, viewport.height);

          // Update progress
          setProgress(Math.round((i / totalPages) * 100));

          // Clean up canvas
          canvas.width = 0;
          canvas.height = 0;
        }

        const pdfBlob = doc.output("blob");

        // Check if compression actually reduced the size
        if (pdfBlob.size >= file.size) {
          setErrorMsg(
            "This PDF is already optimized. Compression did not reduce the file size. Try lowering the quality slider."
          );
          setStatus("idle");
          setOriginalFile(null);
          return;
        }

        setCompressedBlob(pdfBlob);
        setStatus("done");
      } catch (err) {
        console.error("PDF compression error:", err);
        setErrorMsg("Failed to compress PDF. The file may be corrupted or password-protected.");
        setStatus("error");
      }
    },
    [quality]
  );

  const downloadPDF = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${originalFile?.name || "file.pdf"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const compressionPercent =
    originalFile && compressedBlob
      ? (
          ((originalFile.size - compressedBlob.size) / originalFile.size) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <ConversionComp
        title={"Compress PDF File Size"}
        accept={"application/pdf"}
        input={originalFile}
        onchange={compressPDF}
      />

      {/* Ad after upload */}
      {/* <AdBanner adSlot="YOUR_AD_SLOT_3" /> */}

      {/* Validation Error */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded-xl mt-5 flex items-center gap-2">
          <span className="text-lg">&#9888;</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quality Slider */}
      {originalFile && (
        <div className="bg-white p-5 rounded-xl mt-5">
          <label className="text-gray-600 font-medium">
            Compression Quality: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full mt-2 accent-[#014FD6]"
            disabled={status === "compressing"}
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
          <button
            className="bg-blue-500 px-3 py-2 text-white rounded-md mt-3 cursor-pointer hover:bg-blue-600"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
      )}

      {/* Compressing Status with Progress */}
      {status === "compressing" && (
        <div className="bg-white p-5 rounded-xl mt-5">
          <div className="flex items-center gap-3 text-gray-600">
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            <span>Compressing PDF... {progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error Status */}
      {status === "error" && !errorMsg && (
        <div className="bg-white p-5 rounded-xl mt-5 text-red-500">
          Failed to compress PDF. Please try a different file.
        </div>
      )}

      {/* Result */}
      {status === "done" && compressedBlob && (
        <ul className="bg-white p-5 rounded-xl mt-5">
          <li className="flex flex-wrap justify-between mt-2 items-center rounded-lg bg-[#F5F7F9] p-4 text-gray-600 hover:bg-[#d2e3ff] gap-3">
            <div className="flex items-center gap-2">
              <MdOutlineCheck className="text-green-500 text-xl" />
              <span className="text-green-500 font-medium">Compressed</span>
            </div>
            <p>Original: {formatSize(originalFile.size)}</p>
            <p>Compressed: {formatSize(compressedBlob.size)}</p>
            <p className="text-green-600 font-medium">
              -{compressionPercent}%
            </p>
            <button
              className="hover:text-[#014FD6] cursor-pointer text-xl"
              onClick={downloadPDF}
            >
              <RiDownloadLine />
            </button>
          </li>
        </ul>
      )}
      {/* SEO Content */}
      <SeoContent
        title="How to Compress PDF Files Online"
        description="Our free online PDF compressor reduces your PDF file size in seconds. Simply upload your PDF, choose the compression quality, and download the smaller file. All processing happens in your browser — your files are never uploaded to any server, keeping them 100% private and secure."
        faqs={[
          {
            question: "Is this PDF compressor free?",
            answer: "Yes, it is completely free with no limits. No signup, no watermark, no hidden charges.",
          },
          {
            question: "How much can I reduce the PDF size?",
            answer: "You can reduce PDF size by up to 80% depending on the content. Image-heavy PDFs compress the most.",
          },
          {
            question: "Is my file safe?",
            answer: "Absolutely. Your PDF is processed entirely in your browser. No file is ever uploaded to a server.",
          },
          {
            question: "What is the maximum file size I can compress?",
            answer: "There is no hard limit since everything runs in your browser. However, very large PDFs (100MB+) may be slow depending on your device.",
          },
          {
            question: "Does compression reduce PDF quality?",
            answer: "You can control the quality using the slider. Higher quality means larger file size. For most documents, 50-60% quality gives the best balance.",
          },
        ]}
      />

      {/* Ad at bottom */}
      {/* <AdBanner adSlot="YOUR_AD_SLOT_4" /> */}
    </div>
  );
};

export default FileSizeReducerPage;
