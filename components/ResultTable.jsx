'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SidNav from './sidNav';
import { useData } from '../utiles/mapDataContext';
export default function ResultTable() {

  const [open, setOpen] = React.useState(false);
  const {handelTargetItem} = useData();
  const {selectedItems}   = useData()
  return (
    <>
        

    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 370,
        '& ul': { padding: 0 },
      }}

      
      subheader={<li />}
    >
      
          <ul className='space-y-2 pt-4'>
            
            {selectedItems.map((item, index) => (
              <ListItem 
                key={index} 
                className='bg-red-50 duration-300 rounded-lg cursor-pointer hover:bg-red-100' 
                onClick={() => handelTargetItem(item.id)}
              >
                <ListItemText primary={item.name} sx={{color:'black'}} />
              </ListItem>
            ))}
          </ul>
       
   
    </List>
    </>
  );
}