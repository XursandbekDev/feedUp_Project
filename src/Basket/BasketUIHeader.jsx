import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router';


export default function BasketUIHeader() {
  const navigate = useNavigate()

  const handleHome = () =>{
    navigate(`/`)
  }
  return (
    <>
      <header className='flex flex-col max-w-md  py-3 px-6'>
        <div className='py-1'>
          <button onClick={handleHome} className='text-2xl'><MdArrowBack /></button>
          <img src="" alt="" />
        </div>
      </header>
    </>
  )
}
