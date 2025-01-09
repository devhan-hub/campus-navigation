'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRigthIcon from '@mui/icons-material/ChevronRight';import ListItem from '@mui/material/ListItem';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { IconButton, Typography } from '@mui/material';
import EmergencyIcon from '@mui/icons-material/Emergency';
import { useData } from '../utiles/mapDataContext';
import SideNav from './sidNav';

export default function CatagorySideBar({open ,setOpen}) {
 const [isCatagory , setIsCatagory] = React.useState(true)
 const [selectedCatgory , setSelectedCatagory] = React.useState([])
 const[infoSideBarOpen ,setInfoSideBarOpen]= React.useState(false)
 const { AllData,
    AllDepartment,
    Cafeteria,
    EmergencyContact,
    Dorm,
    Building ,
    handelTargetItem } = useData();
 const catagory =[
    {name:'Department' , icon:<SchoolIcon/>},
    { name:'Cafeteria' , icon:<RestaurantIcon/>},
    { name:'EmergencyContact',icon:<EmergencyIcon/>},
     {name:'Building' , icon:<LocationCityIcon/>} ,
      {name:'Dorm' , icon:<HomeIcon/>}
    ]

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handelSelected =(selectedCatagoryName) =>{
    setIsCatagory(false)
    switch(selectedCatagoryName){
        case'Department':
        setSelectedCatagory(AllDepartment)
        break;
        case'Cafeteria':
        setSelectedCatagory(Cafeteria)
        break;
        case'EmergencyContact':
        setSelectedCatagory(EmergencyContact)
        break;
        case'Dorm':
        setSelectedCatagory(Dorm)
        break;
        case'Building':
        setSelectedCatagory(Building)
        break;

    }
  }

  const handelClick =(item)=> {
    if(isCatagory){
      handelSelected(item) 
      setInfoSideBarOpen(false)
 
    }

    else {
        handelTargetItem(item)
        setOpen(false)
        setInfoSideBarOpen(true)
    }
  }

  const DrawerList = (displayContent)=> {
       return (
        <Box sx={{ width: 350 }} role="presentation" >
            <div className='p-3 pt-7 flex items-center justify-between'>
            {!isCatagory && 
              <IconButton className='text-[32px]' onClick={()=>setIsCatagory(true)}>
                <ChevronLeftIcon sx={{fontSize:'38px'}}/>
              </IconButton>
            }
        <Typography variant='h5' className='text-center '>{isCatagory?'Catagory':'CatagoryContent'}</Typography>
        </div>
      <List>
        {displayContent.map((text, index) => (
          <ListItem key={text.name} disablePadding onClick={()=>{isCatagory?handelClick(text.name):handelClick(text.id)}}>
            <ListItemButton>
              <ListItemIcon>
                {text.icon?text.icon:<ChevronRigthIcon/>}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    
    </Box>
       )
  }
   

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {isCatagory && DrawerList(catagory)}
        {!isCatagory && DrawerList(selectedCatgory)}
      </Drawer>
      <SideNav open={infoSideBarOpen} setOpen ={setInfoSideBarOpen}/>
    </div>
  );
}
