'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { campusBuildings } from '@/utiles/campusData'
import { Card } from "./ui/card"

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 140px)'
}

const center = {
  lat: 9.033774850369534,
  lng: 38.76462349151217,
}

const CampusNavigation = () => {
  const [map, setMap] = useState(null)
  const [directions, setDirections] = useState(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const mapRef = useRef(null)
  const directionsService = useRef(null)
  const directionsRenderer = useRef(null)
  const bounds = {
    north: 9.035,
    south: 9.032,
    east: 38.766,
    west: 38.763,
  }
  
  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"]
        })
  
        await loader.load()
  
        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center,
            zoom: 19,
            minZoom: 16,
            maxZoom: 19,
            restriction: {
              latLngBounds: bounds,
              strictBounds: false,
            },
          })
          setMap(newMap)
          setIsLoaded(true)
          directionsService.current = new google.maps.DirectionsService()
          directionsRenderer.current = new google.maps.DirectionsRenderer({ map: newMap })
  
          // Add markers for campus buildings
          campusBuildings.forEach((building) => {
            new google.maps.Marker({
              position: { lat: building.lat, lng: building.lng },
              map: newMap,
              title: building.name,
            })
          })
        }
      } catch (e) {
        console.error('Error initializing Google Maps:', e)
        setError('Failed to load Google Maps. Please check your internet connection and try again.')
      }
    }
  
    initMap()
  }, [])
  

  

  const calculateRoute = useCallback(() => {
    if (!directionsService.current || !directionsRenderer.current || !map || !start || !end) {
      console.error('Unable to calculate route: missing required components')
      return
    }

    const startBuilding = campusBuildings.find(b => b.id === start)
    const endBuilding = campusBuildings.find(b => b.id === end)

    if (!startBuilding || !endBuilding) {
      console.error('Invalid start or end building selected')
      return
    }

    setError(null)

    directionsService.current.route(
      {
        origin: { lat: startBuilding.lat, lng: startBuilding.lng },
        destination: { lat: endBuilding.lat, lng: endBuilding.lng },
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
          directionsRenderer.current?.setDirections(result)
        } else {
          console.error('Directions request failed:', status)
          setError('Failed to calculate route. Please try again.')
          setDirections(null)
          directionsRenderer.current?.setMap(null)
        }
      }
    )
  }, [start, end, map])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Card className="mb-4 p-6 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">Starting Point</label>
            <Select value={start} onValueChange={setStart}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select start point" />
              </SelectTrigger>
              <SelectContent>
                {campusBuildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-gray-700">Destination</label>
            <Select value={end} onValueChange={setEnd}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select end point" />
              </SelectTrigger>
              <SelectContent>
                {campusBuildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-none pt-6">
            <Button 
              onClick={calculateRoute} 
              disabled={!start || !end || !isLoaded}
              className="w-full text-black font-bold sm:w-auto border-red-800 bg-white border-2 hover:bg-red-900"
            >
              {isLoaded ? (
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Navigate
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div 
        ref={mapRef} 
        style={mapContainerStyle} 
        className="rounded-lg shadow-md border border-gray-200"
      />
    </div>
  )
}

export default CampusNavigation


//   9.034591477385364, 38.763960995425315   

