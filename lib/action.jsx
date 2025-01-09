'use server';
import {collection , getDocs } from "firebase/firestore";
import {db} from "../app/firebase/config";

export  const fetchDepartment = async () =>{
    const DepartmentCollection = collection(db , "AllDepartment");
    const  DepartmentSnapshot = await getDocs(DepartmentCollection);
    const DepartmentList = DepartmentSnapshot.docs.map(doc => ({...doc.data() , id:doc.id}));
     return DepartmentList
};

export const fetchEmergency = async () => {
    const EmergencyCollection = collection(db, "EmergencyContact");
    const EmergencySnapshot = await getDocs(EmergencyCollection);
    const EmergencyList = EmergencySnapshot.docs.map(doc => ({...doc.data() , id:doc.id}));
    return EmergencyList;
};
  

export const fetchBuildings = async () => {
    const BuildingsCollection = collection(db, "Buildings");
    const BuildingsSnapshot = await getDocs(BuildingsCollection);
    const BuildingsList = BuildingsSnapshot.docs.map(doc => ({...doc.data() , id:doc.id}));
    return BuildingsList;
};

export  const fetchCafeteria = async () =>{
    const CafeteriaCollection = collection(db , "Cafeteria");
    const  CafeteriaSnapshot = await getDocs(CafeteriaCollection);
    const CafeteriaList = CafeteriaSnapshot.docs.map(doc => ({...doc.data() , id:doc.id}));
     return CafeteriaList
};

export const fetchDorm = async () => {
    const DormCollection = collection(db, "Dorm");
    const DormSnapshot = await getDocs(DormCollection);
    const DormList = DormSnapshot.docs.map(doc => ({...doc.data() , id:doc.id}));
    return DormList;
};


export const fetchAllData = async () => {
    const [DepartmentList, BuildingsList ,CafeteriaList, DormList , EmergencyList ] = await Promise.all([fetchDepartment(), fetchBuildings() ,fetchCafeteria(), fetchDorm() ,fetchEmergency()]);
    return { DepartmentList, BuildingsList ,CafeteriaList, DormList , EmergencyList };
};


   
