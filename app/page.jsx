'use client'
import dynamic from 'next/dynamic'
import SearchResult from '../components/SearchResult'
const CampusNavigation = dynamic(() => import('../components/CampusNavigation'), {
  ssr: false,
})

export default function Page() {
  return (
    <main className=" mx-auto p-4  h-screen relative ">
      <div className='absolute -top-24 z-50'>
      <SearchResult/>
      </div>
    
      <div className='-z-20'>
      <CampusNavigation />
      </div>
    </main>
  )
}

