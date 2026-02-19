"use client"
import ConversionComp from '@/app/components/ConversionComp'
import React, { useState } from 'react'
import { CiFileOn } from 'react-icons/ci'
import imageCompression from "browser-image-compression";
import { RiDownloadLine } from 'react-icons/ri';
import Image from 'next/image';
import AdBanner from '@/app/components/AdBanner';
import SeoContent from '@/app/components/SeoContent';

const ImageCompressPage = () => {
const [input,setInput]=useState("")
const [compresed,setCompressed]=useState("")

  const data=[{icon:<CiFileOn />,fileName:"file.pdf",status:"Completed",size:3.4},
    {icon:<CiFileOn/>,fileName:"file.pdf",status:"Converting",size:3.4}
  ]
 
    const handleImage = async (e) => {
      console.log("object",e.target.files[0])
       try {
    const file = e.target.files[0];
    setInput(file);

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

     
    const compressedFile = await imageCompression(file, options);
     return   setCompressed(compressedFile);

  } catch (error) {
    console.error("Image compression error:", error);
    return file;
  }
  };
    
  
 const downloadImage = () => {
    const url = URL?.createObjectURL(compresed);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed-image.jpg";
    a.click();
  };
  console.log(compresed,"input9",input)
  return (
    <div className='max-w-7xl mx-auto py-10'>
   
    <ConversionComp title={"Compress Size Of Image"} data={data} accept={"image/*"} input={input} onchange={handleImage}/>

    {/* Ad after upload */}
    {/* <AdBanner adSlot="YOUR_AD_SLOT_5" /> */}
   
  
     {compresed!=="" && (
    
        <ul className='bg-white p-5 rounded-xl mt-5 '>
          <li className='flex justify-between mt-5 items-center rounded-lg bg-[#F5F7F9] p-3 text-gray-600 hover:bg-[#d2e3ff]'>
          <Image
            src={URL?.createObjectURL(compresed)}
            alt="compressed"
            width="100"
            height={100}
          />
          <p className=''>Compressed Size: {(compresed.size / 1024).toFixed(2)} KB</p>
         {input && (
        <p className=''>Original Size: {(input.size / 1024).toFixed(2)} KB</p>
      )}
          <button className='hover:text-[#014FD6] cursor-pointer' onClick={downloadImage}><RiDownloadLine/></button>

          </li>
        </ul>
      )}

    {/* SEO Content */}
    <SeoContent
      title="How to Compress Images Online"
      description="Reduce the file size of your JPG, PNG, and other images instantly. Our free image compressor shrinks your photos without visible quality loss — perfect for websites, email attachments, and social media uploads. Everything runs in your browser, so your images stay private."
      faqs={[
        {
          question: "What image formats can I compress?",
          answer: "You can compress JPG, PNG, WebP, GIF and most standard image formats.",
        },
        {
          question: "Will my image quality be affected?",
          answer: "Our smart compression removes unnecessary data while keeping visual quality. Most users see no difference.",
        },
        {
          question: "Is there a file size limit?",
          answer: "No strict limit. Since compression runs in your browser, it depends on your device memory. Most images under 50MB work perfectly.",
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No. All compression happens locally in your browser. Your images never leave your device.",
        },
      ]}
    />

    {/* Ad at bottom */}
    {/* <AdBanner adSlot="YOUR_AD_SLOT_6" /> */}
    </div>
  )
}

export default ImageCompressPage
