'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { campusBuildings } from '../utils/campusData'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
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
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Select value={start} onValueChange={setStart}>
          <SelectTrigger className="w-[180px]">
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
        <Select value={end} onValueChange={setEnd}>
          <SelectTrigger className="w-[180px]">
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
        <Button onClick={calculateRoute} disabled={!start || !end || !isLoaded}>
          {isLoaded ? 'Navigate' : 'Loading...'}
        </Button>
      </div>
      <div ref={mapRef} style={mapContainerStyle} className="border rounded-lg shadow-md"></div>
    </div>
  )
}

export default CampusNavigation


//   9.034591477385364, 38.763960995425315   

