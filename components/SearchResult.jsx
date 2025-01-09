'use client'
import Search from './search';
import { useState } from 'react'
import ResultTable from './ResultTable'
import { useData } from '../utiles/mapDataContext';


export default function SearchResult({ allLocations }) {
const {selectedItems}   = useData()



  return (
    <div className=" absolute top-0 min-w-[400px] px-8 py-12">
      <div className="flex flex-col w-full  gap-1">
        <div className="w-full ">
          <Search/>
        </div>

        <div className=' w-full shadow-lg bg-white rounded-lg px-4 pt-2'>
          {selectedItems.length > 0 && <ResultTable />}

        </div>
      </div>




    </div>
  );
}