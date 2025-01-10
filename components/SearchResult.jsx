'use client'
import Search from './search';
import { useState } from 'react'
import ResultTable from './ResultTable'
import { useData } from '../utiles/mapDataContext';

export default function SearchResult({ allLocations }) {
  const {selectedItems} = useData()

  return (
    <div className="w-[300px] relative">
      <div className="flex flex-col w-full gap-1">
        <div className="w-full">
          <Search/>
        </div>

        {selectedItems.length > 0 && (
          <div className='absolute z-50 top-full left-0 right-0 w-full shadow-lg bg-white rounded-lg px-4 pt-2 mt-1'>
            <ResultTable />
          </div>
        )}
      </div>
    </div>
  );
}