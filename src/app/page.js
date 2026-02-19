"use client"
import React, { useState } from "react";
import { FaRegFilePdf, FaRegFileWord } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineFileJpg } from "react-icons/ai";
import { FcRemoveImage } from "react-icons/fc";
import { CiFileOn } from "react-icons/ci";
import { MdOutlineTextFields } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";
import { TbBackground } from "react-icons/tb";
import { BiMerge } from "react-icons/bi";
import AdBanner from "./components/AdBanner";

const Page = () => {
  const tools = [
    {pdfTools:[
      { icon: <FaRegFileWord  />, title: "PDF to Word", desc: "Convert PDF files into Word file", link: "/tools/pdf-to-word" },
   { icon: <FaRegFilePdf />, title: "Word to PDF", desc: "Convert word into PDF files", link: "/tools/word-to-pdf" },
   { icon: <CiFileOn />, title: "PDF Compressor", desc: "Compress files online", link: "/tools/file-size-reducer" },
   { icon: <BiMerge />, title: "PDF Merge", desc: "Combine multiple PDF files into one", link: "/tools/pdf-merge" },
    ]},

    {imageTools:[
       { icon: <CiImageOn />, title: "Image Compressor", desc: "Reduce image size without losing quality", link: "/tools/image-compress" },
       { icon: <CiImageOn />, title: "Image to WebP", desc: "Convert image to webp without losing quality", link: "/tools/image-webp" },
      { icon: <CiImageOn />, title: "PNG to JPG", desc: "Convert PNG  image to JPG image without losing quality", link: "/tools/image-compress" },
      { icon: <TbBackground />, title: "Background Remover", desc: "Remove background from images instantly", link: "/tools/background-remover" },
    ]},
    {textTools:[
      { icon: <MdOutlineTextFields  />, title: "Word/Character counter", desc: "Count the word and character", link: "/tools/text-tools" },
    ]},
    {generatorTools:[
      { icon: <IoQrCodeOutline />, title: "QR Code Generator", desc: "Generate QR codes for URLs, text or anything", link: "/tools/qr-code-generator" },
    ]}
  ];
const[tab,setTab]=useState("pdfTools")
const activeTools = tools.find(group => group[tab])?.[tab] || [];
const toolCategory=[
  {name:"PDF Tools",title:"pdfTools"},
  {name:"Image Tools",title:"imageTools"},
  {name:"Text Tools",title:"textTools"},
  {name:"Generators",title:"generatorTools"}
]
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
       <div className="grid md:grid-cols-2">
       <div>
        <h2 className="md:text-4xl font-semibold">Simply Your PDF Task with <span className="text-blue-600">Small PDF</span></h2>
        <p className="text-lg pt-3">All the tools you&apos;ll need to be more productive and work smarter with documents.</p>
       <div className="flex gap-3 mt-4">
        <button className="b text-white px-4 py-[6px] rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition">Free Trial</button>
        <a href="#tools">Explore all PDF tools</a>
       </div>
       </div>
       <div>

       </div>
       </div>
      </section>

      {/* Ad after hero */}
      <div className="max-w-7xl mx-auto px-6">
        {/* <AdBanner adSlot="YOUR_AD_SLOT_1" /> */}
      </div>

      {/* What is this */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-4">What is this website?</h2>
        <p className="text-gray-600 leading-relaxed">
          This platform provides a collection of easy-to-use online tools that help you manage your files
          without installing any software. Whether you need to convert PDFs, compress images, reduce file size,
          or optimize documents for sharing, you can do it all in one place — directly in your browser.
        </p>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: "⚡", title: "Fast & Simple", desc: "No complex steps. Upload, process, download." },
            { icon: "🔒", title: "Secure", desc: "Files are processed automatically and deleted after use." },
            { icon: "💯", title: "Free to Use", desc: "Most tools are completely free with no signup." },
          ].map((f, i) => (
            <div key={i} className="text-center bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 py-10">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-500 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16" id="tools">
        <h2 className="text-2xl font-bold mb-8 text-center ">Tool Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {toolCategory?.map((c, i) => (
            <div key={i} className={` text-indigo-700 py-4 rounded-xl font-medium cursor-pointer  ${c.title === tab ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" : "bg-indigo-50"}`} onClick={()=>{setTab(c.title)}}>
              {c.name}
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 pb-24">
        { activeTools?.map((tool, i) => (
          
          <a
            key={i}
            href={tool.link}
            className={`group  rounded-2xl border-2 bg-white  ${i==0?" text-blue-500 hover:bg-[#f4f7ff]":i==1?" hover:bg-[#effbf2]  text-green-400":i==2?"bg-[#FFF2C1] text-yellow-500 hover:bg-[#fffcef]":i==3?"bg-[#E8E4FC] text-purple-500 hover:bg-[#f2f2ff]":"bg-[#F9D7D5] text-red-500"} p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition`}
          >
            <div className={`w-14 h-14 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center rounded-full text-3xl mb-5 ${i==0?"bg-[#E6ECFF] text-blue-500":i==1?"bg-[#DDFFE5] text-green-400":i==2?"bg-[#FFF2C1] text-yellow-500":i==3?"bg-[#E8E4FC] text-purple-500":"bg-[#F9D7D5] text-red-500"}`}>
              {tool.icon}
            </div>
            <h3 className="text-lg font-semibold">{tool.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{tool.desc}</p>
            <div className="mt-5 text-blue-600 font-medium">Use Tool →</div>
          </a>
        ))}
      </section>

      {/* Ad before CTA */}
      <div className="max-w-7xl mx-auto px-6">
        {/* <AdBanner adSlot="YOUR_AD_SLOT_2" /> */}
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl font-bold">Start Using Our Tools Now</h2>
        <p className="mt-4 opacity-90">
          No registration. No downloads. Just simple online tools that work.
        </p>
        <a
          href="#"
          className="inline-block mt-8 bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Browse All Tools
        </a>
      </section>

    </main>
  );
};

export default Page;
