'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const CampusNavigation = dynamic(() => import('../components/CampusNavigation'), {
  ssr: false,
})


export default   function Home() {
 
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Campus Navigation</h1>
      <CampusNavigation />
    </main>
  )
}

