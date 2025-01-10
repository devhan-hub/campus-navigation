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
  const [userLocation, setUserLocation] = useState(null);
  const [locationMarker, setLocationMarker] = useState(null);
  const [accuracyCircle, setAccuracyCircle] = useState(null);
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

  // Function to handle getting user's location
  const getCurrentLocation = useCallback(() => {
    // Clear existing marker and circle if they exist
    if (locationMarker) {
      locationMarker.setMap(null);
      setLocationMarker(null);
    }
    if (accuracyCircle) {
      accuracyCircle.setMap(null);
      setAccuracyCircle(null);
    }
  
    // If we were just clearing markers, return early
    if (userLocation) {
      setUserLocation(null);
      return;
    }
  
    // Otherwise, get new location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
  
          if (map) {
            map.panTo(pos);
            map.setZoom(18);
  
            const marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
              },
              title: "Your Location"
            });
  
            const circle = new google.maps.Circle({
              map: map,
              center: pos,
              radius: position.coords.accuracy,
              strokeColor: "#4285F4",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillColor: "#4285F4",
              fillOpacity: 0.1,
            });
  
            setLocationMarker(marker);
            setAccuracyCircle(circle);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting your location. Please check your location permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [map, locationMarker, accuracyCircle, userLocation]);

  // Add location button to map only once
  useEffect(() => {
    if (map) {
      // Check if button already exists
      const existingButton = document.querySelector('.custom-map-control-button');
      if (existingButton) return;

      const locationButton = document.createElement("button");
      locationButton.classList.add(
        "custom-map-control-button",
        "bg-white",
        "p-2",
        "rounded-full",
        "shadow-lg",
        "hover:bg-gray-100"
      );
      locationButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      `;
      
      const clickHandler = () => getCurrentLocation();
      locationButton.addEventListener("click", clickHandler);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

      // Cleanup function to remove the button when component unmounts
      return () => {
        locationButton.removeEventListener("click", clickHandler);
        const index = map.controls[google.maps.ControlPosition.RIGHT_BOTTOM]
          .getArray()
          .indexOf(locationButton);
        if (index > -1) {
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].removeAt(index);
        }
        locationButton.remove();
      };
    }
  }, [map, getCurrentLocation]);

  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const {targetItem} = useData();



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
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "poi.school",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
              },
              {
                featureType: "poi.park",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
              },
              {
                featureType: "poi.medical",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
              },
              {
                featureType: "poi.government",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
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
  }, [createMarkers, AllData]);

  //  add marker when user click the place 
  useEffect(() => {
    let activeMarker = null;
    
    if (map && targetItem) {
      const { lat, lng, name } = targetItem;
  
      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        map.setCenter({ lat, lng });
  
        if (activeMarker) {
          activeMarker.setMap(null);
        }
  
        activeMarker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: name,
        });
      } else {
        console.error("Invalid targetItem:", targetItem);
      }
    }
  
    return () => {
      if (activeMarker) {
        activeMarker.setMap(null);
      }
    };
  }, [map, targetItem]);
  
  





  // Re-create markers when AllData changes
  useEffect(() => {
    if (map) {
      createMarkers(map);
    }
  }, [AllData, map, createMarkers]);



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