'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useData } from '../utiles/mapDataContext';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 140px)',
};

const center = {
  lat: 9.034216509572113,
  lng: 38.7648472888123,
};

const CampusNavigation = () => {
  const [map, setMap] = useState(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null);
  const { AllData } = useData();
  console.log(AllData)
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const getMarkerIcon = (category) => {
    const icons = {
      department: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      building: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      cafeteria: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      emergency: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      dorm: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      default: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    };

    return icons[category?.toLowerCase()] || icons.default;
  };

  // New function to normalize coordinates
  const normalizeLocations = useCallback((locations) => {
    if (!locations) return [];

    return locations.map(location => {
      if (!location || typeof location !== 'object') return null;

      let rawLat = parseFloat(location.lat || location.latitude);
      let rawLng = parseFloat(location.lng || location.longitude);
      
      // If either coordinate is invalid, skip this location
      if (isNaN(rawLat) || isNaN(rawLng)) {
        console.warn(`Invalid coordinates for ${location.name}: NaN values`);
        return null;
      }

      let lat = rawLat;
      let lng = rawLng;

      // Only swap if coordinates are definitely wrong
      // Check if lat is definitely a longitude (> 30)
      if (rawLat > 30 && rawLng < 30) {
        lat = rawLng;
        lng = rawLat;
      }

      // Validate coordinates are within expected ranges for Addis Ababa
      const isValidLat = lat >= 8.5 && lat <= 9.5;
      const isValidLng = lng >= 38.5 && lng <= 39.0;

      if (isValidLat && isValidLng) {
        console.log(`✅ Valid coordinates for ${location.name}:`, { lat, lng });
        return {
          ...location,
          normalizedCoordinates: { lat, lng }
        };
      }
      
      console.warn(`Location outside valid range: ${location.name}`, {
        raw: { rawLat, rawLng },
        processed: { lat, lng },
        validations: { isValidLat, isValidLng }
      });
      return null;
    }).filter(Boolean);
  }, []);

  const createMarkers = useCallback((map) => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const validLocations = normalizeLocations(AllData);
    console.log('Creating markers for locations:', validLocations.map(loc => ({
      name: loc.name,
      coords: loc.normalizedCoordinates
    })));

    validLocations.forEach((location) => {
      try {
        const marker = new google.maps.Marker({
          position: location.normalizedCoordinates,
          map: map,
          title: location.name,
          icon: {
            url: getMarkerIcon(location.category),
            scaledSize: new google.maps.Size(25, 23)
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-4">
              <h3 class="font-bold text-lg">${location.name}</h3>
              ${location.category ? `<p class="text-sm text-gray-600">${location.category}</p>` : ''}
              ${location.description ? `<p class="text-sm mt-2">${location.description}</p>` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infoWindow.open(map, marker);
          setActiveInfoWindow(infoWindow);
        });

        markersRef.current.push(marker);
        console.log(`✅ Created marker for: ${location.name}`);
      } catch (error) {
        console.error(`Failed to create marker for ${location.name}:`, error);
      }
    });

    console.log(`Created ${markersRef.current.length} markers out of ${AllData?.length} locations`);
  }, [AllData, activeInfoWindow, normalizeLocations]);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center,
            zoom: 18,
            minZoom: 16,
            maxZoom: 19,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ],
            disableDefaultUI: false,
          });

          setMap(newMap);
          createMarkers(newMap);
        }
      } catch (e) {
        console.error('Error initializing Google Maps:', e);
      }
    };

    initMap();
  }, [createMarkers]);

  // Re-create markers when AllData changes
  useEffect(() => {
    if (map) {
      createMarkers(map);
    }
  }, [AllData, map, createMarkers]);

  // Add this logging to help debug which locations are being processed
  useEffect(() => {
    if (AllData) {
      console.log('All locations:', AllData.map(loc => loc.name));
      const validLocs = normalizeLocations(AllData);
      console.log('Valid locations:', validLocs.map(loc => loc.name));
      console.log('Missing locations:', 
        AllData.filter(loc => 
          !validLocs.find(valid => valid.name === loc.name)
        ).map(loc => loc.name)
      );
    }
  }, [AllData, normalizeLocations]);

  return (
    <div className="space-y-2 bg-white">
      <div
        ref={mapRef}
        style={mapContainerStyle}
        className="border rounded-lg shadow-md w-full"
      />
    </div>
  );
};

export default CampusNavigation;