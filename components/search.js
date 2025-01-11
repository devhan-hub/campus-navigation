"use client";
import React, { useState, useRef } from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useData } from "../utiles/mapDataContext";
import CatagorySideBar from "./CatagorySideBar";

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: '3rem',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

export default function Search() {
  const [open, setOpen] = useState(false);
  const { searchItemHandeler, resetList, selectedItems } = useData();
  const [notFound, setNotFound] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (value) => {
    searchItemHandeler(value);
    setNotFound(value && selectedItems.length === 0);
  };

  const handleReset = () => {
    resetList();
    setNotFound(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
    <div className="flex flex-row md:-ml-24 ">
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon size={20} />
        </SearchIconWrapper>
        <StyledInputBase
          inputRef={inputRef}
          placeholder="Search campus locations..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div
          onClick={handleReset}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <XIcon size={20} />
        </div>
      </SearchWrapper>
      <button 
                className="pt-1 pb-1 px-4 rounded-md text-white border-2 border-white hover:bg-white/10 transition-colors"
                onClick={() => setOpen(true)}
              >
                Catagory
              </button>
      
    </div>
    <div className="relative">
    <CatagorySideBar open={open} setOpen={setOpen}/>
  </div>
    {notFound && (
      <p style={{ color: 'white', marginTop: '10px' }}>
        Not found. Please search again.
      </p>
    )}</div>
  );
}
