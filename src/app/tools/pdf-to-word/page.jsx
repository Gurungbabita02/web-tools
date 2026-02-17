"use client"
import React, { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import ConversionComp from '@/app/components/ConversionComp';


import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const Jpgtopdf = () => {

 const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onchange = (e) => {
    setFile(e.target.files[0]);
  };

  const convertToWord = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // 1. Read PDF
      const arrayBuffer = await file.arrayBuffer();
      // pdfjsLib read/parse the pdf file
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // 2. Extract text from all pages
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((item) => item.str).join(" ");
        pages.push(text);
      }

      // 3. Build Word document
      const doc = new Document({
        sections: [
          {
            children: pages.map(
              (pageText) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: pageText,
                      size: 24,
                    }),
                  ],
                  spacing: { after: 200 },
                })
            ),
          },
        ],
      });

      // 4. Download .docx
      const blob = await Packer.toBlob(doc);
      // save as liabrary Helps download the file to user's computer
      saveAs(blob, file.name.replace(".pdf", ".docx"));
    } catch (err) {
      console.error("Conversion failed:", err);
      alert("Conversion failed. Make sure it's a valid PDF.");
    } finally {
      setLoading(false);
    }
  };
  return (
   <div>
    <ConversionComp title={"Covert PDF file to Word file"} onchange={onchange} accept={"pdf"}/>
    {/* <input type='file' name='file' onChange={onchange}/> */}
{file && (
        <div className="text-center mb-10">
          <button
            onClick={convertToWord}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Converting..." : "Convert to Word"}
          </button>
        </div>
      )}
   </div>
  )
}

export default Jpgtopdf
