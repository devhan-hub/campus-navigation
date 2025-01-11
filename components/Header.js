"use client";
import React from 'react';

import SearchResult from './SearchResult';
import Image from 'next/image';


export default function Header() {
  
  return (
    <>
      <header className="bg-gradient-to-r from-red-900 to-red-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center">
              <Image src="/aaulogo.png" alt="aau" width={30} height={30} />
              <h1 className="ml-2 text-xl md:text-2xl font-semibold text-white">
                AAU Campus Navigator
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:ml-auto">
              <SearchResult/>
              
            </div>
          </div>
        </div>
      </header>
      
    </>
  );
}


