"use client";
import React from 'react';
import { Menu, Search as SearchIcon } from 'lucide-react';
import SearchResult from './SearchResult';
import Image from 'next/image';
import CatagorySideBar from "./CatagorySideBar"
import {useState} from "react";
export default function Header() {
    const [open, setOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-red-900 to-red-800 shadow-md">
    <CatagorySideBar open={open} setOpen={setOpen}/>
    
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Image src="/aaulogo.png" alt="aau" width={30} height={30} />
            <h1 className=" ml-2 text-xl md:text-2xl font-semibold text-white">
              AAU Campus Navigator
            </h1>
            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
          <div className="w-full md:w-auto">
            
            <SearchResult />
             <button className="outline-none border-2 border-white ml-[500px] px-2 py-1 hover:scale-110 duration-300 transition-all"
        onClick={()=>setOpen(true)}
       >
        Catagory
       </button>
             
          </div>
        </div>
      </div>
    </header>
  );



}


