"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDownloadLine, RiDeleteBin6Line } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const PDFMerge = () => {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(null);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    setMerged(null);
    // Reset input so same file can be added again
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMerged(null);
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    [newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ];
    setFiles(newFiles);
    setMerged(null);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      setMerged(blob);
    } catch (err) {
      console.error("Merge failed:", err);
      alert("Failed to merge PDFs. Make sure all files are valid PDFs.");
    } finally {
      setMerging(false);
    }
  };

  const downloadMerged = () => {
    if (!merged) return;
    const url = URL.createObjectURL(merged);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Merge PDF Files
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Combine multiple PDF files into one - drag to reorder
        </p>

        {/* Upload Area */}
        <div className="bg-[#ECF3FF] border border-dashed border-sky-400 rounded-2xl mt-8">
          <label
            htmlFor="pdf-files"
            className="flex justify-center items-center flex-col py-12 cursor-pointer"
          >
            <AiOutlineCloudUpload className="text-5xl text-blue-500" />
            <h3 className="text-gray-600 text-xl mt-3">
              Click to select PDF files
            </h3>
            <p className="text-gray-400 mt-1">
              Select multiple PDFs to merge them
            </p>
            <input
              id="pdf-files"
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-600 mb-3">
              Selected Files ({files.length})
            </h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#F5F7F9] p-4 rounded-lg hover:bg-[#d2e3ff] transition"
                >
                  <div className="flex items-center gap-3">
                    <FaRegFilePdf className="text-red-500 text-xl" />
                    <div>
                      <p className="font-medium text-gray-700">{file.name}</p>
                      <p className="text-sm text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 mr-2">
                      #{index + 1}
                    </span>
                    <button
                      onClick={() => moveFile(index, -1)}
                      disabled={index === 0}
                      className="p-2 rounded hover:bg-blue-100 disabled:opacity-30 transition"
                    >
                      <IoArrowUp />
                    </button>
                    <button
                      onClick={() => moveFile(index, 1)}
                      disabled={index === files.length - 1}
                      className="p-2 rounded hover:bg-blue-100 disabled:opacity-30 transition"
                    >
                      <IoArrowDown />
                    </button>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 rounded hover:bg-red-100 text-red-500 transition"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Merge Button */}
        {files.length >= 2 && !merged && (
          <div className="text-center mt-6">
            <button
              onClick={mergePDFs}
              disabled={merging}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
            >
              {merging ? "Merging..." : `Merge ${files.length} PDFs`}
            </button>
          </div>
        )}

        {files.length === 1 && (
          <p className="text-center text-amber-500 mt-4">
            Please add at least 2 PDF files to merge
          </p>
        )}

        {/* Download */}
        {merged && (
          <div className="text-center mt-6 p-6 bg-green-50 rounded-xl">
            <p className="text-green-600 font-medium text-lg">
              PDFs merged successfully!
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={downloadMerged}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
              >
                <RiDownloadLine /> Download Merged PDF
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setMerged(null);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFMerge;
