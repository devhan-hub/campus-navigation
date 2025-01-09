'use client'
import CatagorySideBar from "./CatagorySideBar"
import { useState } from "react";
const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <CatagorySideBar open={open} setOpen={setOpen}/>
    <div className='w-full min-h-16 p-2  shadow-lg bg-red-500 relative '>
       <p className='text-lg font-bold  w-full mr-auto text-end my-auto '>AAU Campus Navigator</p>
       <button className="outline-none border-2 border-white ml-[500px] px-2 py-1 hover:scale-110 duration-300 transition-all"
        onClick={()=>setOpen(true)}
       >
        Catagory
       </button>
    </div>
    </>
  )
}

export default Header
