"use client"
import React, { useEffect, useState } from 'react'

const TextToolPage = () => {
const[input,setInput]=useState("")
const[count,setCount]=useState("")
const[characterCount,setCharacterCount]=useState(0)

useEffect(()=>{
    // if (!input.trim()) return 0;

  if(input==""){
    setCount(0)
setCharacterCount(0)
  }else{
     setCount(input?.trim().split(/\s+/).length);
     setCharacterCount(input?input?.replace(/\s+/g, "").length:0)
  }
},[input])

  return (
    <div className='flex justify-center items-center'>
   <div className='w-[65%] xs:w-[80%] border-2 border-blue1 p-10  bg-white rounded-md my-10 xs:p-4'> 
    <h2 className='text-2xl text-center'>Text Analysis</h2>
    <h3 className='text-gray-500 text-lg font-medium text-center pt-2'>Enter Text and see the word count</h3>
   <textarea  value={input} onChange={(e)=>{setInput(e.target.value)}} rows={5} className='w-full  focus:border-green-600  border border-[#dedede] rounded-md mt-4 p-5 mt-2' placeholder='Enter your text here'/>
   <div className='flex gap-20 pt-3 xs:gap-3 xs:flex-wrap'>
    <p className='font-medium text-red-400'>{`Word Count: ${count}`}</p>
    <p className='font-medium text-green-400'>{`Word Count: ${characterCount}`}</p>
   </div>

   
   </div>
    </div>
  )
}

export default TextToolPage
