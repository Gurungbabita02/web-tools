"use client"
import React, { useState } from 'react'
import imageCompression from "browser-image-compression";
import ConversionComp from '@/app/components/ConversionComp';


const page = () => {
const [file,setFile]=useState()
    const handleImage = async (e) => {
        setFile(e.target.files[0])
  const options = {
    fileType: "image/webp",
    maxSizeMB: 0.5,
    initialQuality: 0.8,
  };

  const result=  imageCompression(file, options);
  console.log(result,"result999")
}
  return (
        <div className='max-w-7xl mx-auto py-10'>
   
    <ConversionComp title={"Convert Image  to webp"} data={""} accept={""} input={file} onchange={handleImage}/>
      image compression
    </div>
  )
}

export default page
