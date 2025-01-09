'use client'
import { createContext, useContext, useState } from "react";
import {fetchAllData} from '../lib/action'
import Fuse from "fuse.js";
import { useEffect } from "react";
const mapDataContext = createContext();


export const DataProvider= ({children})=> {
  const [AllData, setAllData] = useState([]);
  const [AllDepartment, setAllDepartment] = useState([]);
  const [Building, setBuilding] = useState([]);
  const [EmergencyContact, setEmergencyContact] = useState([]);
  const [Dorm, setDorm] = useState([]);
  const [Cafeteria, setCafeteria] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [fuse, setFuse] = useState(null);
   
useEffect(() => {
  const fetchData = async () => {
      try {
          const data = await fetchAllData();
          setCafeteria(data.CafeteriaList || []);
          setAllDepartment(data.DepartmentList || []);
          setBuilding(data.BuildingsList || []);
          setEmergencyContact(data.EmergencyList || []);
          setDorm(data.DormList || []);
          setAllData([
              ...(data.DepartmentList || []),
              ...(data.BuildingsList || []),
               (data.EmergencyList || []),
              ...(data.DormList || []),
              ...(data.CafeteriaList || []),
          ]);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  fetchData();
}, []);

useEffect(() => {
  if (AllData.length > 0) {
      const newFuse = new Fuse(AllData, {
          keys: ["name", "category"],
          threshold: 0.3,
          distance: 100,
          ignoreLocation: true,
          useExtendedSearch: true,
      });
      setFuse(newFuse);
  }
}, [AllData]);



    const makeSelected = ( query ) => {
        if (query.trim()) {
            const results = fuse.search(query);
            const filteredResults = results.map((result) => result.item);
            setSelectedItems(filteredResults);
        } else {
            setSelectedItems([]);
        }
    }


    return (
        <mapDataContext.Provider
          value={{
            AllData,
            AllDepartment,
            Cafeteria,
            EmergencyContact,
            Dorm,
            Building ,
            makeSelected,
            selectedItems
          }}
        >
          {children}
        </mapDataContext.Provider>
      );
  
}

export const useData = () => {
    const context = useContext(mapDataContext);
    if (!context) throw new Error("useData must be used within a CartProvider");
    return context;

}