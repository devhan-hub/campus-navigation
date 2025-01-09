"use client";
import React, { useState } from "react";
import { Search  as SearchIcon , } from "lucide-react";
import { XIcon } from "lucide-react";
import Fuse from "fuse.js";
import { useData } from "../utiles/mapDataContext";

export default function Search({}) {
    const {searchItemHandeler ,resetList} = useData()
  return (
    <>
       <div className="relative  ">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
        <input
          placeholder="Search campus locations..."
          className="pl-10 bg-transparent w-full border-2 border-white text-white placeholder:text-white px-6 py-2 focus:outline-none "
          onChange={(e)=>searchItemHandeler(e.target.value)} />

          <XIcon className="absolute right-3 text-[24px] top-1/2 -translate-y-1/2 h-4 w-4 text-white cursor-pointer" onClick={resetList} />
      </div>
      </>

  );
}
