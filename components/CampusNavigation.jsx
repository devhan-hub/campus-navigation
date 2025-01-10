'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useData } from '../utiles/mapDataContext';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 9.034216509572113,
  lng: 38.7648472888123,
};

const CampusNavigation = () => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const { AllData, loading, error } = useData();
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);

  if (loading) {
    return <div>Loading map data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();

        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center,
            zoom: 18,
            minZoom: 18,
            maxZoom: 19,
            streetViewControl: false,
          });
          setMap(newMap);
          directionsService.current = new google.maps.DirectionsService();
          directionsRenderer.current = new google.maps.DirectionsRenderer({
            map: newMap,
          });

          AllData.forEach((building) => {
            new google.maps.Marker({
              position: { lat: building.lat, lng: building.lng },
              map: newMap,
              title: building.name,
            });
          });
        }
      } catch (e) {
        console.error('Error initializing Google Maps:', e);
        setError(
          'Failed to load Google Maps. Please check your internet connection and try again.'
        );
      }
    };

    initMap();
  }, []);

  return (
    <div className="space-y-2 bg-white">
      <div
        ref={mapRef}
        style={mapContainerStyle}
        className="border rounded-lg shadow-md w-full min-h-[85vh]"
      ></div>
    </div>
  );
};

export default CampusNavigation;
