export interface Building {
    id: string;
    name: string;
    lat: number;
    lng: number;
  }
  
  export const campusBuildings: Building[] = [
    { id: 'lib', name: 'Library', lat: 40.7128, lng: -74.0060 },
    { id: 'sci', name: 'Science Building', lat: 40.7138, lng: -74.0070 },
    { id: 'gym', name: 'Gymnasium', lat: 40.7118, lng: -74.0050 },
    { id: 'caf', name: 'Cafeteria', lat: 40.7108, lng: -74.0040 },
    { id: 'dorm', name: 'Dormitory', lat: 40.7148, lng: -74.0080 },
  ];
  
  