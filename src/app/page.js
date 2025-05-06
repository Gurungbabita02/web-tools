"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function AviatorPredictor() {
  const [values, setValues] = useState([]);
  const [inputText, setInputText] = useState('');
  const [predictedCrash, setPredictedCrash] = useState(null);
  const [error, setError] = useState('');
  const[loader,setloader]=useState(false)
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const parsed = e.target.value
      .split(',')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));

    setValues(parsed);
  };
let live_url="https://python-ai-t9zt.onrender.com/predict"
let local_url=" http://localhost:8000/predict"
  const handleSubmit = async () => {
    if (values.length < 5) {
      setError(' Please enter at least 5 crash values.');
      return;
    }
    setloader(true)
    try {
      const res = await fetch(`${live_url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last5: values }),
      });
 
      const data = await res.json();
      setloader(false)
      setInputText("")
      if (data.error) {
        setError(`⚠️ ${data.error}`);
        setPredictedCrash(null);
        setloader(false)
      } else {
        setPredictedCrash(data.predicted_crash);
        setError('');
      }
    } catch (err) {
      setError('Server error. Try again later.');
      setPredictedCrash(null);
      setloader(false)
    }
  };

  return (
    <div className="container m-auto  h-full min-h-screen flex justify-center items-center">
      <div className='lg:w-[30%] sm:w-full sm:p-5 mx-auto bg-white border border-solid border-red-500 p-10 rounded-2xl'>
        <div className='flex justify-center'>
          <Image src="/Predictor-Aviator-icon.webp" alt="Aviator" height={100} width={100}/>
        </div>
    <h2 className='text-red-500 text-3xl font-medium text-center mb-6'> Aviator Predictor  for aviator Gaming </h2>
      <input
        type="text"
        placeholder="Enter crash values (e.g., 1.8,2.5,3.0,1.7,2.9)"
        value={inputText}
        onChange={handleInputChange}
        className="w-full border p-2 rounded border-gray-500 text-black focus:border-red-600 focus:outline-0"
      />

      <button
        onClick={handleSubmit}
        className="mt-6 bg-red-400 cursor-pointer text-white px-4 py-2 rounded-full w-full  "
      >
        {loader?<div role="status" className='flex justify-center'>
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>:"Predict"}
        
      </button>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      {predictedCrash !== null && (
        <div className="mt-4 text-green-700 text-lg ">
          🧠 Predicted Crash Point: <strong>{predictedCrash}x</strong>
        </div>
      )}
      </div>
    </div>
  );
}
