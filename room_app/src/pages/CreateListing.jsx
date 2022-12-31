import React,{useState} from 'react'

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent"
  })
  const {type} = formData
  function onChange(){
  }
  return (
    <main className='max-w-md px-2 mx-auto '>
      <h1 className='text-3xl uppercase text-center mt-6
      font-bold'>Create a Listing</h1>
      <form>
        <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
        <div className='flex'>
          <button
            type='button'
            id='type'
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm bg-slate-300
            uppercase shadow-md rounded hover:shadow-lg focus:shadow
            active:shadow-lg transition ease-in-out duration-150 w-full
            ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Sell
          </button>
          <button
            type='button'
            id='type'
            value="sale"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm bg-slate-300
            uppercase shadow-md rounded hover:shadow-lg focus:shadow
            active:shadow-lg transition ease-in-out duration-150 w-full
            ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Rent
          </button>
        </div>
        <p className='text-lg font-semibold mt-6'>Name</p>
      </form>
    </main>
  )
}
