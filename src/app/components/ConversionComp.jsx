import React from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";

const ConversionComp = ({title,onchange,accept}) => {
  return (
   <div className='max-w-7xl mx-auto py-10'>
           <div className='bg-white md:p-5 xs:p-3 rounded-xl'>
           <h2 className='text-gray-600 font-medium text-lg'>{title}</h2>
         <div className='bg-[#ECF3FF]  border border-dashed border-sky-400 rounded-2xl mt-5'>
           <label htmlFor='file' className='flex justify-center items-center flex-col py-10'>
          <AiOutlineCloudUpload className='text-5xl'/>
          <h3 className='text-gray-600 md:text-xl'> Click and Drag your file here.</h3>
           <input name='file' type='file' className=' ' accept={accept} onChange={(e)=>{onchange(e)}}/>
         </label>
         </div>
         
           </div>
   
         
       </div>
  )
}

export default ConversionComp
