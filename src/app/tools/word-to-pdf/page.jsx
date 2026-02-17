"use client"
import React, { useState } from 'react'
import mammoth from "mammoth";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import ConversionComp from '@/app/components/ConversionComp';

const WordToPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onchange = (e) => {
    setFile(e.target.files[0]);
  };

  const convertToPdf = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // 1. Read Word file
      const arrayBuffer = await file.arrayBuffer();
      // 2. Extract text from .docx using mammoth
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      if (!text.trim()) {
        throw new Error("No text found in the document.");
      }

      // 3. Create PDF using jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 7;
      let cursorY = margin;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // 4. Split text into paragraphs
      const paragraphs = text.split("\n");

      paragraphs.forEach((para) => {
        if (!para.trim()) {
          cursorY += lineHeight; // empty line spacing
          return;
        }

        // Wrap long text into lines
        const lines = doc.splitTextToSize(para.trim(), maxWidth);

        lines.forEach((line) => {
          // Add new page if bottom reached
          if (cursorY + lineHeight > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
          }

          doc.text(line, margin, cursorY);
          cursorY += lineHeight;
        });

        cursorY += 2; // paragraph spacing
      });

      // 5. Download PDF
      const pdfBlob = doc.output("blob");
      saveAs(pdfBlob, file.name.replace(/\.docx?$/, ".pdf"));

    } catch (err) {
      console.error("Conversion failed:", err);
      alert("Conversion failed. Make sure it's a valid Word file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <ConversionComp onchange={onchange} accept={".doc,.docx"} title={"Convert Word files to Pdf files"}/>
      
      {file && (
        <div className="text-center mb-10">
          <button
            onClick={convertToPdf}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WordToPdf;